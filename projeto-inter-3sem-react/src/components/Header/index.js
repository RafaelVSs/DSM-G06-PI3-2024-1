import './header.css'

import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className='container1'>
                <img className='logoHeader' src="##" alt='logo Robotic'/>
                <Link className='roboticHeader' to='/'>Robotic</Link>
            </div>
            <div className='container2'>
                {/* Aqui precisa puxar o nome do funcionário pelo banco e matrícula e cidade(unidade)*/}
                <h3 className='welcomeHeader'>| 18123 | Magalu Franca HB | Bem vindo, Rafael Veríssimo.</h3>
            </div>

            <Link className='exit' to='/'>Sair</Link>
        </header>
    );
}

export default Header;