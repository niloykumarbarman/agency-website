using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using MediatR;

namespace AgencyWebsite.Application.Features.CaseStudies.Commands.CreateCaseStudy;

public class CreateCaseStudyCommandHandler : IRequestHandler<CreateCaseStudyCommand, Guid>
{
    private readonly IAppDbContext _context;
    private readonly ICacheService _cache;

    public CreateCaseStudyCommandHandler(IAppDbContext context, ICacheService cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreateCaseStudyCommand request, CancellationToken cancellationToken)
    {
        var caseStudy = new CaseStudy
        {
            Title = request.Title,
            Slug = request.Slug,
            ClientName = request.ClientName,
            Industry = request.Industry,
            Challenge = request.Challenge,
            Solution = request.Solution,
            Results = request.Results,
            CoverImageUrl = request.CoverImageUrl,
            IsPublished = request.IsPublished
        };

        _context.CaseStudies.Add(caseStudy);
        await _context.SaveChangesAsync(cancellationToken);

        await _cache.RemoveAsync("casestudies:all", cancellationToken);

        return caseStudy.Id;
    }
}
