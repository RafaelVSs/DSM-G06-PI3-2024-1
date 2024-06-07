"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { IoTimeOutline } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import Modal from "./index";
import React from "react";
import axios from "axios";

type EditTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
};

type Sala = {
  _id: string;
  nome: string;
  localSala: string;
  __v: number;
};

type Categoria = {
  _id: string;
  tipoProblema: string;
  __v: number;
};

type Analista = {
  _id: string;
  nome: string;
  __v: number;
};

type FormData = {
  solicitante: string;
  nomeSala: string;
  tipoProblema: string;
  descrição: string;
  dataAbertura: string;
  status: string;
  analista: string;
  dataAtualizacao?: string;
};

const EditTicketModal: React.FC<EditTicketModalProps> = ({ isOpen, onClose, ticketId }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [salas, setSalas] = useState<Sala[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [analistas, setAnalistas] = useState<Analista[]>([]);
  const { register, handleSubmit, setValue, reset } = useForm<FormData>();

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:8080/sala")
        .then((response) => response.json())
        .then((data: Sala[]) => setSalas(data))
        .catch((error) => console.error("Error fetching salas:", error));

      fetch("http://localhost:8080/categoria")
        .then((response) => response.json())
        .then((data: Categoria[]) => setCategorias(data))
        .catch((error) => console.error("Error fetching categorias:", error));

      fetch("http://localhost:8080/analista")
        .then((response) => response.json())
        .then((data: Analista[]) => setAnalistas(data))
        .catch((error) => console.error("Error fetching analistas:", error));

      // Fetch the ticket data when the modal opens
      axios.get(`http://localhost:8080/ticket/${ticketId}`)
        .then((response) => {
          const ticketData = response.data;
          setValue("solicitante", ticketData.solicitante);
          setValue("descrição", ticketData.descrição);
          setValue("status", ticketData.status);
          setValue("nomeSala", ticketData.nomeSala);
          setValue("tipoProblema", ticketData.tipoProblema);

          // Find and set the analista name from the ticket data
          const analistaId = ticketData.analista;
          const analistaName = analistas.find((a) => a._id === analistaId)?.nome || "";
          setValue("analista", analistaName);
        })
        .catch((error) => console.error("Error fetching ticket data:", error));
    }
  }, [isOpen, ticketId, setValue, analistas]); // Add analistas as a dependency

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, [isOpen]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.status === "Fechado") {
      data.dataAtualizacao = new Date().toISOString();
    } else {
      delete data.dataAtualizacao;
    }

    // Find the analista by name
    const analista = analistas.find((analista) => analista.nome === data.analista);
    if (analista) {
      data.analista = analista._id;
    } else {
      data.analista = "";
    }

    try {
      const response = await axios.put(`http://localhost:8080/ticket/${ticketId}`, data);
      console.log("Form data updated successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating form data:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSalaChange = (value: string) => {
    const sala = salas.find((sala) => sala.nome === value);
    if (sala) {
      setValue("nomeSala", sala._id);
    }
  };

  const handleTipoProblemaChange = (value: string) => {
    const categoria = categorias.find((categoria) => categoria.tipoProblema === value);
    if (categoria) {
      setValue("tipoProblema", categoria._id);
    }
  };

  const handleStatusChange = (value: string) => {
    setValue("status", value);
  };

  return (
    <>
      <Modal
        zIndex={100}
        isOpen={isOpen}
        onClose={handleClose}
        positionClose="left"
        header={
          <div className="flex flex-col">
            <div className="justify-start">
              <h1 className="text-2xl px-3 py-2 text-[#002f3f]">
                Editar Ticket
              </h1>
            </div>
          </div>
        }
        body={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mx-1 px-2 py-1 rounded-xl justify-between gap-4">
                <div className="flex w-[90%] flex-col">
                  <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-0.5">
                    Sala
                  </label>
                  <div className="w-full h-12 m-0">
                    <Select onValueChange={handleSalaChange}>
                      <SelectTrigger className="w-full text-xs">
                        <SelectValue placeholder="Sala" />
                      </SelectTrigger>
                      <SelectContent>
                        {salas.map((sala) => (
                          <SelectItem key={sala._id} value={sala.nome}>
                            {sala.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col w-[90%]">
                  <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-0.5">
                    Analista
                  </label>
                  <div className="w-full h-12 m-0">
                    <Input
                      placeholder={"Analista"}
                      type={"text"}
                      id={"analista"}
                      className="text-x rounded-2xl"
                      {...register("analista")}
                      onChange={(e) => setValue("analista", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-0.5">
                  Tipo de Chamado
                </label>
                <div className="w-[100%] h-12 m-auto">
                  <Select onValueChange={handleTipoProblemaChange}>
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue placeholder="Tipo de problema" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria._id} value={categoria.tipoProblema}>
                          {categoria.tipoProblema}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-1">
                  Solicitante
                </label>
                <div className="w-[100%] h-12 m-auto">
                  <Input
                    placeholder="Solicitante"
                    type="text"
                    id="solicitante"
                    className="w-full text-xs rounded-2xl"
                    {...register("solicitante")}
                  />
                </div>
              </div>

              <div className="flex flex-col mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-1">
                  Descrição
                </label>
                <div className="w-[100%] h-12 m-auto">
                  <textarea
                    id="descrição"
                    placeholder="Descrição..."
                    className="w-full max-h-[70px] min-h-[70px] text-xs p-2 rounded-2xl border-2 border-slate-200 focus:ring-1 focus:ring-[#15803c] focus:ring-offset-1 focus:outline-none"
                    {...register("descrição")}
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col mx-1 px-2 py-1 rounded-xl mt-5 mb-2">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-1">
                  Status
                </label>
                <div className="grid-cols-3 justify-between">
                  <RadioGroup
                    className="flex justify-center gap-2 md:gap-20 w-full"
                    onValueChange={handleStatusChange}
                    defaultValue={undefined}
                  >
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <RadioGroupItem
                        value="Aberto"
                        id="Aberto"
                        className="text-green-700"
                      />
                      <Label htmlFor="Aberto" className="text-xs">
                        Aberto
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <RadioGroupItem
                        value="Pendente"
                        id="Pendente"
                        className="text-orange-400"
                      />
                      <Label htmlFor="Pendente" className="text-xs">
                        Pendente
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <RadioGroupItem
                        value="Fechado"
                        id="Fechado"
                        className="text-red-500"
                      />
                      <Label htmlFor="Fechado" className="text-xs">
                        Fechado
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="w-full flex my-1 mx-1 px-2 py-1 justify-end items-baseline">
                <p className="flex gap-1 items-center text-xs text-black mr-2">
                  <IoTimeOutline /> {currentTime.toLocaleString()}
                </p>
                <Button
                  className="w-1/4 h-10 bg-[#3e8721] hover:bg-[#29581f] text-white shadow-md rounded-xl hover:shadow-xl"
                  type="submit"
                  variant="default"
                  size="default"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  Editar
                </Button>
              </div>
            </form>
          </>
        }
        footer={<></>}
      />
    </>
  );
};

export default EditTicketModal;
