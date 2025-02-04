// schemas.ts
import { z } from "zod";
import { stepOneSchema } from "../Components/step-components/schemas/step1-schema";
import { stepTwoSchema } from "../Components/step-components/schemas/step2-schema";
import { stepThreeSchema } from "../Components/step-components/schemas/step3-schema";
import { stepFourSchema } from "../Components/step-components/schemas/step4-schema";
export const combinedSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
  stepFour: stepFourSchema,
});

// export type CombinedFormData = z.infer<typeof combinedSchema>;
