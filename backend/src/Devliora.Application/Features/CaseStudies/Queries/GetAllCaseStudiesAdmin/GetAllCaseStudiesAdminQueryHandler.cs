using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Devliora.Application.Features.CaseStudies.Queries.GetAllCaseStudiesAdmin;

public class GetAllCaseStudiesAdminQueryHandler : IRequestHandler<GetAllCaseStudiesAdminQuery, List<AdminCaseStudyDto>>
{
    private readonly IAppDbContext _context;

    public GetAllCaseStudiesAdminQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<AdminCaseStudyDto>> Handle(GetAllCaseStudiesAdminQuery request, CancellationToken cancellationToken)
    {
        // Admin view: no IsPublished/IsDeleted filtering, and no caching, so
        // the admin panel always reflects the latest true database state.
        return await _context.CaseStudies
            .Where(c => !c.IsDeleted)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new AdminCaseStudyDto
            {
                Id = c.Id,
                Title = c.Title,
                Slug = c.Slug,
                ClientName = c.ClientName,
                Industry = c.Industry,
                Challenge = c.Challenge,
                Solution = c.Solution,
                Results = c.Results,
                CoverImageUrl = c.CoverImageUrl,
                IsPublished = c.IsPublished
            })
            .ToListAsync(cancellationToken);
    }
}
