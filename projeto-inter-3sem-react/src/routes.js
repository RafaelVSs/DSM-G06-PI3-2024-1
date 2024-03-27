import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from './pages/Error'; // Importar componente para página de erro 404
import Login from './pages/Login'; // Importar componente para página de login
import Salas from './pages/Salas'; // Importar componente para página de seleção de salas
import Registro from './pages/Registro'; // Importar componente para página de registro
import TicketPage from './pages/TicketPage'; // Importar componente para página de tickets

import Header from './components/Header'; // Importar componente de cabeçalho

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota para a página de login */}
                <Route path="/" element={<>
                    
                    <Login />
                </>} />
    
                {/* Rota para a página de salas */}
                <Route path="/salas" element={<>
                    <Header />
                    <Salas />
                </>} />
    
                {/* Rota para a página de registro */}
                <Route path="/registro" element={<>
                    <Header />
                    <Registro />
                </>} />
    
                {/* Rota para a página de tickets */}
                <Route path="/tickets" element={<>
                    <Header />
                    <TicketPage />
                </>} />
    
                {/* Rota para a página de erro */}
                <Route path="*" element={<>
                    <Header />
                    <Error />
                </>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
