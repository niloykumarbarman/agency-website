using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.JobListings.Commands.UpdateJobListing;

public class UpdateJobListingCommandHandler : IRequestHandler<UpdateJobListingCommand, Unit>
{
    private readonly IAppDbContext _context;

    public UpdateJobListingCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateJobListingCommand request, CancellationToken cancellationToken)
    {
        var jobListing = await _context.JobListings
            .FirstOrDefaultAsync(j => j.Id == request.Id && !j.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"JobListing with Id '{request.Id}' was not found.");

        jobListing.Title = request.Title;
        jobListing.Slug = request.Slug;
        jobListing.Department = request.Department;
        jobListing.Location = request.Location;
        jobListing.EmploymentType = request.EmploymentType;
        jobListing.Description = request.Description;
        jobListing.Requirements = request.Requirements;
        jobListing.Status = request.Status;
        jobListing.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
