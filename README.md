API de Agendamento (Backend)
Bem-vindo ao backend do AgendaPro! Este projeto é o cérebro por trás do nosso sistema de agendamento, uma API REST completa construída com Node.js, Express e TypeScript.

Ele foi projetado para gerenciar tudo, desde usuários e profissionais até os serviços e seus horários. Este backend fornece todos os dados necessários para o nosso Frontend em React/Vite.

Funcionalidades Principais
Aqui está o que esta API pode fazer:

Autenticação Segura: Cadastro e login de usuários usando Tokens JWT (JSON Web Token).

Gerenciamento de Serviços: Permite cadastrar serviços com nome, descrição, preço e duração.

Cadastro de Profissionais: Vincula profissionais a usuários e aos serviços que eles oferecem.

Controle de Disponibilidade: Permite que profissionais definam seus horários de trabalho.

Sistema de Agendamento: O coração da API, permitindo que clientes marquem horários com profissionais para serviços específicos.

Listagem de Dados: Fornece rotas para listar agendamentos, serviços e profissionais.

Rotas Protegidas: Garante que apenas usuários autenticados possam acessar ou modificar dados sensíveis.

Tecnologias Utilizadas
Este projeto foi construído com algumas das tecnologias mais modernas do ecossistema Node.js:

Node.js: O ambiente de execução do nosso JavaScript no backend.

Express: O framework que nos ajuda a construir e organizar as rotas da API.

TypeScript: Para adicionar tipos ao JavaScript, tornando o código mais robusto e fácil de manter.

MongoDB (com Mongoose): Nosso banco de dados NoSQL (rodando no Atlas) para armazenar tudo.

JWT (jsonwebtoken): Para criar e verificar os tokens de autenticação.

Dotenv: Para gerenciar nossas variáveis de ambiente e senhas com segurança.

Como Rodar o Projeto Localmente
Quer testar a API na sua máquina? É só seguir estes passos:

Instale as Dependências: Abra o terminal na pasta do projeto e rode:

Bash

npm install
Configure suas Variáveis de Ambiente: Crie um arquivo chamado .env na raiz do projeto. Ele precisa das seguintes chaves (substitua pelos seus valores):

Snippet de código

# String de conexão do seu banco de dados no MongoDB Atlas
MONGODB_URI=mongodb+srv://...

# Chave secreta para gerar seus tokens JWT (pode ser qualquer string longa)
JWT_SECRET=sua_chave_secreta_aqui

# Porta onde o servidor vai rodar
PORT=3333
Inicie o Servidor: Com tudo configurado, basta rodar:

Bash

npm run dev
E pronto! O servidor estará rodando (geralmente na http://localhost:3333).

🗺️ Endpoints Principais (Rotas da API)
Aqui estão algumas das rotas mais importantes que você pode testar:

POST /api/auth/register — Cria um novo usuário.

POST /api/auth/login — Faz o login e retorna um token JWT.

GET /api/services — Lista todos os serviços.

GET /api/professionals — Lista todos os profissionais.

POST /api/services — Cadastra um novo serviço (Exige autenticação).

POST /api/professionals — Cadastra um novo profissional (Exige autenticação).

POST /api/appointments — Cria um novo agendamento (Exige autenticação).

❗ Observações Importantes
Autenticação: Lembre-se de que a maioria das rotas POST (e outras rotas sensíveis) são protegidas. Você precisará obter um token JWT na rota de login e enviá-lo no cabeçalho Authorization (como Bearer seu-token-aqui) em suas requisições.

Frontend: Esta API foi feita para ser consumida pelo nosso frontend, que cuida da interface de usuário e da experiência de agendamento.