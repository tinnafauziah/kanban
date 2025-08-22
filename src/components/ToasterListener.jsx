"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useToastStore } from "@/store/toast";
import { Button } from "@/components/ui/button";

export function ToasterListener() {
  const { message, isOpen, closeToast } = useToastStore();

  useEffect(() => {
    if (isOpen) {
      toast.custom((t) => (
        <div className="flex items-center gap-4 rounded-lg border bg-white p-2 shadow-lg">
          <div className="text-sm font-normal border-l-4 border-green-500 pl-4">
            {message}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              closeToast();
              toast.dismiss(t);
            }}
          >
            Got it
          </Button>
        </div>
      ));
      closeToast();
    }
  }, [isOpen, message, closeToast]);

  return null;
}
