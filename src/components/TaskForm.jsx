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
import { createTask } from "@/store/task";
import { useLoginStore } from "@/store/login";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

export default function TaskForm({ Trigger }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
  });
  const { loggedUser } = useLoginStore();
  const teams = ["Design", "Backend", "Frontend"];
  const onSubmit = async (data) => {
    const requestBody = {
      ...data,
      userId: loggedUser?.id,
    };
    try {
      await createTask(requestBody);
      reset();
      setOpen(false);
    } catch (error) {
      console.log("Error creating task:", error);
      console.error("Failed to create task:", error);
    }
  };
  const handleOpenDialog = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
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
                  {teams.map((tag) => (
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
                defaultValue="TODO"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TODO">TO DO</SelectItem>
                      <SelectItem value="DOING">DOING</SelectItem>
                      <SelectItem value="DONE">DONE</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
