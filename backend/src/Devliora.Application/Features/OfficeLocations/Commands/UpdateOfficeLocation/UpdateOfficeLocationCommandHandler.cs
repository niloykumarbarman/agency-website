using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.OfficeLocations.Commands.UpdateOfficeLocation;
public class UpdateOfficeLocationCommandHandler : IRequestHandler<UpdateOfficeLocationCommand, Unit>
{
    private const string CacheKey = "officelocations:all";
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;
    public UpdateOfficeLocationCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }
    public async Task<Unit> Handle(UpdateOfficeLocationCommand request, CancellationToken cancellationToken)
    {
        var location = await _context.OfficeLocations
            .FirstOrDefaultAsync(o => o.Id == request.Id && !o.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"OfficeLocation with Id '{request.Id}' was not found.");
        location.Country = request.Country;
        location.Address = request.Address;
        location.Phone = request.Phone;
        location.Email = request.Email;
        location.MapQuery = request.MapQuery;
        location.DisplayOrder = request.DisplayOrder;
        location.IsActive = request.IsActive;
        location.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);
        return Unit.Value;
    }
}
