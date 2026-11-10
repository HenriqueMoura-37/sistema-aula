# Sistema Aula

CRUD de pessoas.

- `Back/`  - API: Node.js, Express, PostgreSQL e Swagger (porta 3000)
- `Front/` - Interface: React com Vite (porta 5173)

## Como rodar

1. Crie um banco no PostgreSQL chamado `sistema_aula`.
2. Back:
   ```
   cd Back
   copy .env.example .env      (ajuste a senha e a porta do banco no .env)
   npm install
   npm run dev
   ```
3. Front (outro terminal):
   ```
   cd Front
   npm install
   npm run dev
   ```
4. Acesse http://localhost:5173/ (Swagger: http://localhost:3000/api-docs).
