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
export default function TaskForm({ Trigger }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 pb-4 px-4">
            <div className="grid gap-2">
              <Label htmlFor="task-name-1">Task Name*</Label>
              <Input
                id="task-name-1"
                name="task-name"
                placeholder="Task name here..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Textarea
                id="description-1"
                name="description"
                placeholder="Description here..."
              />
            </div>
            <div className="grid gap-2">
              <Checkbox title="Design" />
              <Checkbox title="Backend" />
              <Checkbox title="Frontend" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status-1">Status</Label>
              <Select defaultValue="TODO">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">TO DO</SelectItem>
                  <SelectItem value="DOING">DOING</SelectItem>
                  <SelectItem value="DONE">DONE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
