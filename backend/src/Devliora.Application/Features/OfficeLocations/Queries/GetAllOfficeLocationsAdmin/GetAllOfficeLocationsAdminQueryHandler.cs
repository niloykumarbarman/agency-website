using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.OfficeLocations.Queries.GetAllOfficeLocationsAdmin;
public class GetAllOfficeLocationsAdminQueryHandler : IRequestHandler<GetAllOfficeLocationsAdminQuery, List<AdminOfficeLocationDto>>
{
    private readonly IAppDbContext _context;
    public GetAllOfficeLocationsAdminQueryHandler(IAppDbContext context)
    {
        _context = context;
    }
    public async Task<List<AdminOfficeLocationDto>> Handle(GetAllOfficeLocationsAdminQuery request, CancellationToken cancellationToken)
    {
        return await _context.OfficeLocations
            .Where(o => !o.IsDeleted)
            .OrderBy(o => o.DisplayOrder)
            .Select(o => new AdminOfficeLocationDto
            {
                Id = o.Id,
                Country = o.Country,
                Address = o.Address,
                Phone = o.Phone,
                Email = o.Email,
                MapQuery = o.MapQuery,
                DisplayOrder = o.DisplayOrder,
                IsActive = o.IsActive
            })
            .ToListAsync(cancellationToken);
    }
}
