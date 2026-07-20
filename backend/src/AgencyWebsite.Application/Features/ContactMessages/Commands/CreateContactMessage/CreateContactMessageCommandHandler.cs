using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Features.ContactMessages.Commands.CreateContactMessage;

public class CreateContactMessageCommandHandler : IRequestHandler<CreateContactMessageCommand, Guid>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public CreateContactMessageCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreateContactMessageCommand request, CancellationToken cancellationToken)
    {
        var message = new ContactMessage
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            Subject = request.Subject,
            Message = request.Message,
            IpAddress = request.IpAddress
        };

        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("contactmessages:all", cancellationToken);

        return message.Id;
    }
}
