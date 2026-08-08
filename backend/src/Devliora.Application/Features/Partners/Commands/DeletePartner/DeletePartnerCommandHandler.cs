using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.Partners.Commands.DeletePartner;
public class DeletePartnerCommandHandler : IRequestHandler<DeletePartnerCommand, Unit>
{
    private const string CacheKey = "partners:all";
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;
    public DeletePartnerCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }
    public async Task<Unit> Handle(DeletePartnerCommand request, CancellationToken cancellationToken)
    {
        var partner = await _context.Partners
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"Partner with Id '{request.Id}' was not found.");
        partner.IsDeleted = true;
        partner.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);
        return Unit.Value;
    }
}
