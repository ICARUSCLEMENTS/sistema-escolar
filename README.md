# Sistema Escolar — Cadastro de Alunos

Cadastro de alunos com listagem, cadastro e exclusão, feito em React + Vite consumindo uma API simulada com json-server.

Projeto da disciplina de Programação para Internet — IFRN Campus Pau dos Ferros.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (você já deve ter, mas confira com `node -v` no terminal).

## Como baixar o projeto

1. Baixe o projeto pelo GitHub: **https://github.com/JefersonQueiroga/sistema-escolar**
   - Pelo navegador: entre no link, clique em **Code > Download ZIP** e extraia a pasta.
   - Ou, se tiver o Git instalado, rode no terminal (PowerShell):
     ```powershell
     git clone https://github.com/JefersonQueiroga/sistema-escolar.git
     ```
2. Abra a pasta do projeto no VS Code (ou no terminal, navegue até ela com `cd`).

## Como instalar as dependências

No terminal, dentro da pasta do projeto, rode:

```powershell
npm install
```

## Como rodar o projeto

Este projeto precisa de **dois terminais abertos ao mesmo tempo** — um para a API simulada e outro para a aplicação React.

**Terminal 1 — API simulada (json-server):**
```powershell
npx json-server --watch db.json --port 3000
```

**Terminal 2 — aplicação React (Vite):**
```powershell
npm run dev
```

Depois, abra no navegador o endereço mostrado no terminal (geralmente `http://localhost:5173`).

> Se aparecer uma mensagem de erro de conexão na tela, confira se o Terminal 1 (json-server) ainda está rodando.

## Screenshot

_Adicione aqui uma captura de tela do projeto em funcionamento._
