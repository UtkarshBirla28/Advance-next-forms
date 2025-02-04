import { z } from "zod";

// Define the Task schema
const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  dueDate: z.date(),
  status: z.enum(["Not Started", "In Progress", "Completed"]),
  priority: z.enum(["Low", "Medium", "High"]),
  isAdded: z.boolean(),
  icon: z.unknown(), // Use z.any() for IconType (React Icons)
});

// Define the tasks array schema
export const stepThreeSchema = z.object({
  tasks: z.array(taskSchema).refine(
    (tasks) => tasks.some((task) => task.isAdded), // Ensure at least one task is added
    {
      message: "At least one task must be added to the project.", // Custom error message
    }
  ),
});

// Infer the type for the tasks array
export type stepThreeFormData = z.infer<typeof stepThreeSchema>;
