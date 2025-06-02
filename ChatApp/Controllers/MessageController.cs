using ChatApp.Models;
using ChatApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        public ActionResult<List<Message>> Get()
        {
            return _messageService.GetAll();
        }

        [HttpPost]
        public ActionResult<Message> Post([FromBody] Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdMessage = _messageService.Create(message);
            return CreatedAtAction(nameof(Get), new { id = createdMessage.Id }, createdMessage);
        }
    }
}
