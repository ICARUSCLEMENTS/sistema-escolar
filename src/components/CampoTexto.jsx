function CampoTexto(props) {
  
  function aoDigitar(evento) {
    const valorDigitado = evento.target.value;
    props.aoAlterar(valorDigitado);
  }

  return (
    <div className="campo-texto">
      <label>{props.rotulo}</label>
      <input type={props.tipo || "text"} value={props.valor} onChange={aoDigitar} />
    </div>
  );
}

export default CampoTexto;
