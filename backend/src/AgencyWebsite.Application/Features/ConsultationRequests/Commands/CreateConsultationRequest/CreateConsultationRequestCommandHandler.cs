using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Features.ConsultationRequests.Commands.CreateConsultationRequest;

public class CreateConsultationRequestCommandHandler : IRequestHandler<CreateConsultationRequestCommand, Guid>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public CreateConsultationRequestCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreateConsultationRequestCommand request, CancellationToken cancellationToken)
    {
        var consultationRequest = new ConsultationRequest
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            CompanyName = request.CompanyName,
            ServiceInterest = request.ServiceInterest,
            ProjectBudgetRange = request.ProjectBudgetRange,
            PreferredDate = request.PreferredDate,
            PreferredTimeSlot = request.PreferredTimeSlot,
            AdditionalDetails = request.AdditionalDetails,
            IpAddress = request.IpAddress
        };

        _context.ConsultationRequests.Add(consultationRequest);
        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("consultationrequests:all", cancellationToken);

        return consultationRequest.Id;
    }
}
