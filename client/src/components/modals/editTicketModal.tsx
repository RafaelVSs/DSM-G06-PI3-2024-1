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
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import Modal from "./index";
import React from "react";

type EditTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditTicketModal: React.FC<EditTicketModalProps> = ({
  isOpen,
  onClose,
}) => {
  //   const { data: session, status } = useSession();
  const [currentTime, setCurrentTime] = useState(new Date());

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async () => {
    console.log("aqui tem");
  };

  const handleClose = () => {
    onClose();
  };

  // React.useEffect(() => {}, [isOpen]);

  React.useEffect(() => {
    // Atualizar a hora atual a cada segundo
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalID);
  }, [isOpen]);

  return (
    <>
      <Modal
        zIndex={100}
        isOpen={isOpen}
        onClose={() => {
          onClose(), handleClose();
        }}
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
              <div className="flex flex-col  mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-0.5">
                  Setor e Sala
                </label>
                <div className="flex justify-between">
                  <div className="w-[46%] h-12 m-0">
                    <Select
                    // onValueChange={(e) => {
                    //   const value = JSON.parse(e);
                    //   getCities(value.id);
                    //   setCustomValue("state", value?.sigla);
                    // }}
                    // defaultValue={state}
                    >
                      <SelectTrigger className="w-full text-xs">
                        <SelectValue placeholder="Setor" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* {states
                          ?.sort((a, b) => (a.sigla > b.sigla ? 1 : -1))
                          .map((state, index) => (
                            <SelectItem
                              key={index}
                              value={JSON.stringify({
                                sigla: state.sigla,
                                id: state.id,
                              })}
                            >
                              {state.sigla}
                            </SelectItem>
                          ))} */}
                        <SelectItem value="LABS">LABS</SelectItem>
                        <SelectItem value="RESOLVE">RESOLVE</SelectItem>
                        <SelectItem value="EC500">EC500</SelectItem>
                        <SelectItem value="RESOLVE+">RESOLVE+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-[46%] h-12 m-0">
                    <Select
                    // onValueChange={(e) => {
                    //   const value = JSON.parse(e);
                    //   setCustomValue("city", value?.nome);
                    // }}
                    // defaultValue={city}
                    >
                      <SelectTrigger className="w-full text-xs">
                        <SelectValue placeholder="Sala" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* {cities?.map((city, index) => (
                          <SelectItem
                            key={index}
                            value={JSON.stringify({
                              nome: city.nome,
                            })}
                          >
                            {city.nome}
                          </SelectItem>
                        ))} */}
                        <SelectItem value="LABS">LABS</SelectItem>
                        <SelectItem value="RESOLVE">RESOLVE</SelectItem>
                        <SelectItem value="EC500">EC500</SelectItem>
                        <SelectItem value="RESOLVE+">RESOLVE+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col  mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-0.5">
                  Tipo de Chamado
                </label>
                <div className="w-[100%] h-12 m-auto">
                  <Select
                  // onValueChange={(e) => {
                  //   const value = JSON.parse(e);
                  //   setCustomValue("modality", value?.id);
                  // }}
                  // defaultValue={
                  //   modalities?.find((item) => item?.id === modality)
                  //     ?.modality
                  // }
                  >
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue placeholder="Tipo de problema" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* {modalities?.map((item, index) => (
                        <SelectItem
                          key={item.id}
                          value={JSON.stringify({
                            modality: item.modality,
                            id: item.id,
                          })}
                        >
                          {item.modality}
                        </SelectItem>
                      ))} */}
                      <SelectItem value="SOFTWARE">SOFTWARE</SelectItem>
                      <SelectItem value="HARDWARE">HARDWARE</SelectItem>
                      <SelectItem value="REDE">REDE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col  mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-1">
                  Solicitante
                </label>
                <div className="w-[100%] h-12 m-auto">
                  <Input
                    placeholder={"Solicitante"}
                    type={"text"}
                    id={"name"}
                    className="text-x rounded-2xl"
                    // register={register}
                  />
                </div>
              </div>

              <div className="flex flex-col  mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-1">
                  Descrição
                </label>
                <div className="w-[100%] h-12 m-auto">
                  <textarea
                    name="Descrição"
                    id="descricao"
                    placeholder="Descrição..."
                    className="w-full max-h-[70px] min-h-[70px] text-xs p-2 rounded-2xl border-2 border-slate-200 focus:ring-1 focus:ring-[#15803c] focus:ring-offset-1 focus:outline-none"
                  ></textarea>
                  {/* <Input
                    placeholder={""}
                    type={"text"}
                    id={"name"}
                    className="h-20"
                    // register={register}
                  /> */}
                </div>
              </div>

              <div className="flex flex-col  mx-1 px-2 py-1 rounded-xl mt-5 mb-2">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-1">
                  Status
                </label>
                <div className="grid-cols-3 justify-between">
                  <RadioGroup
                    className="flex justify-center gap-2 md:gap-20 w-full"
                    defaultValue="ticketStatus"
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

              <div className="flex flex-col  mx-1 px-2 py-1 rounded-xl">
                <label className="text-sm md:text-sm lg:text-sm text-[#002f3f] ml-1 mb-0.5">
                  Data e hora da edição
                </label>
                <div className="flex justify-between">
                  <div className="w-[46%] h-12 m-0">
                    <Input
                      placeholder={"Data de Abertura"}
                      type={"date"}
                      id={"name"}
                      className="text-xs rounded-2xl justify-end"
                      // register={register}
                    />
                  </div>

                  <div className="w-[46%] h-12 m-0">
                    <Input
                      placeholder={"Hora de Abertura"}
                      type={"time"}
                      id={"name"}
                      className="text-xs rounded-2xl justify-end"
                      // register={register}
                    />
                  </div>
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
