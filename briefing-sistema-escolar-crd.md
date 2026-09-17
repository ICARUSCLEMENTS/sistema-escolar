# Briefing — Projeto "Sistema Escolar" (Cadastro de Alunos)
Disciplina: Programação para Internet — IFRN Campus Pau dos Ferros
Curso: Técnico Integrado em Informática (3º ano)
Front-end: React + Vite (JavaScript, sem TypeScript)
API simulada: json-server

**Escopo desta aula: listar, cadastrar e excluir alunos (GET, POST, DELETE). A edição (PUT) fica para a aula seguinte.**

---

## 1. Contexto da disciplina (para o Claude Code entender o nível da turma)

Os alunos são do Técnico Integrado em Informática, já têm base em Python e vêm construindo conhecimento de React ao longo do bimestre. Até este ponto já foram vistos:

- Componentes, props, `useState`, eventos, renderização condicional
- `.map()` com `key` (nunca usar índice do array como key)
- `useEffect` + consumo de API com `fetch`
- React Router: `BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`
- **`async/await` com `try/catch` já foi introduzido** — a partir de agora pode ser usado livremente (não é mais necessário `.then()/.catch()/.finally()`)

Este projeto é o próximo passo natural: introduzir **formulários controlados** e **Axios** (substituindo o `fetch`), organizados com uma camada de serviço dedicada.

## 2. Objetivo pedagógico

Construir um cadastro de alunos "do jeito mais simples possível" — sem over-engineering, sem bibliotecas de UI, sem TypeScript. O foco é o aluno entender:

1. Como isolar o consumo de API em um arquivo de serviço (`service`)
2. Como um formulário controlado funciona em React
3. Como fazer as operações de listar, cadastrar e excluir com Axios
4. Como componentizar uma tela (cards, inputs, listas, mensagens)
5. Como lidar com erro de conexão (a API simulada não iniciada)

### Por que sem edição nesta aula
A aula já introduz dois conceitos novos simultâneos (formulário controlado + Axios com service). A edição exigiria um formulário com papel duplo, um `useEffect` de sincronização por prop, um estado de "modo de tela" e um botão condicional — dificuldades que não ensinam nem formulário nem Axios. O escopo reduzido mantém o `FormularioAluno` com apenas cinco `useState` e um `onSubmit`, simples de explicar no quadro. A edição entra na aula seguinte, como página própria (`/alunos/:id/editar`) usando React Router + `useParams`, que a turma já conhece.

## 3. Regras de código já estabelecidas na disciplina (seguir à risca)

- **Sem desestruturação de props** na assinatura da função — sempre `props.nome`, nunca `function Card({ nome })`
- **Sem optional chaining (`?.`)**
- **Sem TypeScript, sem bibliotecas de UI (Material UI, Bootstrap, etc.), sem bibliotecas de estilização externas** — CSS puro
- **Nunca usar índice do array como `key`** — usar `aluno.id`
- **Nomes de variáveis, funções e props em português** — nomes de campos vindos da API ficam conforme o modelo de dados (ex: `data_nascimento`)
- **Código o mais simples possível**, com poucos comentários
- `async/await` com `try/catch` **pode** ser usado (já foi introduzido)

### Sobre `useState` fora do `App.jsx`
Até agora a convenção da turma era manter todo `useState` centralizado no `App.jsx`. Este projeto introduz a primeira exceção pedagógica: o `FormularioAluno` mantém o estado dos seus próprios campos controlados (é o jeito natural de ensinar formulário). O estado da **lista de alunos** e do **erro de conexão** continua centralizado no `App.jsx` e é repassado via props.

## 4. Modelo de dados

Entidade `aluno`, com os campos:

| Campo | Tipo (input) | Observação |
|---|---|---|
| `nome` | text | |
| `email` | email | |
| `cpf` | text | sem máscara/validação — string livre, manter simples |
| `data_nascimento` | date | formato `AAAA-MM-DD` |
| `endereco` | text | campo único de texto livre (não separar em rua/bairro/cidade) |

`db.json` para o json-server:

