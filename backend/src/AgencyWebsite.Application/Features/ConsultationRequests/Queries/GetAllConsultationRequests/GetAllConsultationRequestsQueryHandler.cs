using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.ConsultationRequests.Queries.GetAllConsultationRequests;

public class GetAllConsultationRequestsQueryHandler : IRequestHandler<GetAllConsultationRequestsQuery, List<ConsultationRequestDto>>
{
    private const string CacheKey = "consultationrequests:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public GetAllConsultationRequestsQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<List<ConsultationRequestDto>> Handle(GetAllConsultationRequestsQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cache.GetAsync<List<ConsultationRequestDto>>(CacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }

        var result = await _context.ConsultationRequests
            .Where(c => !c.IsDeleted)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new ConsultationRequestDto
            {
                Id = c.Id,
                FullName = c.FullName,
                Email = c.Email,
                Phone = c.Phone,
                CompanyName = c.CompanyName,
                ServiceInterest = c.ServiceInterest.ToString(),
                ProjectBudgetRange = c.ProjectBudgetRange.ToString(),
                PreferredDate = c.PreferredDate,
                PreferredTimeSlot = c.PreferredTimeSlot.ToString(),
                AdditionalDetails = c.AdditionalDetails,
                Status = c.Status.ToString(),
                CreatedAt = c.CreatedAt
            })
            .ToListAsync(cancellationToken);

        await _cache.SetAsync(CacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);

        return result;
    }
}
