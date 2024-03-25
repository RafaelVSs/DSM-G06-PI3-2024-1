import React, { useState, useEffect } from "react";
import "./ticketpage.css";

// Componente para representar um ticket
const TicketBar = ({ ticket }) => {
  return (
    <div className="ticket-bar">
      <p>ID do Ticket: {ticket.id}</p>
      <p>Setor: {ticket.setor}</p>
      <p>Sala: {ticket.sala}</p>
      <p>Tipo de Problema: {ticket.tipoProblema}</p>

      <div className="dropdown">
        <p className="status">Status: {ticket.status} </p>
        <p>&#160; &#9998; </p>
        <div class="dropdown-content">
          <button className="dropdown-button">Editar</button><br/>
          <button className="dropdown-button">Finalizar</button>
        </div>
      </div>
    </div>
  );
};

// Componente para a página de visualização de tickets
const TicketPage = () => {
  const [tickets, setTickets] = useState([]);

  // Simulação de obtenção de tickets do banco de dados
  useEffect(() => {
    // Aqui você faria uma chamada ao banco para obter os tickets
    // Por enquanto, estou apenas simulando dados
    const fetchedTickets = [
      {
        id: 1,
        setor: "Setor A",
        sala: "Sala 101",
        tipoProblema: "Problema A",
        status: "Aberto",
      },
      {
        id: 2,
        setor: "Setor B",
        sala: "Sala 201",
        tipoProblema: "Problema B",
        status: "Finalizado",
      },
      {
        id: 3,
        setor: "Setor C",
        sala: "Sala 301",
        tipoProblema: "Problema C",
        status: "Aberto",
      },
    ];
    setTickets(fetchedTickets);
  }, []);

  return (
    <div className="ticket-container">
      <h1>Tickets</h1>
      <div className="ticket-list">
        {tickets.map((ticket, index) => (
          <TicketBar key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketPage;
