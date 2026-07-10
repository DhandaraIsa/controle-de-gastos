# 💰 Sistema de Controle de Gastos Residenciais

## 📋 Descrição

Este projeto consiste em um sistema web para controle de gastos residenciais, desenvolvido como parte de um desafio técnico.

A aplicação permite cadastrar pessoas, registrar receitas e despesas, consultar os totais individuais e o saldo geral, seguindo todas as regras de negócio propostas.

O sistema foi desenvolvido utilizando arquitetura cliente-servidor, com:

- **Back-end:** ASP.NET Core Web API (.NET 8 + C#)
- **Front-end:** React + TypeScript
- **Banco de dados:** SQLite
- **Persistência:** Entity Framework Core

---

# Tecnologias Utilizadas

## Back-end

- .NET 8
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQLite
- Swagger

## Front-end

- React
- TypeScript
- Vite
- React Router
- Fetch API

---

# Estrutura do Projeto

```
controle-de-gastos
│
├── backend
│   └── ControleGastos.Api
│       ├── Controllers
│       ├── Data
│       ├── DTOs
│       ├── Enums
│       ├── Migrations
│       ├── Models
│       ├── Services
│       ├── Program.cs
│       └── appsettings.json
│
├── frontend
│   └── controle-gastos-web
│       ├── src
│       │   ├── components
│       │   ├── pages
│       │   ├── routes
│       │   ├── services
│       │   ├── types
│       │   ├── App.tsx
│       │   ├── App.css
│       │   ├── index.css
│       │   └── main.tsx
│
└── README.md
```

---

# Funcionalidades Implementadas

## Cadastro de Pessoas

Permite:

- Cadastrar pessoas;
- Listar pessoas;
- Excluir pessoas.

Cada pessoa possui:

- Id (gerado automaticamente)
- Nome
- Idade

### Regra

Ao excluir uma pessoa, todas as suas transações também são excluídas automaticamente (Cascade Delete).

---

## Cadastro de Transações

Permite:

- Cadastro de receitas;
- Cadastro de despesas;
- Listagem das transações.

Cada transação possui:

- Id
- Descrição
- Valor
- Tipo
- Pessoa

### Regras de negócio

- A pessoa deve existir no cadastro.
- O valor deve ser maior que zero.
- Menores de 18 anos podem cadastrar apenas despesas.

---

## Consulta de Totais

A aplicação calcula automaticamente:

Para cada pessoa:

- Total de receitas
- Total de despesas
- Saldo

Além disso apresenta:

- Total geral de receitas
- Total geral de despesas
- Saldo líquido geral

---

# Banco de Dados

Foi utilizado SQLite.

O banco é criado automaticamente pelo Entity Framework através das Migrations.

Arquivo criado:

```
controle-gastos.db
```

Persistindo todos os dados mesmo após o encerramento da aplicação.

---

# Entity Framework

Foi utilizado:

- DbContext
- Migrations
- SQLite Provider

Relacionamento implementado:

```
Pessoa
    │
    │ 1
    │
    ├────────────── N
                  Transações
```

Com exclusão em cascata.

---

# API REST

## Pessoas

| Método | Endpoint |
|---------|----------|
| GET | /api/pessoas |
| POST | /api/pessoas |
| DELETE | /api/pessoas/{id} |

---

## Transações

| Método | Endpoint |
|---------|----------|
| GET | /api/transacoes |
| POST | /api/transacoes |

---

## Totais

| Método | Endpoint |
|---------|----------|
| GET | /api/totais |

---

# Front-end

Foi desenvolvido utilizando React.

A interface contém:

- Dashboard
- Cadastro de Pessoas
- Cadastro de Transações
- Consulta de Totais

Utilizando React Router para navegação entre páginas.

---

# Regras de Negócio Implementadas

✔ Cadastro de Pessoas

✔ Exclusão em Cascata

✔ Cadastro de Receitas

✔ Cadastro de Despesas

✔ Restrição para menores de idade

✔ Consulta de Totais

✔ Persistência no SQLite

✔ API REST

---

# Documentação do Código

Todo o projeto foi desenvolvido utilizando:

- Comentários explicativos;
- Separação por camadas;
- DTOs;
- Models;
- Services;
- Controllers;
- Organização por responsabilidade.

---

# Como executar

## Backend

Entrar na pasta

```
backend/ControleGastos.Api
```

Executar:

```bash
dotnet restore
dotnet ef database update
dotnet run
```

Swagger:

```
http://localhost:5000/swagger
```

---

## Frontend

Entrar na pasta

```
frontend/controle-gastos-web
```

Executar:

```bash
npm install
npm run dev
```

Abrir:

```
http://localhost:5173
```

---

# Arquitetura

```
React
    │
    │ HTTP
    ▼
ASP.NET Core Web API
    │
Entity Framework Core
    │
SQLite
```

---

# Melhorias Futuras

- Edição de pessoas
- Exclusão de transações
- Autenticação de usuários
- Dashboard com gráficos
- Responsividade completa
- Tema Dark Mode
- Testes Unitários
- Docker

---

# Autor

Desenvolvido por **Dhandara Isabela** como solução para o desafio técnico de desenvolvimento Full Stack utilizando ASP.NET Core, React e SQLite.