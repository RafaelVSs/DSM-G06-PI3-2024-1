import React, { useState } from "react";
import axios from "axios"; // para fazer requisições HTTP
import "./login.css";
import robo from "./logo_RobAt_Bco.png";

function Login() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { matricula, senha });
      // Lógica para redirecionar o usuário após o login bem-sucedido
      console.log(response.data);
    } catch (err) {
      setError("Matrícula ou senha inválida");
    }
  };

  return (
    <div className="App">
      <img className='logo_login' src={robo} alt='logo Robotic' />
      {/* <h1 className='title1' >ACESSO</h1> */}
      <h2 className="title2">Faça login para continuar</h2>
      {error && <p>{error}</p>}
      <form className="" onSubmit={handleSubmit}>
        {/* <label className='label_login'>Matrícula</label><br/> */}
        <div className="input_container">
          <input
            id="input_login"
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
          <div className="dropdown">
            <span className="alert-info">&#128712;</span>
            <div class="dropdown-content">
              <p>Inserir sua matricula</p>
            </div>
          </div>
        </div>
        <br />
        {/* <label className='label_login'>Senha</label><br/> */}
        <div className="input_container">
          <input
            id="input_password"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="dropdown">
            <span className="alert-info">&#128712;</span>
            <div class="dropdown-content">
              <p>Inserir sua Senha</p>
            </div>
          </div>
        </div>
        <br />
        <button className="button1" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
