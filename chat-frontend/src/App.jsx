import { useState, useEffect, useRef } from 'react';
import api from './api';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/');
      setMessages(response.data);
    } catch (error) {
      console.error('Erro ao buscar mensagens', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await api.post('/', { content: newMessage });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Erro ao enviar mensagem', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
        <div className="card-header bg-primary text-white text-center rounded-top" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
          <h3 className="my-2">💬 Chat App</h3>
        </div>
        <div className="card-body p-3" style={{ height: '400px', overflowY: 'auto', backgroundColor: '#f1f1f1', borderBottom: '1px solid #dee2e6' }}>
          {messages.length === 0 ? (
            <p className="text-center text-muted">Nenhuma mensagem ainda...</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="d-flex flex-column mb-3">
                <small className="text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                <div className="p-2 rounded" style={{ backgroundColor: '#d1e7dd', alignSelf: 'flex-start', maxWidth: '80%' }}>
                  {msg.content}
                </div>
              </div>
            ))
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
              onKeyDown={handleKeyDown}  
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
