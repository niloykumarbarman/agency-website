using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Services.Commands.DeleteService;

public class DeleteServiceCommandHandler : IRequestHandler<DeleteServiceCommand, Unit>
{
    private readonly IAppDbContext _context;

    public DeleteServiceCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteServiceCommand request, CancellationToken cancellationToken)
    {
        var service = await _context.Services
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"Service with Id '{request.Id}' was not found.");

        // Soft delete: preserves audit history and avoids breaking foreign key references.
        service.IsDeleted = true;
        service.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
