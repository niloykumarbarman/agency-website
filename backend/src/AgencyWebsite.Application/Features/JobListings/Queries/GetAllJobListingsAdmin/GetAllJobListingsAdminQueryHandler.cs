using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.JobListings.Queries.GetAllJobListingsAdmin;

public class GetAllJobListingsAdminQueryHandler : IRequestHandler<GetAllJobListingsAdminQuery, List<JobListingAdminDto>>
{
    private readonly IAppDbContext _context;

    public GetAllJobListingsAdminQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<JobListingAdminDto>> Handle(GetAllJobListingsAdminQuery request, CancellationToken cancellationToken)
    {
        return await _context.JobListings
            .Where(j => !j.IsDeleted)
            .OrderByDescending(j => j.CreatedAt)
            .Select(j => new JobListingAdminDto
            {
                Id = j.Id,
                Title = j.Title,
                Slug = j.Slug,
                Department = j.Department,
                Location = j.Location,
                EmploymentType = j.EmploymentType,
                Description = j.Description,
                Requirements = j.Requirements,
                Status = j.Status.ToString()
            })
            .ToListAsync(cancellationToken);
    }
}
