import { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-header bg-primary text-white text-center">
          <h3>💬 Chat App</h3>
        </div>
        <div className="card-body" style={{ height: '400px', overflowY: 'scroll', backgroundColor: '#f8f9fa' }}>
          {messages.length === 0 ? (
            <p className="text-center text-muted">Nenhuma mensagem ainda...</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="mb-3">
                <small className="text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                <div className="p-2 mt-1 rounded" style={{ backgroundColor: '#e9ecef' }}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem"
            />
            <button
              className="btn btn-primary"
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
