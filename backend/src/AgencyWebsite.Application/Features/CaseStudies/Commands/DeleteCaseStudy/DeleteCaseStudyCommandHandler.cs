using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.CaseStudies.Commands.DeleteCaseStudy;

public class DeleteCaseStudyCommandHandler : IRequestHandler<DeleteCaseStudyCommand, Unit>
{
    private readonly IAppDbContext _context;

    public DeleteCaseStudyCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteCaseStudyCommand request, CancellationToken cancellationToken)
    {
        var caseStudy = await _context.CaseStudies
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"CaseStudy with Id '{request.Id}' was not found.");

        caseStudy.IsDeleted = true;
        caseStudy.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
