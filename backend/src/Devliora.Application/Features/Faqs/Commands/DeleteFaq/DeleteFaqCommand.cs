using MediatR;

namespace Devliora.Application.Features.Faqs.Commands.DeleteFaq;

public class DeleteFaqCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
