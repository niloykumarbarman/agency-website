using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.ContactMessages.Queries.GetAllContactMessages;

public class GetAllContactMessagesQueryHandler : IRequestHandler<GetAllContactMessagesQuery, List<ContactMessageDto>>
{
    private readonly IAppDbContext _context;

    public GetAllContactMessagesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ContactMessageDto>> Handle(GetAllContactMessagesQuery request, CancellationToken cancellationToken)
    {
        return await _context.ContactMessages
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
    }
}
