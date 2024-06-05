'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Poppins } from "next/font/google";
import "./globals.css";
import { useState } from "react";

import AddTicketModal from "@/components/modals/addTicketModal";
import {useAddTicketModal} from "@/utils/hooks/useAddTicketModal";
import EditTicketModal from "@/components/modals/editTicketModal";
import {useEditTicketModal} from "@/utils/hooks/useEditTicketModal";

const poppins = Poppins({ subsets: ["latin"], weight: ['500'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <html lang="pt-BR">
        <body suppressHydrationWarning={true} className={poppins.className}>
          {children}
          <AddTicketModal isOpen={isOpen} onClose={handleClose} />
          <EditTicketModal isOpen={isOpen} onClose={handleClose}/>
          <ToastContainer />
        </body>
    </html>
  );
}