using ChatApp.Models;

namespace ChatApp.Services
{
    public interface IMessageService
    {
        List<Message> GetAll();
        Message Create(Message message);
    }
}
