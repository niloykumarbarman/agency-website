using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Devliora.Application.Features.Portfolios.Commands.UpdatePortfolio;

public class UpdatePortfolioCommandHandler : IRequestHandler<UpdatePortfolioCommand, Unit>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public UpdatePortfolioCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(UpdatePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = await _context.Portfolios
            .Include(p => p.Images)
            .Include(p => p.Metrics)
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"Portfolio with Id '{request.Id}' was not found.");

        portfolio.Title = request.Title;
        portfolio.Slug = request.Slug;
        portfolio.ClientName = request.ClientName;
        portfolio.Summary = request.Summary;
        portfolio.ThumbnailUrl = request.ThumbnailUrl;
        portfolio.ProjectUrl = request.ProjectUrl;
        portfolio.TechStack = request.TechStack;
        portfolio.IsFeatured = request.IsFeatured;
        portfolio.DisplayOrder = request.DisplayOrder;
        portfolio.Industry = request.Industry;
        portfolio.Challenge = request.Challenge;
        portfolio.Approach = request.Approach;
        portfolio.Result = request.Result;
        portfolio.TestimonialId = request.TestimonialId;
        portfolio.UpdatedAt = DateTime.UtcNow;

        portfolio.Images.Clear();
        foreach (var image in request.Images)
        {
            portfolio.Images.Add(new PortfolioImage
            {
                ImageUrl = image.ImageUrl,
                Caption = image.Caption,
                DisplayOrder = image.DisplayOrder
            });
        }

        portfolio.Metrics.Clear();
        foreach (var metric in request.Metrics)
        {
            portfolio.Metrics.Add(new PortfolioMetric
            {
                Label = metric.Label,
                Value = metric.Value,
                DisplayOrder = metric.DisplayOrder
            });
        }

        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("portfolios:all", cancellationToken);
        await _cache.RemoveAsync("portfolios:featured", cancellationToken);

        return Unit.Value;
    }
}
