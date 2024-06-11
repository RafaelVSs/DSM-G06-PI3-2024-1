import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useForm, SubmitHandler } from "react-hook-form";
import { ThreeCircles } from "react-loader-spinner";
import React, { useState, useEffect } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { toast, Bounce } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Modal from "./index";
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

const EditTicketModal: React.FC<EditTicketModalProps> = ({
  isOpen,
  onClose,
  ticketId,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [analistas, setAnalistas] = useState<Analista[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, reset, watch } =
    useForm<FormData>();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);

      Promise.all([
        fetch("https://dsm-g06-pi3-2024-1.onrender.com/sala").then((response) => response.json()),
        fetch("https://dsm-g06-pi3-2024-1.onrender.com/categoria").then((response) =>
          response.json()
        ),
        fetch("https://dsm-g06-pi3-2024-1.onrender.com/analista").then((response) =>
          response.json()
        ),
      ])
        .then(([salasData, categoriasData, analistasData]) => {
          setSalas(salasData);
          setCategorias(categoriasData);
          setAnalistas(analistasData);
          setDataLoaded(true);

          if (ticketId) {
            axios
              .get(`https://dsm-g06-pi3-2024-1.onrender.com/ticket/${ticketId}`)
              .then((response) => {
                const ticketData = response.data;
                setValue("solicitante", ticketData.solicitante);
                setValue("descrição", ticketData.descrição);
                setValue("status", ticketData.status);
                setValue("nomeSala", ticketData.nomeSala);
                setValue("tipoProblema", ticketData.tipoProblema);

                const analistaId = ticketData.analista;
                const analista = analistasData.find(
                  (a: Analista) => a._id === analistaId
                );
                if (analista) {
                  setValue("analista", analista.nome);
                }

                setIsLoading(false);
              })
              .catch((error) => {
                toast.error("Erro ao buscar Ticket!", {
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
                console.error("Error fetching ticket data:", error);
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          toast.error("Erro ao buscar Ticket!", {
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
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  }, [isOpen, ticketId, setValue]);

  useEffect(() => {
    if (isOpen) {
      const intervalID = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(intervalID);
    }
  }, [isOpen]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    data.dataAtualizacao = new Date().toISOString();

    const analista = analistas.find(
      (analista) => analista.nome === data.analista
    );
    if (analista) {
      data.analista = analista._id;
    } else {
      data.analista = "";
    }

    // console.log("Formulario a ser enviado:", data);

    try {
      const response = await axios.put(
        `https://dsm-g06-pi3-2024-1.onrender.com/ticket/${ticketId}`,
        data
      );
      toast.success("Ticket atualizado com sucesso!", {
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
      // console.log("requisição put feita com sucesso!:", response.data);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Erro ao atualizar Ticket!", {
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
        console.error("Axios error updating form data:", error.response?.data);
      } else {
        toast.error("Erro ao atualizar Ticket!", {
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
        console.error("Unexpected error updating form data:", error);
      }
    }
  };

  const handleClose = () => {
    reset();
    onClose();
    setDataLoaded(false);
  };

  const handleSalaChange = (value: string) => {
    const sala = salas.find((sala) => sala._id === value);
    if (sala) {
      setValue("nomeSala", sala._id);
    }
  };

  const handleTipoProblemaChange = (value: string) => {
    const categoria = categorias.find((categoria) => categoria._id === value);
    if (categoria) {
      setValue("tipoProblema", categoria._id);
    }
  };

  const handleStatusChange = (value: string) => {
    setValue("status", value);
  };

  const watchedNomeSala = watch("nomeSala");
  const watchedTipoProblema = watch("tipoProblema");
  const watchedStatus = watch("status");
  const watchedAnalista = watch("analista");

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
          isLoading ? (
            <div className="flex justify-center items-center h-full">
              <ThreeCircles
                visible={true}
                height="100"
                width="100"
                outerCircleColor="#3e8721"
                innerCircleColor="#11507a"
                middleCircleColor="#3e8721"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mx-1 px-2 py-1 rounded-xl justify-between gap-4">
                <div className="flex w-[90%] flex-col">
                  <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-0.5">
                    Sala
                  </label>
                  <div className="w-full h-12 m-0">
                    <Select
                      value={watchedNomeSala}
                      onValueChange={handleSalaChange}
                    >
                      <SelectTrigger className="w-full text-xs">
                        <SelectValue placeholder="Sala" />
                      </SelectTrigger>
                      <SelectContent>
                        {salas.map((sala) => (
                          <SelectItem key={sala._id} value={sala._id}>
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
                      className="text-x rounded- cursor-default"
                      disabled
                      value={watchedAnalista}
                      {...register("analista")}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-1">
                  Tipo de Chamado
                </label>
                <div className="w-[100%] h-12 m-auto">
                  <Select
                    value={watchedTipoProblema}
                    onValueChange={handleTipoProblemaChange}
                  >
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue placeholder="Tipo de problema" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria._id} value={categoria._id}>
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
                    value={watchedStatus}
                    onValueChange={handleStatusChange}
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
          )
        }
        footer={<></>}
      />
    </>
  );
};

export default EditTicketModal;
