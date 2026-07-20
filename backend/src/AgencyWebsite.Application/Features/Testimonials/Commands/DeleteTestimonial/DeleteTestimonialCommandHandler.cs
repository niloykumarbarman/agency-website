using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.Testimonials.Commands.DeleteTestimonial;

public class DeleteTestimonialCommandHandler : IRequestHandler<DeleteTestimonialCommand, Unit>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public DeleteTestimonialCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Unit> Handle(DeleteTestimonialCommand request, CancellationToken cancellationToken)
    {
        var testimonial = await _context.Testimonials
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"Testimonial with Id '{request.Id}' was not found.");

        testimonial.IsDeleted = true;
        testimonial.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("testimonials:all", cancellationToken);
        await _cache.RemoveAsync("testimonials:featured", cancellationToken);

        return Unit.Value;
    }
}
