"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useToastStore } from "@/store/toast";

export function ToasterListener() {
  const { message, isOpen, closeToast } = useToastStore();
  console.log(isOpen);

  useEffect(() => {
    if (isOpen) {
      toast.success(message);
      closeToast();
    }
  }, [isOpen, message, closeToast]);

  return null;
}
