import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Error from './pages/Error'; // importar função da página de erro404
import Login from './pages/Login'; // importar pagina Login
import Salas from './pages/Salas'; // importar pagina de seleção de salas
import Registro from './pages/Registro';
import TicketPage from './pages/TicketPage';

import Header from './components/Header';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='*' element= {<Error />}/>
                <Route path='/' element= {<Login />}/> 
                <Route path='/salas' element= {<Salas />}/>      
                <Route path='registro' element= {<Registro />}/>      
                <Route path='/tickets' element= {<TicketPage />}/>       
       
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;