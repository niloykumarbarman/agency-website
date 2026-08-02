using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Entities;
using MediatR;

namespace Devliora.Application.Features.Portfolios.Commands.CreatePortfolio;

public class CreatePortfolioCommandHandler : IRequestHandler<CreatePortfolioCommand, Guid>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public CreatePortfolioCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreatePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = new Portfolio
        {
            Title = request.Title,
            Slug = request.Slug,
            ClientName = request.ClientName,
            Summary = request.Summary,
            ThumbnailUrl = request.ThumbnailUrl,
            ProjectUrl = request.ProjectUrl,
            TechStack = request.TechStack,
            IsFeatured = request.IsFeatured,
            DisplayOrder = request.DisplayOrder,
            Industry = request.Industry,
            Challenge = request.Challenge,
            Approach = request.Approach,
            Result = request.Result,
            TestimonialId = request.TestimonialId
        };

        foreach (var image in request.Images)
        {
            portfolio.Images.Add(new PortfolioImage
            {
                ImageUrl = image.ImageUrl,
                Caption = image.Caption,
                DisplayOrder = image.DisplayOrder
            });
        }

        foreach (var metric in request.Metrics)
        {
            portfolio.Metrics.Add(new PortfolioMetric
            {
                Label = metric.Label,
                Value = metric.Value,
                DisplayOrder = metric.DisplayOrder
            });
        }

        _context.Portfolios.Add(portfolio);
        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("portfolios:all", cancellationToken);
        await _cache.RemoveAsync("portfolios:featured", cancellationToken);

        return portfolio.Id;
    }
}
