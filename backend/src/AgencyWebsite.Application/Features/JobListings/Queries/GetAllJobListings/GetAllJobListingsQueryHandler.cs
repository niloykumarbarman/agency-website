using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.JobListings.Queries.GetAllJobListings;

public class GetAllJobListingsQueryHandler : IRequestHandler<GetAllJobListingsQuery, List<JobListingDto>>
{
    private readonly IAppDbContext _context;

    public GetAllJobListingsQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<JobListingDto>> Handle(GetAllJobListingsQuery request, CancellationToken cancellationToken)
    {
        return await _context.JobListings
            .Where(j => j.Status == JobListingStatus.Open && !j.IsDeleted)
            .OrderByDescending(j => j.CreatedAt)
            .Select(j => new JobListingDto
            {
                Id = j.Id,
                Title = j.Title,
                Slug = j.Slug,
                Department = j.Department,
                Location = j.Location,
                EmploymentType = j.EmploymentType
            })
            .ToListAsync(cancellationToken);
    }
}
