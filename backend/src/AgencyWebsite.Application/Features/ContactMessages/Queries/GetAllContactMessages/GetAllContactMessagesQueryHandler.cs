using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.ContactMessages.Queries.GetAllContactMessages;

public class GetAllContactMessagesQueryHandler : IRequestHandler<GetAllContactMessagesQuery, List<ContactMessageDto>>
{
    private const string CacheKey = "contactmessages:all";

    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public GetAllContactMessagesQueryHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<List<ContactMessageDto>> Handle(GetAllContactMessagesQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cache.GetAsync<List<ContactMessageDto>>(CacheKey, cancellationToken);
        if (cached is not null)
        {
            return cached;
        }

        var result = await _context.ContactMessages
            .Where(m => !m.IsDeleted)
            .OrderByDescending(m => m.CreatedAt)
            .Select(m => new ContactMessageDto
            {
                Id = m.Id,
                FullName = m.FullName,
                Email = m.Email,
                Subject = m.Subject,
                Status = m.Status.ToString(),
                CreatedAt = m.CreatedAt
            })
            .ToListAsync(cancellationToken);

        await _cache.SetAsync(CacheKey, result, TimeSpan.FromMinutes(5), cancellationToken);

        return result;
    }
}
