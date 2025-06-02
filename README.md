
## Backend
# ChatApp

Um projeto fullstack de chat, simulando um WhatsApp simplificado.

 Tecnologias

- Backend: C# (.NET Core Web API)
- Frontend: Vite + React + Bootstrap
- Comunicação: Axios (HTTP API)

Funcionalidades

- Envio de mensagens.
- Lista de mensagens atualiza a cada 3 segundos.
- Validação de campos obrigatórios.
- Layout responsivo e clean.

Como rodar o projeto localmente

### Backend

```bash
cd ChatApp
dotnet run

## Frontend
# Chat Frontend

Frontend do projeto **Chat App**, desenvolvido com **Vite**, **React** e **Bootstrap** para estilização.

Este frontend se conecta a uma API backend feita em C# ASP.NET Core, simulando um aplicativo de chat em tempo real (tipo WhatsApp básico).

---

## Tecnologias Utilizadas

- [React]
- [Vite]
- [Axios]
- [Bootstrap]

---

## 📦 Instalação e Execução
npm install

## Inicie o frontend:

Em:
http://localhost:5173


npm run dev
### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/chat-app.git
cd chat-app/chat-frontend

O Vite está configurado para redirecionar requisições da API no arquivo vite.config.js:
server: {
  proxy: {
    '/message': 'http://localhost:8000'
  }
}

