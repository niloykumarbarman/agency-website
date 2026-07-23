using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Features.Technologies.Commands.CreateTechnology;

public class CreateTechnologyCommandHandler : IRequestHandler<CreateTechnologyCommand, Guid>
{
    private const string CacheKey = "technologies:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public CreateTechnologyCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreateTechnologyCommand request, CancellationToken cancellationToken)
    {
        var technology = new TechnologyItem
        {
            Name = request.Name,
            Category = request.Category,
            DisplayOrder = request.DisplayOrder
        };

        _context.TechnologyItems.Add(technology);
        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);

        return technology.Id;
    }
}
