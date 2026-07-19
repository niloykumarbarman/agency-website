using AgencyWebsite.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Features.BlogPosts.Commands.DeleteBlogPost;

public class DeleteBlogPostCommandHandler : IRequestHandler<DeleteBlogPostCommand, Unit>
{
    private readonly IAppDbContext _context;

    public DeleteBlogPostCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteBlogPostCommand request, CancellationToken cancellationToken)
    {
        var blogPost = await _context.BlogPosts
            .FirstOrDefaultAsync(b => b.Id == request.Id && !b.IsDeleted, cancellationToken)
            ?? throw new KeyNotFoundException($"BlogPost with Id '{request.Id}' was not found.");

        blogPost.IsDeleted = true;
        blogPost.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
