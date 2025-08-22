import { Description } from "@radix-ui/react-dialog";
import z from "zod";
const schema = z.object({
  name: z.string().min(1, "Task name is required"),
  status: z.enum(["TODO", "DOING", "DONE"]),
  description: z.string().optional(),
  teams: z.array(z.string()).optional(),
});

export default schema;
