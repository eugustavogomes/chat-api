
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
cd ChatApp
dotnet run

## Frontend
# chat-frontend

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
npm run dev

## Em:
http://localhost:5173


O Vite está configurado para redirecionar requisições da API no arquivo vite.config.js:
server: {
  proxy: {
    '/message': 'http://localhost:8000'
  }
}

