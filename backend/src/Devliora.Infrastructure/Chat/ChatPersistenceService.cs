using Devliora.Application.Common.Interfaces;
using Devliora.Domain.Entities;
using Devliora.Domain.Enums;
using Devliora.Infrastructure.Telegram;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Devliora.Infrastructure.Chat;
public class ChatPersistenceService : IChatPersistenceService
{
    private readonly IAppDbContext _context;
    private readonly ITelegramApiClient _telegramApiClient;
    private readonly TelegramAssistantSettings _settings;
    private readonly ILogger<ChatPersistenceService> _logger;

    public ChatPersistenceService(
        IAppDbContext context,
        ITelegramApiClient telegramApiClient,
        IOptions<TelegramAssistantSettings> settings,
        ILogger<ChatPersistenceService> logger)
    {
        _context = context;
        _telegramApiClient = telegramApiClient;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task SaveTurnAsync(
        ChatChannel channel,
        string externalId,
        string role,
        string content,
        CancellationToken cancellationToken = default)
    {
        var conversation = await _context.ChatConversations
            .FirstOrDefaultAsync(
                c => c.Channel == channel && c.ExternalId == externalId && !c.IsDeleted,
                cancellationToken);

        var isNewConversation = conversation is null;

        if (conversation is null)
        {
            conversation = new ChatConversation
            {
                Channel = channel,
                ExternalId = externalId,
                LastMessageAt = DateTime.UtcNow
            };
            _context.ChatConversations.Add(conversation);
        }
        else
        {
            conversation.LastMessageAt = DateTime.UtcNow;
        }

        _context.ChatMessages.Add(new ChatMessage
        {
            ConversationId = conversation.Id,
            Role = role,
            Content = content
        });

        await _context.SaveChangesAsync(cancellationToken);

        if (role == "user")
        {
            await NotifyAdminAsync(channel, externalId, content, isNewConversation, cancellationToken);
        }
    }

    private async Task NotifyAdminAsync(
        ChatChannel channel,
        string externalId,
        string content,
        bool isNewConversation,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(_settings.AdminChatId)
            || !long.TryParse(_settings.AdminChatId, out var adminChatId))
        {
            return;
        }

        // Never alert about the admin's own testing on the Telegram channel,
        // to avoid the bot pinging itself back.
        if (channel == ChatChannel.Telegram && externalId == _settings.AdminChatId)
        {
            return;
        }

        var preview = content.Length > 200 ? content[..200] + "..." : content;
        var badge = isNewConversation ? "New conversation" : "New message";
        var text = $"{badge} ({channel}):\n{preview}";

        try
        {
            await _telegramApiClient.SendMessageAsync(adminChatId, text, cancellationToken);
        }
        catch (Exception ex)
        {
            // Notifications are best-effort; never fail the chat request because of it.
            _logger.LogWarning(ex, "Failed to send admin chat notification for channel {Channel}", channel);
        }
    }
}
