using System.ComponentModel.DataAnnotations;

namespace ChatApp.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O conteúdo da mensagem é obrigatório.")]
        [MaxLength(500, ErrorMessage = "O conteúdo não pode exceder 500 caracteres.")]
        public required string Content { get; set; }  // <-- required aqui!

        public DateTime Timestamp { get; set; }
    }
}