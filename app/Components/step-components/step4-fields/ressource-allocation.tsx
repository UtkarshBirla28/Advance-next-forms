import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { MdError } from "react-icons/md";
import { StepFourFormData } from "../schemas/step4-schema";

export default function ResourceAllocation({
  register,
  watch,
  trigger,
  errors,
}: {
  register: UseFormRegister<StepFourFormData>;
  watch: UseFormWatch<StepFourFormData>;
  trigger: UseFormTrigger<StepFourFormData>;
  errors: FieldErrors<StepFourFormData>;
}) {
  const resourceAllocation = watch("resourceAllocation");
  const maxLength = 135;

  useEffect(() => {
    trigger("resourceAllocation");
  }, [resourceAllocation]);

  // jsx
  return (
    <div className="mb-6 mt-7">
      <Label htmlFor="resourceAllocation" className="text-gray-600">
        Resource Allocation
      </Label>
      <Textarea
        {...register("resourceAllocation")}
        id="resourceAllocation"
        className="h-12 mt-2 resize-none"
        placeholder="Enter the resource allocation details"
        maxLength={maxLength}
      />

      <div className="flex justify-between mt-1">
        {/* error */}
        {errors.resourceAllocation && (
          <div className="text-red-500 text-sm flex items-center gap-2">
            <MdError />
            <span>{errors.resourceAllocation.message}</span>
          </div>
        )}

        {/* Character counter */}
        <div className="text-sm text-gray-500 mt-1">
          {resourceAllocation.length}/{maxLength} characters
        </div>
      </div>
    </div>
  );
}
