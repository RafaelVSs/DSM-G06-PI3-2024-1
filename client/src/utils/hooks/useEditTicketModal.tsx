'use client';
import { create } from "zustand";

interface EditTicketModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useEditTicketModal = create<EditTicketModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));