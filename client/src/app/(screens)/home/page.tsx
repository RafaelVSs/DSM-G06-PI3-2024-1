"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAddTicketModal } from "@/utils/hooks/useAddTicketModal";
import EditTicketModal from "@/components/modals/editTicketModal";
import AddTicketModal from "@/components/modals/addTicketModal";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoTimeOutline } from "react-icons/io5";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/router";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);

  const addTicketModal = {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    console.log("Opening modal...");
    setIsModalOpen(true);
  }

  function openEditModal() {
    console.log("Opening modal...");
    setIsEditModalOpen(true);
  }

  // const router = useRouter();

  useEffect(() => {
    // Atualizar a hora atual a cada segundo
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalID);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-[#4677da] bg-cover bg-center">
      <Header></Header>
      <div className="fixed w-[98%] lg:w-[95%] max-h-[520px] md:max-h-[200px] lg:max-h-[520px] justify-center text-xs lg:text-sm flex rounded-2xl border-2 ">
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
            <TableRow>
              <TableCell className="font-medium">0001</TableCell>
              <TableCell>LABS</TableCell>
              <TableCell>Galileu Galilei</TableCell>
              <TableCell>Software</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Finalizado</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0002</TableCell>
              <TableCell>Resolve</TableCell>
              <TableCell>LV 200</TableCell>
              <TableCell>Hardware</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Pendente</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0003</TableCell>
              <TableCell>EC500</TableCell>
              <TableCell>Luiz Honório</TableCell>
              <TableCell>Rede</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Aberto</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0004</TableCell>
              <TableCell>Resolve+</TableCell>
              <TableCell>Camem Miranda</TableCell>
              <TableCell>Hardware</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Finalizado</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">0001</TableCell>
              <TableCell>LABS</TableCell>
              <TableCell>Galileu Galilei</TableCell>
              <TableCell>Software</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Finalizado</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0002</TableCell>
              <TableCell>Resolve</TableCell>
              <TableCell>LV 200</TableCell>
              <TableCell>Hardware</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Pendente</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0003</TableCell>
              <TableCell>EC500</TableCell>
              <TableCell>Luiz Honório</TableCell>
              <TableCell>Rede</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Aberto</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0004</TableCell>
              <TableCell>Resolve+</TableCell>
              <TableCell>Camem Miranda</TableCell>
              <TableCell>Hardware</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Finalizado</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0001</TableCell>
              <TableCell>LABS</TableCell>
              <TableCell>Galileu Galilei</TableCell>
              <TableCell>Software</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Finalizado</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0002</TableCell>
              <TableCell>Resolve</TableCell>
              <TableCell>LV 200</TableCell>
              <TableCell>Hardware</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Pendente</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0003</TableCell>
              <TableCell>EC500</TableCell>
              <TableCell>Luiz Honório</TableCell>
              <TableCell>Rede</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Aberto</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">0004</TableCell>
              <TableCell>Resolve+</TableCell>
              <TableCell>Camem Miranda</TableCell>
              <TableCell>Hardware</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>01/02/2021</TableCell>
              <TableCell>Finalizado</TableCell>
              <TableCell
                className="flex justify-end cursor-pointer"
                onClick={openEditModal}
              >
                Editar&#160; &#9998;
              </TableCell>
            </TableRow>
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

        <AddTicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <EditTicketModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      </div>
      <Footer></Footer>
    </main>
  );
}
