using Devliora.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Devliora.Application.Features.Partners.Queries.GetAllPartnersAdmin;
public class GetAllPartnersAdminQueryHandler : IRequestHandler<GetAllPartnersAdminQuery, List<AdminPartnerDto>>
{
    private readonly IAppDbContext _context;
    public GetAllPartnersAdminQueryHandler(IAppDbContext context)
    {
        _context = context;
    }
    public async Task<List<AdminPartnerDto>> Handle(GetAllPartnersAdminQuery request, CancellationToken cancellationToken)
    {
        return await _context.Partners
            .Where(p => !p.IsDeleted)
            .OrderBy(p => p.DisplayOrder)
            .Select(p => new AdminPartnerDto
            {
                Id = p.Id,
                Name = p.Name,
                LogoUrl = p.LogoUrl,
                WebsiteUrl = p.WebsiteUrl,
                DisplayOrder = p.DisplayOrder,
                IsActive = p.IsActive
            })
            .ToListAsync(cancellationToken);
    }
}
