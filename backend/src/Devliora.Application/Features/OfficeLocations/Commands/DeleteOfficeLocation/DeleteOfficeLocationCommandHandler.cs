using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.OfficeLocations.Commands.DeleteOfficeLocation;
public class DeleteOfficeLocationCommandHandler : IRequestHandler<DeleteOfficeLocationCommand, Unit>
{
    private const string CacheKey = "officelocations:all";
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;
    public DeleteOfficeLocationCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }
    public async Task<Unit> Handle(DeleteOfficeLocationCommand request, CancellationToken cancellationToken)
    {
        var location = await _context.OfficeLocations
            .FirstOrDefaultAsync(o => o.Id == request.Id && !o.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"OfficeLocation with Id '{request.Id}' was not found.");
        location.IsDeleted = true;
        location.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);
        return Unit.Value;
    }
}
