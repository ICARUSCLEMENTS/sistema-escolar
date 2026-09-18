import { useState } from "react";
import CampoTexto from "./CampoTexto";

function FormularioProfessor(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [data_Admissao, setData_Admissao] = useState("");

  function aoEnviar(e) {
    e.preventDefault();
    const professor = {
      nome: nome,
      email: email,
      cpf: cpf,
      disciplina: disciplina,
      data_Admissao: data_Admissao,
    };
    props.aoSalvar(professor);
    setNome("");
    setEmail("");
    setCpf("");
    setDisciplina("");
    setData_Admissao("");
  }

  return (
    <form className="formulario-aluno" onSubmit={aoEnviar}>
      <CampoTexto rotulo="Nome" valor={nome} aoAlterar={setNome} />
      <CampoTexto rotulo="Email" tipo="email" valor={email} aoAlterar={setEmail} />
      <CampoTexto rotulo="CPF" valor={cpf} aoAlterar={setCpf} />
      <CampoTexto rotulo="Disciplina" valor={disciplina} aoAlterar={setDisciplina} />
      <CampoTexto rotulo="Endereço" valor={data_Admissao} aoAlterar={setData_Admissao} />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormularioProfessor;
