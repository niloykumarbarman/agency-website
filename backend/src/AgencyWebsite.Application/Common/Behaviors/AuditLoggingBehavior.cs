using System.Text.RegularExpressions;
using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Common.Behaviors;

public class AuditLoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull, IRequest<TResponse>
{
    private readonly IAppDbContext _context;
    private readonly ICurrentUserService _currentUser;

    public AuditLoggingBehavior(IAppDbContext context, ICurrentUserService currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        var requestNamespace = typeof(TRequest).Namespace ?? string.Empty;

        // Only audit commands (mutations) and the login command; skip queries entirely.
        var isQuery = requestNamespace.Contains(".Queries.");
        var isLogin = requestName.Equals("LoginCommand", StringComparison.Ordinal);
        var isMutationCommand = requestNamespace.Contains(".Commands.");

        if (isQuery || !(isMutationCommand || isLogin))
        {
            return await next();
        }

        var (action, entityType) = ParseRequestName(requestName);

        var effectiveEmail = _currentUser.Email ?? ExtractRequestEmail(request);

        try
        {
            var response = await next();

            var entityId = ExtractEntityId(request, response);
            var wasSuccessful = ExtractResponseSuccess(response);

            _context.AuditLogs.Add(new AuditLog
            {
                UserId = _currentUser.UserId,
                UserEmail = effectiveEmail,
                IpAddress = _currentUser.IpAddress,
                Action = action,
                EntityType = entityType,
                EntityId = entityId,
                RequestName = requestName,
                Success = wasSuccessful
            });
            await _context.SaveChangesAsync(cancellationToken);

            return response;
        }
        catch (Exception ex)
        {
            _context.AuditLogs.Add(new AuditLog
            {
                UserId = _currentUser.UserId,
                UserEmail = effectiveEmail,
                IpAddress = _currentUser.IpAddress,
                Action = action,
                EntityType = entityType,
                EntityId = ExtractEntityId(request, default),
                RequestName = requestName,
                Success = false,
                ErrorMessage = ex.Message
            });
            await _context.SaveChangesAsync(cancellationToken);

            throw;
        }
    }

    private static (string Action, string EntityType) ParseRequestName(string requestName)
    {
        if (requestName.Equals("LoginCommand", StringComparison.Ordinal))
        {
            return ("Login", "Admin");
        }

        var match = Regex.Match(requestName, "^(Create|Update|Delete)(.+)Command$");
        if (match.Success)
        {
            return (match.Groups[1].Value, match.Groups[2].Value);
        }

        return ("Unknown", requestName);
    }

    private static string? ExtractEntityId(TRequest request, TResponse? response)
    {
        // Create commands return the new entity's Guid.
        if (response is Guid guidResponse)
        {
            return guidResponse.ToString();
        }

        // Update/Delete commands carry the target Id on the request itself.
        var idProperty = typeof(TRequest).GetProperty("Id");
        if (idProperty?.GetValue(request) is Guid requestId)
        {
            return requestId.ToString();
        }

        return null;
    }

    private static string? ExtractRequestEmail(TRequest request)
    {
        var emailProperty = typeof(TRequest).GetProperty("Email");
        return emailProperty?.GetValue(request) as string;
    }

    private static bool ExtractResponseSuccess(TResponse response)
    {
        if (response is null)
        {
            return true;
        }

        // If the response type exposes a bool "Success" property (e.g. LoginResult),
        // trust that value. Otherwise, reaching here without an exception means success.
        var successProperty = typeof(TResponse).GetProperty("Success");
        if (successProperty?.PropertyType == typeof(bool) && successProperty.GetValue(response) is bool success)
        {
            return success;
        }

        return true;
    }
}