```json
{
  "alunos": [
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cpf": "123.456.789-00",
      "data_nascimento": "2007-05-14",
      "endereco": "Rua das Flores, 123 - Pau dos Ferros/RN"
    }
  ]
}
```

API simulada em `http://localhost:3000`, rodando com:
```
npx json-server --watch db.json --port 3000
```

## 5. Estrutura de pastas

```
sistema-escolar/
├── db.json
├── src/
│   ├── components/
│   │   ├── CampoTexto.jsx
│   │   ├── CardAluno.jsx
│   │   ├── ListaAlunos.jsx
│   │   ├── FormularioAluno.jsx
│   │   └── MensagemErro.jsx
│   ├── services/
│   │   └── alunoService.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
```

## 6. Componentes (5 componentes)

**`CampoTexto.jsx`** — input reutilizável com rótulo
```jsx
function CampoTexto(props) {
  return (
    <div className="campo-texto">
      <label>{props.rotulo}</label>
      <input
        type={props.tipo || "text"}
        value={props.valor}
        onChange={function (e) { props.aoAlterar(e.target.value); }}
      />
    </div>
  );
}

export default CampoTexto;
```

**`CardAluno.jsx`** — exibe um aluno com botão de excluir
```jsx
function CardAluno(props) {
  return (
    <div className="card-aluno">
      <h3>{props.aluno.nome}</h3>
      <p>{props.aluno.email}</p>
      <p>CPF: {props.aluno.cpf}</p>
      <p>Nascimento: {props.aluno.data_nascimento}</p>
      <p>{props.aluno.endereco}</p>
      <button onClick={function () { props.aoExcluir(props.aluno.id); }}>Excluir</button>
    </div>
  );
}

export default CardAluno;
```

**`ListaAlunos.jsx`** — renderiza os cards
```jsx
import CardAluno from "./CardAluno";

function ListaAlunos(props) {
  return (
    <div className="lista-alunos">
      {props.alunos.map(function (aluno) {
        return (
          <CardAluno
            key={aluno.id}
            aluno={aluno}
            aoExcluir={props.aoExcluir}
          />
        );
      })}
    </div>
  );
}

export default ListaAlunos;
```

**`FormularioAluno.jsx`** — formulário controlado de cadastro
```jsx
import { useState } from "react";
import CampoTexto from "./CampoTexto";

function FormularioAluno(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");

  function aoEnviar(e) {
    e.preventDefault();
    const aluno = {
      nome: nome,
      email: email,
      cpf: cpf,
      data_nascimento: dataNascimento,
      endereco: endereco,
    };
    props.aoSalvar(aluno);
    setNome("");
    setEmail("");
    setCpf("");
    setDataNascimento("");
    setEndereco("");
  }

  return (
    <form className="formulario-aluno" onSubmit={aoEnviar}>
      <CampoTexto rotulo="Nome" valor={nome} aoAlterar={setNome} />
      <CampoTexto rotulo="Email" tipo="email" valor={email} aoAlterar={setEmail} />
      <CampoTexto rotulo="CPF" valor={cpf} aoAlterar={setCpf} />
      <CampoTexto rotulo="Data de nascimento" tipo="date" valor={dataNascimento} aoAlterar={setDataNascimento} />
      <CampoTexto rotulo="Endereço" valor={endereco} aoAlterar={setEndereco} />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormularioAluno;
```

**`MensagemErro.jsx`** — banner de erro (usado quando o json-server não está no ar)
```jsx
function MensagemErro(props) {
  if (!props.mensagem) {
    return null;
  }
  return (
    <div className="mensagem-erro">
      <p>{props.mensagem}</p>
    </div>
  );
}

export default MensagemErro;
```

## 7. Camada de serviço — `alunoService.js`

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function listarAlunos() {
  const resposta = await api.get("/alunos");
  return resposta.data;
}

export async function criarAluno(aluno) {
  const resposta = await api.post("/alunos", aluno);
  return resposta.data;
}

