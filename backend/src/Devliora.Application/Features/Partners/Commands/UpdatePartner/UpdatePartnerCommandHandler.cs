using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.Partners.Commands.UpdatePartner;
public class UpdatePartnerCommandHandler : IRequestHandler<UpdatePartnerCommand, Unit>
{
    private const string CacheKey = "partners:all";
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;
    public UpdatePartnerCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }
    public async Task<Unit> Handle(UpdatePartnerCommand request, CancellationToken cancellationToken)
    {
        var partner = await _context.Partners
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"Partner with Id '{request.Id}' was not found.");
        partner.Name = request.Name;
        partner.LogoUrl = request.LogoUrl;
        partner.WebsiteUrl = request.WebsiteUrl;
        partner.DisplayOrder = request.DisplayOrder;
        partner.IsActive = request.IsActive;
        partner.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);
        return Unit.Value;
    }
}
