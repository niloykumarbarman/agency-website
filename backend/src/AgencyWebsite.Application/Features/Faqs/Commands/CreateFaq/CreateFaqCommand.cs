using MediatR;

namespace AgencyWebsite.Application.Features.Faqs.Commands.CreateFaq;

public class CreateFaqCommand : IRequest<Guid>
{
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
