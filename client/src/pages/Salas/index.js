import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./salas.css"

// Componente para o seletor de blocos
const BlockSelector = ({ blocks, onSelectBlock, selectedBlock }) => {
  return (
    <div>
      <label className='title2Salas' htmlFor="block-select">Selecione o bloco:</label><br />
      <select id="block-select" onChange={(e) => onSelectBlock(e.target.value)} value={selectedBlock}>
        <option value="">Selecione um bloco</option>
        {blocks.map((block, index) => (
          <option key={index} value={block}>
            {block}
          </option>
        ))}
      </select>
    </div>
  );
};

// Componente para o seletor de salas
const RoomSelector = ({ rooms }) => {
  return (
    <div>
      <label className='title2Salas' htmlFor="room-select">Selecione a sala:</label><br />
      <select id="room-select">
        {rooms.map((room, index) => (
          <option key={index} value={room}>
            {room}
          </option>
        ))}
      </select>
    </div>
  );
};

// Componente principal da página
const RoomSelectionPage = () => {
  // Simulando dados de blocos e salas
  const [blocks] = useState(['LABS', 'RESOLVE', 'EC500', 'RESOLVE+']);
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedRooms, setSelectedRooms] = useState([]);

  // Simulação de busca de salas no banco de dados MongoDB
  const fetchRooms = (block) => {
    // Aqui você faria uma chamada ao banco para buscar as salas do bloco selecionado
    // Por enquanto, estou apenas simulando dados
    switch (block) {
      case 'LABS':
        return ['Galileu Galilei', 'RITO LABS', 'Albert Einstein', 'Leonardo da Vinci', 'Linus', 'Nikolas Tesla', 'Alan Turing', 'Thomas Edison', 'Santos Dumont', 'Elon Musk', 'Sala Azul'];
      case 'RESOLVE':
        return ['LV200', 'Disk Luiza', 'RITO RESOLVE', 'Auditório', 'Telão Resolve'];
      case 'EC500':
        return ['Luiz Honório', 'Araucárias', 'Cocais', 'MTG Acionistas', 'Amazônia', 'Mata Atlântica', 'Cerrado', 'Pampas', 'Caatinga', 'Pantanal', 'Mangue', 'RITO - EC500'];
      case 'RESOLVE+':
        return ['Carmen Miranda', 'Cecilia Meirelis', 'Maria Quitéria', 'Lina Bo Bardi', 'Luiza Trajano', 'Tarsila do Almaral', 'Clementina de Jesus', 'Chiquinha Gonzaga', 'Zuzu Angel', 'RITO Resolve+'];
      default:
        return [];
    }
  };

  // Manipulador para selecionar um bloco
  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
    const rooms = fetchRooms(block);
    setSelectedRooms(rooms);
  };

  return (
    <div>
      <h1 className='title1Salas'>Seleção de Sala</h1>
      <BlockSelector blocks={blocks} onSelectBlock={handleBlockSelect} selectedBlock={selectedBlock} />
      <RoomSelector rooms={selectedRooms} />

      <br/>
          {/* <button className='button1' type="submit">Seguir</button> */}
          <Link className='button1salas' to='/registro'>Seguir</Link>
    </div>
  );
};

export default RoomSelectionPage;
