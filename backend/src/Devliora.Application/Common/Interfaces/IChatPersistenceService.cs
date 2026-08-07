using Devliora.Domain.Enums;
namespace Devliora.Application.Common.Interfaces;
public interface IChatPersistenceService
{
    Task SaveTurnAsync(
        ChatChannel channel,
        string externalId,
        string role,
        string content,
        CancellationToken cancellationToken = default);
}
