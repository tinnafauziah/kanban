"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export default function ConfirmationModal({ Trigger, id, onConfirm, loading }) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = (isOpen) => {
    if (!loading) {
      setOpen(isOpen);
    }
  };

  const handleConfirm = async (id) => {
    if (id) {
      await onConfirm(id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <p className="py-4 px-4">Are you sure you want to delete this task?</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin" /> Loading
                </>
              ) : (
                "Cancel"
              )}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={loading}
            onClick={() => handleConfirm(id)}
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin" /> Loading
              </>
            ) : (
              "Yes, delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
