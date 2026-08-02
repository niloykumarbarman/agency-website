using Devliora.Application.Common.Interfaces;
using Devliora.Application.Features.Portfolios.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Devliora.Application.Features.Portfolios.Queries.GetPortfolioBySlug;

public class GetPortfolioBySlugQueryHandler : IRequestHandler<GetPortfolioBySlugQuery, PortfolioDetailDto?>
{
    private readonly IAppDbContext _context;

    public GetPortfolioBySlugQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<PortfolioDetailDto?> Handle(GetPortfolioBySlugQuery request, CancellationToken cancellationToken)
    {
        return await _context.Portfolios
            .Where(p => p.Slug == request.Slug && !p.IsDeleted)
            .Select(p => new PortfolioDetailDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                ClientName = p.ClientName,
                Summary = p.Summary,
                ThumbnailUrl = p.ThumbnailUrl,
                ProjectUrl = p.ProjectUrl,
                TechStack = p.TechStack,
                Industry = p.Industry,
                Challenge = p.Challenge,
                Approach = p.Approach,
                Result = p.Result,
                TestimonialId = p.TestimonialId,
                TestimonialQuote = p.Testimonial != null ? p.Testimonial.Quote : null,
                TestimonialClientName = p.Testimonial != null ? p.Testimonial.ClientName : null,
                TestimonialClientTitle = p.Testimonial != null ? p.Testimonial.ClientTitle : null,
                Images = p.Images
                    .OrderBy(i => i.DisplayOrder)
                    .Select(i => new PortfolioImageItem { ImageUrl = i.ImageUrl, Caption = i.Caption, DisplayOrder = i.DisplayOrder })
                    .ToList(),
                Metrics = p.Metrics
                    .OrderBy(m => m.DisplayOrder)
                    .Select(m => new PortfolioMetricItem { Label = m.Label, Value = m.Value, DisplayOrder = m.DisplayOrder })
                    .ToList()
            })
            .FirstOrDefaultAsync(cancellationToken);
    }
}
