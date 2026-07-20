using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.ContactMessages.Commands.UpdateContactMessageStatus;

public class UpdateContactMessageStatusCommandHandler : IRequestHandler<UpdateContactMessageStatusCommand, Unit>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public UpdateContactMessageStatusCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(UpdateContactMessageStatusCommand request, CancellationToken cancellationToken)
    {
        var message = await _context.ContactMessages
            .FirstOrDefaultAsync(m => m.Id == request.Id && !m.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"ContactMessage with Id '{request.Id}' was not found.");

        message.Status = request.Status;
        message.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("contactmessages:all", cancellationToken);

        return Unit.Value;
    }
}
