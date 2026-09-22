# 🚀 Tasks Manager — React Front-End

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-7.5.1-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Axios-1.8.4-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

Interface web moderna para gerenciamento pessoal e produtivo de tarefas, desenvolvida com **React 19**, **Vite** e estilização temática espacial/cyberpunk com animações dinâmicas e efeitos visuais imersivos. A aplicação integra-se a uma API RESTful para autenticação com JWT e persistência completa de tarefas (CRUD).

---

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔌 Integração com a API (Endpoints)](#-integração-com-a-api-endpoints)
- [🚀 Pré-requisitos e Instalação](#-pré-requisitos-e-instalação)
- [⚙️ Scripts Disponíveis](#️-scripts-disponíveis)
- [🎨 Destaques de Design e UI](#-destaques-de-design-e-ui)
- [👤 Autor](#-autor)

---

## ✨ Funcionalidades

- **🔐 Autenticação de Usuários:**
  - Cadastro de nova conta com validação de campos (`Nome`, `Email` e `Senha`).
  - Login seguro gerando e armazenando token JWT no `localStorage`.
  - Controle de estado global de sessão via **Context API (`AuthContext`)**.
  - Roteamento e redirecionamento de rotas com `react-router-dom`.

- **📝 Gerenciamento Completo de Tarefas (CRUD):**
  - **Criação:** Criação de tarefas com título, descrição detalhada, prioridade e status inicial.
  - **Listagem:** Visualização em grid de cards modernos com metadados (data de criação, badges de prioridade e status).
  - **Atualização de Status com 1 Clique:** Alternância rápida entre status de tarefas (ex: concluir ou reabrir tarefas).
  - **Exclusão:** Remoção de tarefas com confirmação de segurança.

- **🪐 Filtros e Abas Espaciais:**
  - Filtragem dinâmica por prioridade (**Baixa**, **Média**, **Alta**).
  - Abas temáticas em formato de planetas para alternar facilmente entre visualizações:
    - *Todas as tarefas*
    - *Em Andamento*
    - *Pendentes*
    - *Concluídas*

- **👤 Perfil do Usuário:**
  - Consulta de dados cadastrais e atualização de perfil conectado aos serviços da API.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/):** Biblioteca declarativa e reativa para interfaces de usuário.
- **[Vite 6](https://vitejs.dev/):** Build tool ultrarrápido com Hot Module Replacement (HMR).
- **[React Router DOM 7](https://reactrouter.com/):** Gerenciamento de navegação e rotas SPA.
- **[Axios](https://axios-http.com/):** Cliente HTTP baseado em promises para comunicação com a API REST.
- **[React Icons](https://react-icons.github.io/react-icons/):** Pacote de ícones customizáveis (Feather Icons e FontAwesome).
- **CSS3 / SVG Filters:** Efeitos visuais avançados, animações interativas, filtros SVG (feTurbulence, feDisplacementMap) e responsividade.

---

## 📁 Estrutura do Projeto

```text
React-FrontEnd/
├── pos-tasks-api/             # Módulo / Submódulo da API Backend (Node.js/Express)
├── pos-tasks-frontend/        # Aplicação Web React
│   ├── public/                # Arquivos estáticos
│   ├── src/
│   │   ├── assets/            # Imagens, vetores e planos de fundo temáticos
│   │   ├── pages/             # Telas da aplicação
│   │   │   ├── Login/         # Tela de Login com efeitos luminosos
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── LoginPage.css
│   │   │   ├── SignUp/        # Tela de Registro de novos usuários
│   │   │   │   ├── SignUpPage.jsx
│   │   │   │   └── SignUpPage.css
│   │   │   ├── Tasks/         # Painel principal de tarefas com filtros planetários
│   │   │   │   ├── TasksPage.jsx
│   │   │   │   └── TasksPage.css
│   │   │   └── Profile/       # Edição de perfil do usuário
│   │   │       ├── ProfilePage.jsx
│   │   │       └── ProfilePage.css
│   │   ├── services/          # Contextos e serviços da aplicação
│   │   │   └── AuthContext.jsx # Provedor de autenticação e gerenciamento de token
│   │   ├── App.jsx            # Configuração de rotas e provedores
│   │   ├── App.css            # Estilos globais da aplicação
│   │   ├── main.jsx           # Ponto de entrada do React DOM
│   │   └── index.css          # Reset e estilos de base
│   ├── index.html             # Template HTML principal
│   ├── package.json           # Dependências e scripts npm
│   └── vite.config.js         # Configurações do Vite
└── README.md                  # Documentação do repositório
```

---

## 🔌 Integração com a API (Endpoints)

A aplicação consome os seguintes endpoints do backend (padrão configurado: `http://localhost:3000/api`):

| Método | Endpoint | Descrição | Requer Auth (Bearer Token) |
|---|---|---|:---:|
| `POST` | `/auth/register` | Cadastra um novo usuário (`name`, `email`, `password`) | ❌ |
| `POST` | `/auth/login` | Realiza autenticação e retorna token JWT | ❌ |
| `GET` | `/tasks` | Retorna a lista de tarefas cadastradas | ✅ |
| `POST` | `/tasks` | Cria uma nova tarefa | ✅ |
| `PATCH` | `/tasks/:id` | Atualiza dados/status de uma tarefa existente | ✅ |
| `DELETE` | `/tasks/:id` | Remove uma tarefa pelo ID | ✅ |
| `GET` | `/users/profile` | Obtém informações do perfil logado | ✅ |
| `PUT` | `/users/profile` | Atualiza nome e e-mail do usuário logado | ✅ |

---

## 🚀 Pré-requisitos e Instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior instalada.
- Gerenciador de pacotes `npm` ou `yarn`.
- Backend em execução na porta `3000` (ou na porta configurada nos serviços).

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lucasfukuta/React-FrontEnd.git
   cd React-FrontEnd
   ```

2. **Acesse a pasta do frontend:**
   ```bash
   cd pos-tasks-frontend
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   Abra [http://localhost:5173](http://localhost:5173) para visualizar a aplicação em tempo real.

---

## ⚙️ Scripts Disponíveis

Dentro da pasta `pos-tasks-frontend`, você pode executar:

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com recarregamento rápido (HMR). |
| `npm run build` | Compila e otimiza a aplicação para produção na pasta `dist`. |
| `npm run preview` | Visualiza localmente a build de produção gerada. |
| `npm run lint` | Executa o ESLint para verificação de boas práticas e sintaxe. |

---

## 🎨 Destaques de Design e UI

- **Efeitos de Tensão e Glow:** Botão de ação com contornos elétricos via filtros de distorção vetorial SVG.
- **Navegação Planetária:** Abas estilizadas que representam planetas para filtragem intuitiva por estado da tarefa.
- **Glassmorphism & Neon:** Paleta em tons escuros e azuis espaciais com sombras de brilho neon para manter uma imersão visual contemporânea.
- **Feedback Interativo:** Animações fluidas de foco, hover e transições suaves de estado.

---

## 👤 Autor

Desenvolvido por **[Lucas Fukuta](https://github.com/lucasfukuta)**.
