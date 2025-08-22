"use client";
import { create } from "zustand";

export const useToastStore = create((set) => ({
  isOpen: false,
  message: "",
  openToast: (message) => {
    set({ isOpen: true, message });
  },
  closeToast: () => {
    set({ isOpen: false });
  },
}));
