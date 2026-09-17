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
