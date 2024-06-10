"use client";
import { Button } from "@/components/ui/button";
import { toast, Bounce } from 'react-toastify';
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Image from "next/image";
import axios from "axios";
import React from "react";

interface Analista {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  localAnalista: string;
  __v: number;
}

export default function App() {
  //VARIÁVEIS
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  //REQUISIÇÃO GET
  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/analista/`);

      const analistas: Analista[] = response.data;

      const foundAnalista = analistas.find(
        (analista) => analista.email === email && analista.senha === password
      );

      if (foundAnalista) {
        // Guardar informações de login no localStorage
        localStorage.setItem("nomeAnalista", foundAnalista.nome);
        localStorage.setItem("localAnalista", foundAnalista.localAnalista);
        toast.success('Login realizado com sucesso!', {
          position: "bottom-center",
          autoClose: 50000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
        // setMessage("Login bem-sucedido!");
        window.location.href = "/home";
      } else {
        toast.error('Usuário ou senha incorretos!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
        // setMessage("Usuário ou senha incorretos");
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao fazer login!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      // console.error("Erro na requisição:", error);
      // setMessage("Ocorreu um erro ao fazer login");
    }
  };

  // USEEFFECT
  useEffect(() => {
    // Verificar se há informações de login no localStorage e preencher o campo de email
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-[url('/img/sean-pollock-PhYq704ffdA-unsplash.jpg')] bg-cover bg-center">
      <div className="w-10/12 md:w-3/5 lg:w-1/3 min-h-full py-10 md:py-4 md:pl-2 pl-0 lg:pl-0 lg:py-10 items-center justify-center text-sm flex flex-col lg:flex-col md:flex-row rounded-2xl bg-[#0b4c71c5]">
        <Image
          src="/img/logo_RobAt_Bco.png"
          width={150}
          height={150}
          alt="logo robotic"
          className="mx-auto mb-10 lg:mb-10 md:mb-0 h-full"
        />
        <div className="justify-center w-full flex flex-col items-center">
          <p className="text-white">Faça login para continuar</p>
          <Input
            type="text"
            placeholder="Usuário"
            className="mt-2 w-10/12 lg:w-1/2 mb-1 rounded-xl py-6"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            className="mt-2 w-10/12 lg:w-1/2 mb-6 rounded-xl py-6"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-1/4 h-10 bg-[#3e8721] hover:bg-[#29581f] text-white shadow-md rounded-xl hover:shadow-xl"
            type="submit"
            variant="default"
            size="default"
            onClick={handleLogin}
          >
            Login
          </Button>
          {message && <p className="mt-4 text-white">{message}</p>}
        </div>
      </div>
      <Footer />
    </main>
  );
}
