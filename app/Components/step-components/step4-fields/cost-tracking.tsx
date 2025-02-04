"use client";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller } from "react-hook-form";
import { StepFourFormData } from "../schemas/step4-schema";

export default function CostTrackingMethod({
  control,
}: {
  control: Control<StepFourFormData>;
}) {
  return (
    <div>
      <Label htmlFor="totalBudget" className="text-gray-600">
        Cost Tracking Method
      </Label>
      <Controller
        control={control}
        defaultValue="fixed-budget"
        name="costTrackingMethod"
        render={({ field }) => {
          return (
            <Select
              defaultValue="fixed-budget"
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="h-12 mt-2">
                <SelectValue placeholder="Select a cost tracking method" />
              </SelectTrigger>
              <SelectContent className="poppins">
                <SelectItem className="h-11" value="fixed-budget">
                  Fixed Budget
                </SelectItem>
                <SelectItem className="h-11" value="hourly-billing">
                  Hourly Billing
                </SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />
    </div>
  );
}
