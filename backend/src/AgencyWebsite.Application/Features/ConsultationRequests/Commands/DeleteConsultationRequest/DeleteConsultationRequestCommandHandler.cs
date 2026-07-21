using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.ConsultationRequests.Commands.DeleteConsultationRequest;

public class DeleteConsultationRequestCommandHandler : IRequestHandler<DeleteConsultationRequestCommand, Unit>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public DeleteConsultationRequestCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(DeleteConsultationRequestCommand request, CancellationToken cancellationToken)
    {
        var consultationRequest = await _context.ConsultationRequests
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"ConsultationRequest with Id '{request.Id}' was not found.");

        consultationRequest.IsDeleted = true;
        consultationRequest.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("consultationrequests:all", cancellationToken);

        return Unit.Value;
    }
}
