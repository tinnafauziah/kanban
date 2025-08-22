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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import taskSchema from "@/validation-schema/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask, updateTask } from "@/store/task";
import { useLoginStore } from "@/store/login";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { TODO, STATUSES, TEAMS } from "@/type/task"; // Assuming you have a type file for task constants
import { Loader2Icon } from "lucide-react";

export default function TaskForm({ Trigger, task }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      teams: [],
      status: TODO,
    },
  });
  const { loggedUser } = useLoginStore();
  useEffect(() => {
    if (open && task) {
      reset({
        name: task.name || "",
        description: task.description || "",
        teams: task.teams || [],
        status: task.status || TODO,
      });
    }
  }, [open, task, reset]);
  const onSubmit = async (data) => {
    setLoading(true);
    const requestBody = {
      ...data,
      userId: loggedUser?.id,
      updatedAt: new Date().toISOString(),
    };
    try {
      if (task?.id) {
        await updateTask(task.id, requestBody);
      } else {
        await createTask({
          ...requestBody,
          createdAt: new Date().toISOString(),
        });
      }
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error appropriately, e.g., show a notification
    } finally {
      setLoading(false);
    }
  };
  const handleOpenDialog = (isOpen) => {
    if (!loading) {
      setOpen(isOpen);
      if (!isOpen) {
        reset({
          name: task.name || "",
          description: task.description || "",
          teams: task.teams || [],
          status: task.status || TODO,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{task?.id ? "Edit a Task" : "Add a Task"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 px-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Task Name*</Label>
              <Input
                {...register("name")}
                id="name"
                name="name"
                placeholder="Task name here..."
                isError={!!errors.name}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                id="description"
                name="description"
                placeholder="Description here..."
              />
            </div>
            <Controller
              name="teams"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <div className="grid gap-2">
                  {TEAMS.map((tag) => (
                    <Label key={tag}>
                      <Checkbox
                        checked={field.value.includes(tag)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, tag]);
                          } else {
                            field.onChange(
                              field.value.filter((t) => t !== tag)
                            );
                          }
                        }}
                      />
                      {tag}
                    </Label>
                  ))}
                </div>
              )}
            />
            <div className="grid gap-3">
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                defaultValue={TODO}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((status) => {
                        return (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
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
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin" /> Loading
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
