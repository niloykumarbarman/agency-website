using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Entities;
using MediatR;
namespace Devliora.Application.Features.Partners.Commands.CreatePartner;
public class CreatePartnerCommandHandler : IRequestHandler<CreatePartnerCommand, Guid>
{
    private const string CacheKey = "partners:all";
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;
    public CreatePartnerCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }
    public async Task<Guid> Handle(CreatePartnerCommand request, CancellationToken cancellationToken)
    {
        var partner = new Partner
        {
            Name = request.Name.Trim(),
            LogoUrl = request.LogoUrl.Trim(),
            WebsiteUrl = request.WebsiteUrl.Trim(),
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive
        };
        _context.Partners.Add(partner);
        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);
        return partner.Id;
    }
}
