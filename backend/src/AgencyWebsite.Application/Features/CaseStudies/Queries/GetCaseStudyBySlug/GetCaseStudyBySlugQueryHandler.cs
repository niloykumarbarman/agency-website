using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Application.Features.CaseStudies.Queries.GetAllCaseStudies;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.CaseStudies.Queries.GetCaseStudyBySlug;

public class GetCaseStudyBySlugQueryHandler : IRequestHandler<GetCaseStudyBySlugQuery, CaseStudyDto?>
{
    private readonly IAppDbContext _context;

    public GetCaseStudyBySlugQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<CaseStudyDto?> Handle(GetCaseStudyBySlugQuery request, CancellationToken cancellationToken)
    {
        return await _context.CaseStudies
            .Where(c => c.Slug == request.Slug && c.IsPublished && !c.IsDeleted)
            .Select(c => new CaseStudyDto
            {
                Id = c.Id,
                Title = c.Title,
                Slug = c.Slug,
                ClientName = c.ClientName,
                Industry = c.Industry,
                Challenge = c.Challenge,
                Solution = c.Solution,
                Results = c.Results,
                CoverImageUrl = c.CoverImageUrl
            })
            .FirstOrDefaultAsync(cancellationToken);
    }
}
