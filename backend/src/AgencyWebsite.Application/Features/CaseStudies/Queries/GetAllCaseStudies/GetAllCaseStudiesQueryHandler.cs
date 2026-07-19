using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.CaseStudies.Queries.GetAllCaseStudies;

public class GetAllCaseStudiesQueryHandler : IRequestHandler<GetAllCaseStudiesQuery, List<CaseStudyDto>>
{
    private readonly IAppDbContext _context;

    public GetAllCaseStudiesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CaseStudyDto>> Handle(GetAllCaseStudiesQuery request, CancellationToken cancellationToken)
    {
        return await _context.CaseStudies
            .Where(c => c.IsPublished && !c.IsDeleted)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new CaseStudyDto
            {
                Id = c.Id,
                Title = c.Title,
                Slug = c.Slug,
                ClientName = c.ClientName,
                Industry = c.Industry,
                CoverImageUrl = c.CoverImageUrl
            })
            .ToListAsync(cancellationToken);
    }
}
