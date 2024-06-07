"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditTicketModal from "@/components/modals/editTicketModal";
import AddTicketModal from "@/components/modals/addTicketModal";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoTimeOutline } from "react-icons/io5";
import Footer from "@/components/footer";
import Header from "@/components/header";

interface Ticket {
  _id: string;
  nomeSala: string;
  analista: string;
  solicitante: string;
  descrição: string;
  dataAbertura: string;
  status: string;
  tipoProblema: string;
  dataAtualizacao?: string; // Tornando opcional
}

interface Sala {
  _id: string;
  nome: string;
  localSala: string;
}

interface Categoria {
  _id: string;
  tipoProblema: string;
}

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [salas, setSalas] = useState<{ [key: string]: Sala }>({});
  const [categorias, setCategorias] = useState<{ [key: string]: Categoria }>(
    {}
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  // const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchTickets = async () => {
    try {
      const nomeAnalista = localStorage.getItem("nomeAnalista");

      if (nomeAnalista) {
        const responseAnalistas = await fetch("http://localhost:8080/analista");
        const analistas = await responseAnalistas.json();

        const analista = analistas.find((a: any) => a.nome === nomeAnalista);

        if (analista) {
          const responseTickets = await fetch(
            `http://localhost:8080/ticket?analista=${analista._id}`
          );
          const ticketsData = await responseTickets.json();

          const salaIds = Array.from(
            new Set(ticketsData.map((ticket: Ticket) => ticket.nomeSala))
          );
          const categoriaIds = Array.from(
            new Set(ticketsData.map((ticket: Ticket) => ticket.tipoProblema))
          );

          const responseSalas = await fetch("http://localhost:8080/sala");
          const allSalas: Sala[] = await responseSalas.json();
          const salasMap = allSalas.reduce((acc, sala) => {
            acc[sala._id] = sala;
            return acc;
          }, {} as { [key: string]: Sala });

          const responseCategorias = await fetch(
            "http://localhost:8080/categoria"
          );
          const allCategorias: Categoria[] = await responseCategorias.json();
          const categoriasMap = allCategorias.reduce((acc, categoria) => {
            acc[categoria._id] = categoria;
            return acc;
          }, {} as { [key: string]: Categoria });

          setSalas(salasMap);
          setCategorias(categoriasMap);
          setTickets(ticketsData);
        }
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      fetchTickets();
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setIsEditModalOpen(true);
  };
  // const openEditModal = () => {
  //   setIsEditModalOpen(true);
  // };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-[#4677da] bg-cover bg-center">
      <Header />
      <div className="fixed w-[98%] lg:w-[95%] max-h-[520px] md:max-h-[200px] lg:max-h-[520px] justify-center text-xs lg:text-sm flex rounded-2xl border-2">
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead className="w-[100px]">Ticket ID</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Sala</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Abertura</TableHead>
              <TableHead>Atualizado em</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right text-xl">
                &#160; &#9998;
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => {
              const sala = salas[ticket.nomeSala];
              const categoria = categorias[ticket.tipoProblema];
              return (
                <TableRow key={ticket._id}>
                  <TableCell className="font-medium">{ticket._id}</TableCell>
                  <TableCell>{sala?.localSala}</TableCell>
                  <TableCell>{sala?.nome}</TableCell>
                  <TableCell>{categoria?.tipoProblema}</TableCell>
                  <TableCell>
                    {new Date(ticket.dataAbertura).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {ticket.dataAtualizacao
                      ? new Date(ticket.dataAtualizacao).toLocaleDateString()
                      : "--/--/----"}
                  </TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell
                    className="flex justify-end cursor-pointer"
                    onClick={() => openEditModal(ticket._id)} // Passa o ID do ticket aqui
                  >
                    Editar&#160; &#9998;
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex fixed bottom-6 right-44 md:right-40 lg:right-12 items-center w-1/6">
        <p className="flex gap-1 items-center text-xs text-white mr-2 flex-shrink-0">
          <IoTimeOutline /> {currentTime.toLocaleString()}
        </p>
        <Button
          className="w-[150%] md:w-full lg:w-1/2 h-10 bg-[#3e8721] hover:bg-[#29581f] text-white shadow-md rounded-xl hover:shadow-xl"
          type="submit"
          variant="default"
          size="default"
          onClick={openModal}
        >
          Novo Ticket
        </Button>

        <AddTicketModal isOpen={isModalOpen} onClose={closeModal} />
        <EditTicketModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          ticketId={selectedTicketId ? selectedTicketId : ""}
        />
      </div>
      <Footer />
    </main>
  );
}
