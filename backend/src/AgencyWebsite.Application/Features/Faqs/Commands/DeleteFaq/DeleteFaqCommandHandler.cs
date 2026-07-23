using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Faqs.Commands.DeleteFaq;

public class DeleteFaqCommandHandler : IRequestHandler<DeleteFaqCommand, Unit>
{
    private const string CacheKey = "faqs:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public DeleteFaqCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(DeleteFaqCommand request, CancellationToken cancellationToken)
    {
        var faq = await _context.FaqItems
            .FirstOrDefaultAsync(f => f.Id == request.Id && !f.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"FaqItem with Id '{request.Id}' was not found.");

        faq.IsDeleted = true;
        faq.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);

        return Unit.Value;
    }
}
