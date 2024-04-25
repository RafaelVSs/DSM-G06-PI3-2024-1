import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from './pages/Error'; // Importar componente para página de erro 404
import Login from './pages/Login'; // Importar componente para página de login
import Salas from './pages/Salas'; // Importar componente para página de seleção de salas
import Registro from './pages/Registro'; // Importar componente para página de registro
import TicketPage from './pages/TicketPage'; // Importar componente para página de tickets

import Header from './components/Header'; // Importar componente de cabeçalho
import  Footer from './components/Footer'; // Importar Footer

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota para a página de login */}
                <Route path="/" element={<>                  
                    <Login />
                    <Footer />
                </>} />
    
                {/* Rota para a página de salas */}
                <Route path="/salas" element={<>
                    <Header />
                    <Footer />
                    <Salas />
                </>} />
    
                {/* Rota para a página de registro */}
                <Route path="/registro" element={<>
                    <Header />
                    <Footer />
                    <Registro />
                </>} />
    
                {/* Rota para a página de tickets */}
                <Route path="/tickets" element={<>
                    <Header />
                    <Footer />
                    <TicketPage />
                </>} />
    
                {/* Rota para a página de erro */}
                <Route path="*" element={<>
                    <Header />
                    <Footer />
                    <Error />
                </>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
