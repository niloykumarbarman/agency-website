using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.CaseStudies.Commands.UpdateCaseStudy;

public class UpdateCaseStudyCommandHandler : IRequestHandler<UpdateCaseStudyCommand, Unit>
{
    private readonly IAppDbContext _context;

    public UpdateCaseStudyCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateCaseStudyCommand request, CancellationToken cancellationToken)
    {
        var caseStudy = await _context.CaseStudies
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"CaseStudy with Id '{request.Id}' was not found.");

        caseStudy.Title = request.Title;
        caseStudy.Slug = request.Slug;
        caseStudy.ClientName = request.ClientName;
        caseStudy.Industry = request.Industry;
        caseStudy.Challenge = request.Challenge;
        caseStudy.Solution = request.Solution;
        caseStudy.Results = request.Results;
        caseStudy.CoverImageUrl = request.CoverImageUrl;
        caseStudy.IsPublished = request.IsPublished;
        caseStudy.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
