import React, { useState } from 'react';
import axios from 'axios'; // para fazer requisições HTTP
import './App.css'

function App() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { matricula, senha });
      // Lógica para redirecionar o usuário após o login bem-sucedido
      console.log(response.data);
    } catch (err) {
      setError('Matrícula ou senha inválida');
    }
  };

  return (
    <div className="App">
      <img id='logo_login' src="/logo_RobAt_Bco.png" alt="Logo do App" />
      {/* <h1 className='title1' >ACESSO</h1> */}
      <h2 className='title2' >Faça login para continuar</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* <label className='label_login'>Matrícula</label><br/> */}
        <input id='input_login'
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        /><br/>
        {/* <label className='label_login'>Senha</label><br/> */}
        <input id = 'input_password'
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        /><br/>
        <button className='button1' type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;

