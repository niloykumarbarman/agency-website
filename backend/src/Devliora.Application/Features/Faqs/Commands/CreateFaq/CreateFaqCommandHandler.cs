using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Entities;
using MediatR;

namespace Devliora.Application.Features.Faqs.Commands.CreateFaq;

public class CreateFaqCommandHandler : IRequestHandler<CreateFaqCommand, Guid>
{
    private const string CacheKey = "faqs:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public CreateFaqCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreateFaqCommand request, CancellationToken cancellationToken)
    {
        var faq = new FaqItem
        {
            Question = request.Question,
            Answer = request.Answer,
            DisplayOrder = request.DisplayOrder
        };

        _context.FaqItems.Add(faq);
        await _context.SaveChangesAsync(cancellationToken);
        await _cache.RemoveAsync(CacheKey, cancellationToken);

        return faq.Id;
    }
}
