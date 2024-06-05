'use client'
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

function Header() {
  const [user, setUser] = useState<{ nome: string; localAnalista: string } | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      axios.get(`sua/api/endpoint/${storedEmail}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Erro ao obter dados do usuário:', error);
        });
    } else {
      console.error('Email não encontrado no armazenamento local.');
    }
  }, []);

  return (
    <div className="z-5 flex justify-between w-[95%] rounded-full h-16 fixed top-2 bg-[#0b4c71e3] px-2 drop-shadow-xl mb-2">
      <div className="flex items-center gap-2 pl-4 py-2">
        <Image
          src="/img/robozinho.png"
          width={40}
          height={40}
          alt="logo robotic"
          className="mr-6 md:mr-0"
        />
        <h2 className="hidden md:block uppercase font-bold text-sm lg:text-2xl text-white">Robotic</h2>
      </div>
      <div className="flex items-center">
        {user && (
          <h3 className="text-xs md:text-sm lg:text-xl text-white">
            Magalu {user.localAnalista} | Bem-vindo, {user.nome}.
          </h3>
        )}
      </div>
      <div className="pr-0 py-2 flex items-center">
        <Button
          className="w-1/4 h-8 bg-[#ffffff] hover:bg-[#29581f] text-black hover:text-white shadow-md rounded-xl hover:shadow-xl px-8 py-3"
          onClick={() => {
            localStorage.removeItem('email');
            window.location.href = "/";
          }}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}

export default Header;