export async function excluirAluno(id) {
  await api.delete("/alunos/" + id);
}
```

## 8. `App.jsx` — orquestração

```jsx
import { useState, useEffect } from "react";
import ListaAlunos from "./components/ListaAlunos";
import FormularioAluno from "./components/FormularioAluno";
import MensagemErro from "./components/MensagemErro";
import { listarAlunos, criarAluno, excluirAluno } from "./services/alunoService";

const mensagemConexao = "Não foi possível conectar à API. Você esqueceu de iniciar o json-server? Rode: npx json-server --watch db.json --port 3000";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(function () {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    try {
      const dados = await listarAlunos();
      setAlunos(dados);
      setErro("");
    } catch (e) {
      setErro(mensagemConexao);
    }
  }

  async function aoSalvar(aluno) {
    try {
      await criarAluno(aluno);
      carregarAlunos();
    } catch (e) {
      setErro(mensagemConexao);
    }
  }

  async function aoExcluir(id) {
    try {
      await excluirAluno(id);
      carregarAlunos();
    } catch (e) {
      setErro(mensagemConexao);
    }
  }

  return (
    <div className="App">
      <header className="cabecalho-ifrn">
        <h1>Sistema Escolar — Cadastro de Alunos</h1>
      </header>
      <MensagemErro mensagem={erro} />
      <FormularioAluno aoSalvar={aoSalvar} />
      <ListaAlunos alunos={alunos} aoExcluir={aoExcluir} />
    </div>
  );
}

export default App;
```

## 9. Identidade visual (padrão institucional IFRN)

- Verde institucional como cor primária (tom aproximado `#2E7D32`, com o verde do logo `#68B92E` como destaque em botões/links)
- Fundo claro (branco ou cinza bem claro) — a sala tem bastante iluminação, então tema claro é obrigatório, nunca fundo escuro
- Logo do IFRN no cabeçalho (o professor fornece o arquivo `IFRN.png`)
- Mensagem de erro em caixa **apenas com borda** (sem preenchimento colorido), na cor de alerta `#C62828` — mesmo padrão usado nos materiais em PDF da disciplina
- CSS puro, em `App.css`, entregue já pronto e completo — para a aula não gastar tempo com estilização

## 10. Tratamento do erro "json-server não iniciado"

Qualquer chamada do `alunoService.js` que falhar por erro de rede (json-server desligado) deve cair no `catch` e disparar a mesma mensagem fixa, exibida pelo `MensagemErro`:

> "Não foi possível conectar à API. Você esqueceu de iniciar o json-server? Rode: npx json-server --watch db.json --port 3000"

## 11. Ambiente de execução

Este projeto **não roda inteiramente no StackBlitz** (ambiente padrão da turma) porque exige dois processos simultâneos:

1. `npx json-server --watch db.json --port 3000` (API simulada)
2. `npm run dev` (Vite)

Recomenda-se rodar em ambiente local (VS Code), com dois terminais abertos — destacar isso explicitamente para os alunos antes de começarem.

## 12. Divisão em etapas (padrão etapa-N da disciplina)

- **Etapa 1 — Listagem**: `alunoService.listarAlunos`, `ListaAlunos`, `CardAluno` (sem botão excluir), `MensagemErro`
- **Etapa 2 — Cadastro**: adicionar `CampoTexto`, `FormularioAluno` e `criarAluno`
- **Etapa 3 — Exclusão**: adicionar o botão excluir no `CardAluno` e `excluirAluno`

Cada etapa é uma pasta Vite independente, com o CSS idêntico entre todas as etapas.

## 13. Entrega (padrão já usado na disciplina)

Repositório público no GitHub, com screenshot no README, link postado na Google Sala de Aula. Anexar projeto/zip direto não gera nota.

## 14. Próxima aula (fora do escopo deste projeto)

Edição de aluno (`PUT`) como **página própria** em `/alunos/:id/editar`, usando React Router + `useParams`: o card ganha um `Link` de editar, a página busca o aluno por id (`GET /alunos/:id`), preenche o formulário e envia o `PUT`. Isso amarra Axios com React Router e dá uma aula com propósito próprio.
