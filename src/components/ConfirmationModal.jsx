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
import { deleteTask } from "@/store/task";

export default function TaskForm({ Trigger, id }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (id) {
        await deleteTask(id);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle error appropriately, e.g., show a notification
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (isOpen) => {
    if (!loading) {
      setOpen(isOpen);
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
          <Button type="submit" disabled={loading} onClick={handleDelete}>
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
