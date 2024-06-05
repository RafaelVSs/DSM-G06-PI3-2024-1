'use client';
import { create } from "zustand";

interface AddTicketModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useAddTicketModal = create<AddTicketModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
// const useAddTicketModal = create<AddTicketModalStore>((set) => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// // const useAddTicketModal = create((set) => ({
// //   isOpen: false,
// //   onOpen: () => set({ isOpen: true }),
// //   onClose: () => set({ isOpen: false }),
// // }));

// export default useAddTicketModal;