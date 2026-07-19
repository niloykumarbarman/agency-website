using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Features.JobListings.Commands.CreateJobListing;

public class CreateJobListingCommandHandler : IRequestHandler<CreateJobListingCommand, Guid>
{
    private readonly IAppDbContext _context;

    public CreateJobListingCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateJobListingCommand request, CancellationToken cancellationToken)
    {
        var jobListing = new JobListing
        {
            Title = request.Title,
            Slug = request.Slug,
            Department = request.Department,
            Location = request.Location,
            EmploymentType = request.EmploymentType,
            Description = request.Description,
            Requirements = request.Requirements,
            Status = request.Status
        };

        _context.JobListings.Add(jobListing);
        await _context.SaveChangesAsync(cancellationToken);

        return jobListing.Id;
    }
}
