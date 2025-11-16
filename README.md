API de Agendamento - BackendAPI REST desenvolvida em Node.js e TypeScript para o sistema AgendaPro. Este projeto serve como backend para o Frontend em React/Vite.🛠️ Tecnologias UtilizadasNode.jsExpressTypeScriptMongoDB (Mongoose)JWT (JSON Web Token)Dotenv🚀 Instalação e ExecuçãoSiga os passos abaixo para executar o projeto localmente:1. Pré-requisitosNode.js (versão LTS recomendada)Um banco de dados MongoDB Atlas (ou uma instância local)2. InstalaçãoClone este repositório:Bashgit clone [URL-DO-REPOSITORIO]
Entre na pasta do projeto e instale as dependências:Bashcd api-agendamento-backend
npm install
3. Configuração do AmbienteCrie um arquivo .env na raiz do projeto e preencha com suas credenciais:Snippet de código# URL de conexão completa do MongoDB Atlas
MONGODB_URI=SUA_STRING_DE_CONEXAO_AQUI

# Chave secreta para a assinatura dos tokens JWT
JWT_SECRET=SUA_CHAVE_SECRETA_AQUI

# Porta em que o servidor irá rodar
PORT=3333
4. ExecuçãoInicie o servidor em modo de desenvolvimento (com hot-reload):Bashnpm run dev
O servidor estará disponível em http://localhost:3333 (ou a porta definida no .env).🗺️ Endpoints da APIAutenticação (/api/auth)MétodoRotaDescriçãoPOST/registerRegistra um novo usuário.POST/loginAutentica um usuário e retorna um Token JWT.Serviços (/api/services)MétodoRotaDescriçãoGET/Lista todos os serviços.POST/Cria um novo serviço (Exige autenticação).Profissionais (/api/professionals)MétodoRotaDescriçãoGET/Lista todos os profissionais.POST/Cria um novo profissional (Exige autenticação).Agendamentos (/api/appointments)MétodoRotaDescriçãoPOST/Cria um novo agendamento (Exige autenticação).GET/Lista agendamentos do usuário (Exige autenticação).