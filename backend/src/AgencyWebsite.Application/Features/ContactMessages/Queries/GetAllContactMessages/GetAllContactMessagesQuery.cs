using MediatR;

namespace AgencyWebsite.Application.Features.ContactMessages.Queries.GetAllContactMessages;

public class GetAllContactMessagesQuery : IRequest<List<ContactMessageDto>>
{
}
