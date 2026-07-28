using MediatR;

namespace Devliora.Application.Features.ContactMessages.Queries.GetAllContactMessages;

public class GetAllContactMessagesQuery : IRequest<List<ContactMessageDto>>
{
}
