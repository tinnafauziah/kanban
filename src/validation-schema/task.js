import { STATUSES } from "@/type/task";
import z from "zod";
const schema = z.object({
  name: z.string().min(1, "Task name is required"),
  status: z.enum([STATUSES[0].value, STATUSES[1].value, STATUSES[2].value], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  description: z.string().optional(),
  teams: z.array(z.string()).optional(),
});

export default schema;
