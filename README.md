
# Dentefier - Sistema de Gerenciamento de Casos Odontolegais

![Logo Dentefier](logo_dentefier.png)

---

## 🚀 Sobre o Projeto

Dentefier é uma aplicação web desenvolvida no curso TADS035, focada em **Odontologia Forense**. Sua API backend oferece um sistema completo para gerenciamento de casos periciais, evidências e usuários, incluindo autenticação segura via JWT, controle granular de permissões (`admin`, `perito`, `assistente`) e integração com Google Maps para geolocalização.

### Funcionalidades Principais

* Controle de acesso baseado em roles.
* Gerenciamento detalhado de casos e evidências.
* Autenticação JWT com refresh e segurança via cookies.
* Upload e download seguro de arquivos.
* Integração com Google Maps API para geocodificação.
* API RESTful organizada e escalável.

---

## 🛠 Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=nodedotjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&\&logo=typescript\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat\&logo=mongodb\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express\&logoColor=fff\&style=flat)
![JWT](https://img.shields.io/badge/JWT-black?style=plastic\&logo=JSON%20web%20tokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-%E2%9C%94-blueviolet)

### Outros

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat\&logo=github-actions\&logoColor=white)
![VSCode](https://img.shields.io/badge/Vscode-007ACC?style=flatfor-the-badge\&logo=visual-studio-code\&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=flat\&logo=Postman\&logoColor=white)

---

## 📁 Estrutura do Projeto Backend

```
backend/
├── src/
│   ├── config/         # Configurações do banco (db.ts)
│   ├── controllers/    # Lógica dos endpoints
│   │   ├── authController.ts
│   │   ├── casoController.ts
│   │   ├── evidenciaController.ts
│   │   └── userController.ts
│   ├── middlewares/    # Autenticação/autorização (authMiddleware.ts)
│   ├── models/         # Modelos MongoDB (Caso.ts, Evidencia.ts, User.ts)
│   ├── routes/         # Definição de rotas (authRoutes.ts, casoRoutes.ts, etc)
│   └── app.ts          # Configuração principal
├── .env                # Variáveis de ambiente (criar manualmente)
├── tsconfig.json       # Configuração TypeScript
└── package.json        # Dependências e scripts
```

---

## ⚙️ Pré-requisitos para Execução

1. Node.js v18 ou superior
2. MongoDB Atlas configurado
3. Google Maps API Key (opcional)
4. Arquivo `.env` configurado com as variáveis necessárias

---

## 🔧 Configuração Rápida

1. Instale dependências:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz do backend:

```env
# MongoDB
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_CLUSTER=cluster.mongodb.net
DB_NAME=nome_banco

# Autenticação JWT
JWT_SECRET=chave_secreta_aleatoria
JWT_EXPIRATION=2h

# Google Maps (opcional)
GOOGLE_MAPS_API_KEY=sua_chave
```

---

## ▶️ Como Rodar

**Modo desenvolvimento:**

```bash
npm run dev
```

**Modo produção:**

```bash
npm run build
npm start
```

*Servidor disponível em:* `http://localhost:3000`

---

## 🌐 Endpoints Principais

| Recurso        | Endpoint Base              |
| -------------- | -------------------------- |
| Autenticação   | `/api/auth`                |
| Usuários       | `/api/users`               |
| Casos          | `/api/casos`               |
| Evidências     | `/api/evidencias`          |
| Configurações  | `/api/config`              |
| Geocodificação | `/api/geocode?lat=X&lng=Y` |

---

## 🔐 Autenticação & Autorização

| Método | Rota        | Descrição                    |
| ------ | ----------- | ---------------------------- |
| POST   | `/login`    | Login (retorna cookie token) |
| POST   | `/register` | Registro (apenas admin)      |
| POST   | `/logout`   | Invalida token               |
| GET    | `/me`       | Dados do usuário autenticado |

> **JWT** deve ser enviado no header `Authorization: Bearer <token>` para rotas protegidas.

---

## 👥 Gerenciamento de Usuários (`/api/users`)

**Permissões:**

* `admin`: todas operações
* `perito` e `assistente`: apenas leitura

| Método | Rota                  | Descrição                  |
| ------ | --------------------- | -------------------------- |
| POST   | `/`                   | Cria usuário (admin)       |
| GET    | `/`                   | Lista usuários (paginação) |
| GET    | `/me`                 | Dados do usuário atual     |
| GET    | `/:id`                | Busca usuário por ID       |
| PUT    | `/:id`                | Atualiza usuário (admin)   |
| DELETE | `/:id`                | Exclui usuário (admin)     |
| PUT    | `/reset-password/:id` | Reseta senha (admin)       |
| PUT    | `/change-password`    | Altera própria senha       |

---

## 🕵️ Casos Periciais (`/api/casos`)

**Permissões:**

* `admin`/`perito`: criar e editar
* `assistente`: apenas leitura

| Método | Rota   | Descrição                  |
| ------ | ------ | -------------------------- |
| POST   | `/`    | Cria novo caso             |
| GET    | `/`    | Lista todos os casos       |
| GET    | `/:id` | Busca caso + evidências    |
| PUT    | `/:id` | Atualiza caso              |
| DELETE | `/:id` | Exclui caso (apenas admin) |

---

## 🔍 Evidências (`/api/evidencias`)

**Permissões:**

* `admin`/`assistente`: criação
* `admin`: edição e exclusão

| Método | Rota            | Descrição                             |
| ------ | --------------- | ------------------------------------- |
| POST   | `/`             | Cria evidência (upload)               |
| GET    | `/caso/:casoId` | Lista evidências de um caso           |
| GET    | `/:id/arquivo`  | Download arquivo da evidência         |
| GET    | `/`             | Lista todas evidências (sem arquivos) |
| GET    | `/:id`          | Detalhes da evidência (base64)        |
| PUT    | `/:id`          | Atualiza evidência (admin)            |
| DELETE | `/:id`          | Exclui evidência (admin)              |

---

## 🧠 Modelos de Dados (MongoDB)

**User**

```typescript
{
  username: string,
  password: string,
  role: "admin" | "perito" | "assistente",
  email: string,
  phone?: string,
  department?: string
}
```

**Caso**

```typescript
{
  numeroCaso: string,
  titulo: string,
  dataAbertura: Date,
  responsavel: ObjectId,
  status: "Em andamento" | "Finalizado" | "Arquivado",
  contexto: {
    tipoCaso: string,
    origemDemanda: string,
    descricao: string
  }
}
```

**Evidência**

```typescript
{
  caso: ObjectId,
  tipo: string,
  descricao: string,
  arquivo?: {
    data: Buffer,
    contentType: string,
    filename: string
  },
  registradoPor: ObjectId
}
```

---

## 🔒 Middlewares de Segurança

* **authenticateJWT**: valida token JWT
* **authorizeRoles(...roles)**: controla acesso por perfil
* **parseCookies**: processa cookies nas requisições

---

## ⚠️ Tratamento de Erros

* 400: Erros de validação
* 401: Não autorizado
* 403: Proibido
* 404: Não encontrado
* 409: Conflito (duplicados)
* 500: Erro interno (com detalhes em dev)

---

## 🔑 Exemplo de Criação de Usuário via Postman

* **Endpoint:** `POST http://localhost:3000/api/auth/register`
* **Headers:**
  `Authorization: Bearer <SEU_TOKEN_JWT>`
* **Body (JSON):**

```json
{
  "username": "admin",
  "password": "admin123456",
  "role": "admin"
}
```

> **Senha mínima:** 8 caracteres
> **Roles válidas:** `admin`, `perito`, `assistente`

**Resposta esperada:**

```json
{
  "message": "Usuário registrado com sucesso"
}
```

---

## 📈 Futuras Atualizações

* Integração com IA para análise preditiva
* Suporte multilíngue
* Aplicativo móvel complementar

---

## 🤝 Contribuições

Contribuições são muito bem-vindas!
Abra issues e pull requests, seguindo as diretrizes do projeto.

---

## 📄 Licença

MIT License - consulte o arquivo `LICENSE` para mais detalhes.

---

Se quiser, posso ajudar a gerar um arquivo markdown pronto para uso! Quer?
