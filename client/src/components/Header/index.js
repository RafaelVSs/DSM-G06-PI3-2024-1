import "./header.css";

import { Link } from "react-router-dom";
import robozinho from "./robozinho.png";

function Header() {
  return (
    <header>
      <div className="container1">
        <img className="logoHeader" src={robozinho} alt="logo Robotic" />
        <Link className="roboticHeader" to="/tickets">
          Robotic
        </Link>
      </div>
      <div className="container2">
        {/* Aqui precisa puxar o nome do funcionário pelo banco e matrícula e cidade(unidade)*/}
        <h3 className="welcomeHeader">
          Magalu Franca HB | Bem vindo, Rafael Veríssimo.
        </h3>
      </div>

      <Link className="exit" to="/">
        Sair
      </Link>
    </header>
  );
}

export default Header;
