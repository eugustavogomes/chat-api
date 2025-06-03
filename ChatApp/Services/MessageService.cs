using ChatApp.Models;

namespace ChatApp.Services
{
    public class MessageService : IMessageService
    {
        private static List<Message> _messages = new List<Message>();
        private readonly CohereService _cohereService;

        public MessageService(CohereService cohereService)
        {
            _cohereService = cohereService;
        }

        public List<Message> GetAll()
        {
            return _messages.OrderBy(m => m.Timestamp).ToList();
        }

        public Message Create(Message message)
        {
            message.Timestamp = DateTime.UtcNow;
            message.Id = _messages.Count + 1;
            message.Sender = "user";  
            _messages.Add(message);

            
            _ = GenerateBotResponseAsync(message.Content);

            return message;
        }

        private async Task GenerateBotResponseAsync(string userMessage)
        {
            var botResponse = await _cohereService.GetResponseAsync(userMessage);

            var botMessage = new Message
            {
                Timestamp = DateTime.UtcNow,
                Id = _messages.Count + 1,
                Content = botResponse,
                Sender = "bot"  
            };

            _messages.Add(botMessage);
        }
    }
}
