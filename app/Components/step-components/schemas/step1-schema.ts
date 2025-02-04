import { z } from "zod";

//PROJECT NAME SCHEMA
const projectNameSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .nonempty("Project name is required"),
});

// PROJECT DESCRIPTION SCHEMA
const projectDescriptionSchema = z.object({
  description: z
    .string()
    .max(135, "Description must be 135 characters or less")
    .nonempty("Description required"),
});

// PROJECT CATEGORY SCHEMA
const projectCategorySchema = z.object({
  category: z.enum([
    "Marketing",
    "Software Development",
    "Construction",
    "Education",
    "Healthcare",
  ]),
});

// START DATE SCHEMA
const projectStartDateSchema = z.object({
  startDate: z.date({ required_error: "Start Date is required" }),
});

//END DATE SCHEMA
const projectEndDateSchema = z.object({
  endDate: z.date({ required_error: "End Date is required" }),
});

//CLIENT NAME
const projectClientNameSchema = z.object({
  clientName: z.string().optional(),
});

export const stepOneSchema = z.object({
  ...projectNameSchema.shape,
  ...projectDescriptionSchema.shape,
  ...projectCategorySchema.shape,
  ...projectStartDateSchema.shape,
  ...projectEndDateSchema.shape,
  ...projectClientNameSchema.shape,
});

export type stepOneFormData = z.infer<typeof stepOneSchema>;
