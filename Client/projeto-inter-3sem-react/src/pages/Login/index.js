import React, { useState } from "react";
import axios from "axios"; // para fazer requisições HTTP
import "./login.css";
import robo from "./logo_RobAt_Bco.png";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, senha });
      // Lógica para redirecionar o usuário após o login bem-sucedido
      console.log(response.data);
    } catch (err) {
      setError("Matrícula ou senha inválida");
    }
  };

  return (
    <div className="App_login">
      <div className="login_content login_card">
        <img className='logo_login' src={robo} alt='logo Robotic' />
        {/* <h1 className='title1' >ACESSO</h1> */}
        <h2 className="title2">Faça login para continuar</h2>
        {error && <p>{error}</p>}
        <form className="form" onSubmit={handleSubmit}>
          {/* <label className='label_login'>Matrícula</label><br/> */}
          <div className="input_container">
            <input
              id="input_login"
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="dropdown">
              <span className="alert-info">&#128712;</span>
              <div class="dropdown-content">
                <p>Inserir seu e-mail</p>
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
          <Link className="button1" to="/tickets">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
