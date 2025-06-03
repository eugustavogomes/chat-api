using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace ChatApp.Services
{
    public class CohereService
    {
        private readonly HttpClient _httpClient;
        private readonly string? _apiKey;

        public CohereService(IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            _apiKey = configuration["Cohere:ApiKey"];

            if (string.IsNullOrWhiteSpace(_apiKey))
            {
                throw new ArgumentException("API Key da Cohere não configurada.");
            }

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        }

        public async Task<string> GetResponseAsync(string prompt)
        {
            var requestBody = new
            {
                message = prompt,
                model = "command-r-plus",
                temperature = 0.3,
                stream = false
            };

            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("https://api.cohere.ai/v1/chat", content);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(jsonResponse);
                var text = doc.RootElement.GetProperty("text").GetString() ?? "Sem resposta gerada.";
                return text.Trim();
            }

            return "Desculpe, não consegui responder agora.";
        }
    }
}
