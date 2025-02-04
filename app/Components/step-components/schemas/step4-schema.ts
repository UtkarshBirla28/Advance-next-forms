import { z } from "zod";

// Schema for TotalBudget
const totalBudgetSchema = z.object({
  totalBudget: z.number().gt(0, "Budget must be greater than 0"), // Ensure the budget is a positive number
});

// Schema for CostTrackingMethod
const costTrackingMethodSchema = z.enum(["fixed-budget", "hourly-billing"]); // Only allow these two values

// Schema for ResourceAllocation
const resourceAllocationSchema = z.object({
  resourceAllocation: z
    .string()
    .nonempty("Resource allocation is required")
    .max(135, "Resource allocation must be 135 characters or less"), // Ensure the text is within the limit
});

// Combined schema for Step 4
export const stepFourSchema = z.object({
  totalBudget: totalBudgetSchema.shape.totalBudget,
  costTrackingMethod: costTrackingMethodSchema,
  resourceAllocation: resourceAllocationSchema.shape.resourceAllocation,
});

// Infer the type for the step 4 form data
export type StepFourFormData = z.infer<typeof stepFourSchema>;
