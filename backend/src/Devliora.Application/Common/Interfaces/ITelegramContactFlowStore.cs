namespace Devliora.Application.Common.Interfaces;

public enum TelegramContactFlowStep
{
    None = 0,
    AwaitingName = 1,
    AwaitingEmail = 2,
    AwaitingPhone = 3,
    AwaitingMessage = 4
}

public class TelegramContactFlowState
{
    public TelegramContactFlowStep Step { get; set; } = TelegramContactFlowStep.None;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
}

public interface ITelegramContactFlowStore
{
    Task<TelegramContactFlowState?> GetAsync(long chatId, CancellationToken cancellationToken = default);

    Task SetAsync(long chatId, TelegramContactFlowState state, CancellationToken cancellationToken = default);

    Task ClearAsync(long chatId, CancellationToken cancellationToken = default);
}
