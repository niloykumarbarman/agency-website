using Devliora.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace Devliora.Infrastructure.Telegram;

public class TelegramContactFlowStore : ITelegramContactFlowStore
{
    private readonly ICacheService _cacheService;
    private readonly ILogger<TelegramContactFlowStore> _logger;
    private const string KeyPrefix = "assistant:telegram:contact-flow:";
    private static readonly TimeSpan Ttl = TimeSpan.FromMinutes(15);

    public TelegramContactFlowStore(ICacheService cacheService, ILogger<TelegramContactFlowStore> logger)
    {
        _cacheService = cacheService;
        _logger = logger;
    }

    public async Task<TelegramContactFlowState?> GetAsync(long chatId, CancellationToken cancellationToken = default)
    {
        return await _cacheService.GetAsync<TelegramContactFlowState>(BuildKey(chatId), cancellationToken);
    }

    public async Task SetAsync(long chatId, TelegramContactFlowState state, CancellationToken cancellationToken = default)
    {
        try
        {
            await _cacheService.SetAsync(BuildKey(chatId), state, Ttl, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to persist Telegram contact flow state for chat {ChatId}", chatId);
        }
    }

    public async Task ClearAsync(long chatId, CancellationToken cancellationToken = default)
    {
        await _cacheService.RemoveAsync(BuildKey(chatId), cancellationToken);
    }

    private static string BuildKey(long chatId) => $"{KeyPrefix}{chatId}";
}
