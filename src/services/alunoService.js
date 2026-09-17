import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Método para listar todos os alunos - Get
export async function listarAlunos() {
  const resposta = await api.get("/alunos");
  return resposta.data;
}

// Método para criar um novo aluno - Post
export async function criarAluno(aluno) {
  const resposta = await api.post("/alunos", aluno);
  return resposta.data;
}

// Método para excluir um aluno - Delete
export async function excluirAluno(id) {
  await api.delete("/alunos/" + id);
}
