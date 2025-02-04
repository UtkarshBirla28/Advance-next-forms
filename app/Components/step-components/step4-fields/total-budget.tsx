import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdError } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { BiDollar } from "react-icons/bi";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import { StepFourFormData } from "../schemas/step4-schema";

export default function TotalBudget({
  control,
  errors,
  trigger,
}: {
  control: Control<StepFourFormData>;
  errors: FieldErrors<StepFourFormData>;
  trigger: UseFormTrigger<StepFourFormData>;
}) {
  return (
    <div className="relative">
      <BiDollar className="absolute right-3 top-12 text-primary " />
      <Label htmlFor="totalBudget" className="text-gray-600">
        Total Budget
      </Label>
      <Controller
        control={control}
        name="totalBudget"
        render={({ field }) => {
          return (
            <NumericFormat
              placeholder="Enter the budget of the project..."
              value={field.value || 0}
              onValueChange={async (values) => {
                field.onChange(values.floatValue ?? 0);
                await trigger("totalBudget");
              }}
              customInput={Input}
              thousandSeparator
              className="h-12 mt-2 poppins"
            />
          );
        }}
      />

      {errors.totalBudget && (
        <div className="text-red-500 text-sm flex items-center gap-2 mt-2">
          <MdError />
          <span>{errors.totalBudget.message}</span>
        </div>
      )}
    </div>
  );
}
