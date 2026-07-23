using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Hero.Commands.UpdateHero;

public class UpdateHeroCommandHandler : IRequestHandler<UpdateHeroCommand, Unit>
{
    private const string CacheKey = "hero:content";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public UpdateHeroCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(UpdateHeroCommand request, CancellationToken cancellationToken)
    {
        var hero = await _context.HeroContents
            .FirstOrDefaultAsync(h => h.Id == request.Id && !h.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"HeroContent with Id '{request.Id}' was not found.");

        hero.Title = request.Title;
        hero.Subtitle = request.Subtitle;
        hero.PrimaryCtaText = request.PrimaryCtaText;
        hero.PrimaryCtaUrl = request.PrimaryCtaUrl;
        hero.SecondaryCtaText = request.SecondaryCtaText;
        hero.SecondaryCtaUrl = request.SecondaryCtaUrl;
        hero.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);

        return Unit.Value;
    }
}
