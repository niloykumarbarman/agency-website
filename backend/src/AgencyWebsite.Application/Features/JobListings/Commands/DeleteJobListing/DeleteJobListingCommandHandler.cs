using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.JobListings.Commands.DeleteJobListing;

public class DeleteJobListingCommandHandler : IRequestHandler<DeleteJobListingCommand, Unit>
{
    private readonly IAppDbContext _context;

    public DeleteJobListingCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteJobListingCommand request, CancellationToken cancellationToken)
    {
        var jobListing = await _context.JobListings
            .FirstOrDefaultAsync(j => j.Id == request.Id && !j.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"JobListing with Id '{request.Id}' was not found.");

        jobListing.IsDeleted = true;
        jobListing.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
