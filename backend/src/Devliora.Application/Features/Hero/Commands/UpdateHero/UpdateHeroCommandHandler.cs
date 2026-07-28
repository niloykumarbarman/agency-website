using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Entities;
using Devliora.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Devliora.Application.Features.Hero.Commands.UpdateHero;

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
            .Include(h => h.TelemetryPills)
            .FirstOrDefaultAsync(h => h.Id == request.Id && !h.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"HeroContent with Id '{request.Id}' was not found.");

        hero.Title = request.Title;
        hero.Subtitle = request.Subtitle;
        hero.PrimaryCtaText = request.PrimaryCtaText;
        hero.PrimaryCtaUrl = request.PrimaryCtaUrl;
        hero.SecondaryCtaText = request.SecondaryCtaText;
        hero.SecondaryCtaUrl = request.SecondaryCtaUrl;
        hero.BackgroundImageUrl = request.BackgroundImageUrl;
        hero.BackgroundVideoUrl = request.BackgroundVideoUrl;
        hero.UpdatedAt = DateTime.UtcNow;

        hero.TelemetryPills.Clear();
        foreach (var pill in request.TelemetryPills)
        {
            hero.TelemetryPills.Add(new HeroTelemetryPill
            {
                Label = pill.Label,
                Accent = Enum.Parse<TelemetryAccent>(pill.Accent),
                Top = pill.Top,
                Left = pill.Left,
                DisplayOrder = pill.DisplayOrder,
                HeroContentId = hero.Id
            });
        }

        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);

        return Unit.Value;
    }
}
