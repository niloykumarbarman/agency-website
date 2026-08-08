using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Entities;
using MediatR;
namespace Devliora.Application.Features.OfficeLocations.Commands.CreateOfficeLocation;
public class CreateOfficeLocationCommandHandler : IRequestHandler<CreateOfficeLocationCommand, Guid>
{
    private const string CacheKey = "officelocations:all";
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;
    public CreateOfficeLocationCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }
    public async Task<Guid> Handle(CreateOfficeLocationCommand request, CancellationToken cancellationToken)
    {
        var location = new OfficeLocation
        {
            Country = request.Country,
            Address = request.Address,
            Phone = request.Phone,
            Email = request.Email,
            MapQuery = request.MapQuery,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };
        _context.OfficeLocations.Add(location);
        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);
        return location.Id;
    }
}
