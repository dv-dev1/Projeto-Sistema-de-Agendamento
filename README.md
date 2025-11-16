API Agendamento - Backend
Este projeto é uma API REST desenvolvida em Node.js, Express e TypeScript para gerenciamento de agendamentos de serviços profissionais. Ele faz parte do sistema AgendaPro, que inclui também um frontend em React/Vite.

Funcionalidades
Cadastro e autenticação de usuários (JWT)
Cadastro de serviços com nome, descrição, preço e duração
Cadastro de profissionais vinculados a usuários e serviços
Definição de horários de disponibilidade dos profissionais
Agendamento de serviços com profissionais
Listagem de agendamentos, serviços e profissionais
Proteção de rotas via autenticação
Tecnologias
Node.js
Express
TypeScript
MongoDB Atlas (Mongoose)
JWT para autenticação
Dotenv para variáveis de ambiente
Como rodar
Instale as dependências:

npm install
Configure o arquivo .env com sua URI do MongoDB Atlas e uma chave JWT:

MONGODB_URI=...JWT_SECRET=...PORT=3333
Inicie o servidor:

npm run dev
Endpoints principais
POST /api/auth/register — Cadastro de usuário
POST /api/auth/login — Login e obtenção do token JWT
POST /api/services — Cadastro de serviço (autenticado)
POST /api/professionals — Cadastro de profissional (autenticado)
GET /api/services — Listagem de serviços
GET /api/professionals — Listagem de profissionais
POST /api/appointments — Agendar serviço
Observações
O backend exige autenticação JWT para rotas protegidas.
O frontend consome esta API e permite agendar serviços, visualizar profissionais e gerenciar agendamentos.
O projeto é ideal para demonstração de sistemas de agendamento online.