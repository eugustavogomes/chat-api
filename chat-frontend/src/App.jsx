import { useState, useEffect, useRef } from 'react';
import api from './api';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [botTyping, setBotTyping] = useState(false); 
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/');
      setMessages(response.data);

     
      const hasBotResponse = response.data.some(msg => msg.sender === 'bot');
      if (hasBotResponse) {
        setBotTyping(false); 
      }
    } catch (error) {
      console.error('Erro ao buscar mensagens', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await api.post('/', { content: newMessage });
      setNewMessage('');
      setBotTyping(true);
      setTimeout(fetchMessages, 1500); 
    } catch (error) {
      console.error('Erro ao enviar mensagem', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow" style={{ width: '100%', maxWidth: '500px', borderRadius: '20px' }}>
        <div className="card-header bg-primary text-white text-center rounded-top" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
          <h3 className="my-2">💬 Chat App</h3>
        </div>
        <div className="card-body p-3" style={{ height: '400px', overflowY: 'auto', backgroundColor: '#f1f1f1', borderBottom: '1px solid #dee2e6' }}>
          {messages.length === 0 ? (
            <p className="text-center text-muted">Nenhuma mensagem ainda...</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`p-2 rounded ${msg.sender === 'user' ? 'bg-success text-white' : 'bg-light text-dark'}`} style={{ maxWidth: '80%' }}>
                  <small className="d-block">{msg.content}</small>
                  <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              </div>
            ))
          )}
          {botTyping && ( 
            <div className="d-flex mb-3 justify-content-start">
              <div className="p-2 rounded bg-light text-dark" style={{ maxWidth: '80%' }}>
                <small className="d-block"><i>Bot está digitando...</i></small>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="card-footer bg-white border-0">
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded-pill"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua mensagem..."
            />
            <button
              className="btn btn-primary ms-2 rounded-pill"
              onClick={sendMessage}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
