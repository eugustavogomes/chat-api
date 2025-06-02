using ChatApp.Models;

namespace ChatApp.Services
{
    public class MessageService : IMessageService
    {
        private static List<Message> _messages = new List<Message>();

        public List<Message> GetAll()
        {
            return _messages.OrderBy(m => m.Timestamp).ToList();
        }

        public Message Create(Message message)
        {
            message.Timestamp = DateTime.UtcNow;
            message.Id = _messages.Count + 1;
            _messages.Add(message);
            return message;
        }
    }
}
