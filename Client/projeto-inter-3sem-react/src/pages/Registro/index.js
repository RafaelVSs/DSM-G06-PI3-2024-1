import React, { useState, useEffect } from "react";
import "./registro.css";
import { Link } from "react-router-dom";

// Componente para a página de registro
const RegistrationPage = ({ selectedBlock, selectedRoom }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState("");
  const [description, setDescription] = useState("");

  // Atualizar data e hora em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Manipulador para enviar os dados registrados
  const handleSubmit = () => {
    // Aqui você enviaria os dados para o banco de dados MongoDB
    // Os dados a serem enviados seriam: selectedBlock, selectedRoom, dateTime, selectedValue e description
    console.log("Dados registrados:", {
      selectedBlock,
      selectedRoom,
      dateTime,
      selectedValue,
      description,
    });

    // Limpar campos após o envio
    setSelectedValue("");
    setDescription("");
  };

  return (
    <div>
      <h2 className="title1Registro">{`Setor: ${selectedBlock}, Sala: ${selectedRoom}`}</h2>

      <label className="title2Registro">Solicitante: </label>
      <input className="select-value" type="text" placeholder="Solicitante" />
      <br />

      <label className="title2Registro" htmlFor="select-value">
        Tipo do problema:{" "}
      </label>
      <select
        className="select-value"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <option value="">Selecione...</option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
      </select>
      <br />
      <label className="title3Registro" htmlFor="description">
        Descrição do problema:
      </label>
      <br />
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      <div className="setor_aberturaNovo">
        <p className="data_hora2">{dateTime.toLocaleString()}</p>

        <div className="dropdownUP">
          <Link className="button2" onClick={handleSubmit} to="/salas">
            Registrar
          </Link>
          <div class="dropdownUP-content">
            <Link className="dropdownUP-button" to="/tickets">
              Aberto
            </Link>
            <br />
            <Link className="dropdownUP-button" to="/tickets">
              Pendente
            </Link>
            <br />
            <Link className="dropdownUP-button" to="/tickets">
              Finalizado
            </Link>
          </div>
        </div>
      </div>
      {/* <button onClick={handleSubmit}>Enviar</button> */}
      {/* <Link className='button1' onClick={handleSubmit} to='/'>Registrar Ticket</Link> */}
    </div>
  );
};

export default RegistrationPage;
