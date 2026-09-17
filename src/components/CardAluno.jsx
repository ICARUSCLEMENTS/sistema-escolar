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
