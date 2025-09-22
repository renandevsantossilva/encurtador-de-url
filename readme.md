# 🔗 Encurtador de URL

Um projeto **fullstack** para encurtar links, feito em:

- **Frontend** → React + Vite + TypeScript  
- **Backend** → Node.js + Express + Prisma (com SQLite como banco de dados)  

O sistema permite gerar slugs curtos para URLs e redirecionar para o link original.

---

## 🚀 Tecnologias usadas

### Frontend
- React + Vite
- TypeScript
- Fetch API

### Backend
- Node.js
- Express
- Prisma ORM
- SQLite (padrão, mas pode trocar para MySQL/Postgres/Redis)

---

## 📂 Estrutura do projeto

├─ backend/ # API com Express + Prisma
└─ frontend/ # Interface em React + Vite

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/SEU-USUARIO/encurtador-url.git
cd encurtador-url

Configurar o backend

cd backend
npm install

DATABASE_URL="file:./dev.db"


npx prisma migrate dev --name init


npm run dev


Configurar o frontend

cd frontend
npm install
npm run dev


📌 Como usar

Abra http://localhost:5173.

Digite a URL que deseja encurtar.

Clique em Encurtar.

O sistema vai gerar um link curto como:

http://localhost:4000/abc123


🔮 Próximos passos (sugestões)

Usar banco Postgres ou MySQL em produção.

Adicionar autenticação para gerenciar links de usuários.

Criar analytics (quantos cliques cada link recebeu).

Deploy no Railway/Render (backend) e Vercel/Netlify (frontend).


---

Projeto desenvolvido por: Renan dos Santos Silva - Desenvolvedor full stack Jr.
