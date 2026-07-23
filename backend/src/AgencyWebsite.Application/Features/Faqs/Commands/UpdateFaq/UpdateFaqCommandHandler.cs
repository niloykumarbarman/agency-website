using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Faqs.Commands.UpdateFaq;

public class UpdateFaqCommandHandler : IRequestHandler<UpdateFaqCommand, Unit>
{
    private const string CacheKey = "faqs:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public UpdateFaqCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(UpdateFaqCommand request, CancellationToken cancellationToken)
    {
        var faq = await _context.FaqItems
            .FirstOrDefaultAsync(f => f.Id == request.Id && !f.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"FaqItem with Id '{request.Id}' was not found.");

        faq.Question = request.Question;
        faq.Answer = request.Answer;
        faq.DisplayOrder = request.DisplayOrder;
        faq.IsActive = request.IsActive;
        faq.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);

        return Unit.Value;
    }
}
