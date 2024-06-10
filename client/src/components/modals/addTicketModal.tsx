"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoTimeOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { toast, Bounce } from "react-toastify";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Modal from "./index";
import React from "react";
import axios from "axios";

type AddTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
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

type FormData = {
  solicitante: string;
  nomeSala: string;
  tipoProblema: string;
  descrição: string;
  dataAbertura: string;
  status: string;
  analista: string;
  dataAtualizacao?: string; // Torna opcional, só será enviado se o status for "Fechado"
};

const AddTicketModal: React.FC<AddTicketModalProps> = ({ isOpen, onClose }) => {
  // VARIÁVEIS
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [analistas, setAnalistas] = useState<any[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      solicitante: "",
      nomeSala: "",
      tipoProblema: "",
      descrição: "",
      dataAbertura: "",
      status: "",
      analista: "",
    },
  });

  // FUNÇÕES
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    data.dataAbertura = new Date().toISOString();

    // Encontra o analista correspondente pelo nome e obtém o ID
    const analista = analistas.find(
      (analista) => analista.nome === data.analista
    );

    if (analista) {
      data.analista = analista._id; // Converte o nome do analista para o ID
    } else {
      data.analista = "";
    }

    if (data.status === "Fechado") {
      data.dataAtualizacao = new Date().toISOString();
    } else {
      delete data.dataAtualizacao;
    }

    try {
      const response = await axios.post("http://localhost:8080/ticket", data);
      console.log("Form data submitted successfully:", response.data);

      // Após enviar o ticket, restaura o nome do analista no formulário
      const nomeAnalista = analista ? analista.nome : "";

      // Reseta o formulário e restaura o nome do analista
      reset({
        solicitante: "",
        nomeSala: "",
        tipoProblema: "",
        descrição: "",
        dataAbertura: "",
        status: "",
        analista: nomeAnalista, // Restaurar o nome do analista após o reset
      });

      onClose();

      toast.success('Ticket cadastrado com sucesso!', {
        position: "bottom-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });

    } catch (error) {
      toast.error('Erro ao cadastrar Ticket!', {
        position: "bottom-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      console.error("Error submitting form data:", error);
    }
    //console de teste
    console.log("ticket: ", data);
  };

  const handleClose = () => {
    // Mantém o campo analista
    const nomeAnalista = watch("analista");

    // Reseta o formulário e define o campo analista novamente
    reset({
      solicitante: "",
      nomeSala: "",
      tipoProblema: "",
      descrição: "",
      dataAbertura: "",
      status: "",
      analista: nomeAnalista, // Restaurar o nome do analista após o reset
    });

    onClose();
  };

  const handleSalaChange = (value: string) => {
    const sala = salas.find((sala) => sala.nome === value);
    if (sala) {
      setValue("nomeSala", sala._id);
    }
  };

  const handleTipoProblemaChange = (value: string) => {
    const categoria = categorias.find(
      (categoria) => categoria.tipoProblema === value
    );
    if (categoria) {
      setValue("tipoProblema", categoria._id);
    }
  };

  const handleStatusChange = (value: string) => {
    setValue("status", value);
  };

  // USEEFFECT
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
        .then((data: any[]) => setAnalistas(data))
        .catch((error) => console.error("Error fetching analistas:", error));
    }
  }, [isOpen]);

  useEffect(() => {
    const storedNomeAnalista = localStorage.getItem("nomeAnalista");
    if (storedNomeAnalista) {
      setValue("analista", storedNomeAnalista);
    }
  }, [setValue]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, [isOpen]);

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
                Adicionar Ticket
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
                      disabled
                      className="text-x rounded-2xl cursor-default"
                      {...register("analista")}
                      onChange={(e) => setValue("analista", e.target.value)} // Chama setValue no evento de mudança
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
                        <SelectItem
                          key={categoria._id}
                          value={categoria.tipoProblema}
                        >
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
                    placeholder={"Solicitante"}
                    type={"text"}
                    id={"solicitante"}
                    className="text-x rounded-2xl"
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
                  Criar
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

export default AddTicketModal;
