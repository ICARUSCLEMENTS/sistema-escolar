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
