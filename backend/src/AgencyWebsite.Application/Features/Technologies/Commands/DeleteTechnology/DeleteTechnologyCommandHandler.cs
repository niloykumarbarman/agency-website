using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Technologies.Commands.DeleteTechnology;

public class DeleteTechnologyCommandHandler : IRequestHandler<DeleteTechnologyCommand, Unit>
{
    private const string CacheKey = "technologies:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public DeleteTechnologyCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(DeleteTechnologyCommand request, CancellationToken cancellationToken)
    {
        var technology = await _context.TechnologyItems
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"TechnologyItem with Id '{request.Id}' was not found.");

        technology.IsDeleted = true;
        technology.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);

        return Unit.Value;
    }
}
