# Sistema de Delivery — Front-End

O **Sistema de Delivery Front-End** é uma aplicação web moderna desenvolvida em **React + TypeScript + Vite**, projetada para gerenciar produtos, categorias e interações do usuário de forma eficiente.  
O projeto segue uma arquitetura limpa, usa padrões consistentes e integrações bem definidas, mantendo organização e boas práticas.

---

## 🚀 Tecnologias Utilizadas

### Core
- React 19
- TypeScript
- Vite 7
- React Router DOM 7
- Axios

### UI / Estilo
- TailwindCSS 4
- tailwindcss-animate
- Lucide React
- Phosphor Icons
- React Toastify
- React Spinners
- reactjs-popup

### Qualidade do Código
- ESLint 9
- TypeScript ESLint

---

## 📁 Estrutura do Projeto

/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── produtos/
│   │   ├── categorias/
│   │   └── ui/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

---

## 🌐 Rotas da Aplicação

- `/` — Página inicial
- `/produtos` — Listagem de produtos
- `/adicionarproduto` — Cadastro de produto
- `/editarproduto/:id` — Edição
- `/deletarproduto/:id` — Exclusão
- `/categorias` — Gerenciamento de categorias

---

## 🔄 Integração com Backend

A aplicação utiliza Axios para comunicação com o backend.  
Padrões internos:

- Instância Axios centralizada
- Requisições com async/await
- Tratamento de erros com React Toastify
- Loaders com React Spinners

---

## 🎨 Estilização

- TailwindCSS v4 com classes utilitárias
- Animações com tailwindcss-animate
- Componentes responsivos e consistentes

---

## ⚙️ Scriptsnpm run dev        # Desenvolvimento
npm run build      # Build de produção
npm run preview    # Pré-visualização
npm run lint       # ESLint
---

## 🧩 Padrões de Componentização

Para cada funcionalidade:

- Listagem
- Criação
- Edição
- Exclusão
- Loader
- Toasts
- Verificações padronizadas

---

## 📦 Instalação

### 1. Clonar o repositóriogit clone https://github.com/GenStudents/SistemaDeDeliveyFrontEnd
### 2. Instalar dependênciasnpm install
### 3. Rodar servidornpm run dev
---

## 🤝 Contribuindo

1. Faça um fork  
2. Crie uma branch  
3. Commit  
4. Push  
5. Abra um PR  

---

## 📄 Licença

Projeto acadêmico/educacional. Edite conforme necessário.
