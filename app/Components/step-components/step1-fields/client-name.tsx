import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { stepOneFormData } from "../schemas/step1-schema";

export default function ClientName({
  methods,
}: {
  methods: UseFormReturn<stepOneFormData>;
}) {
  const { register } = methods;
  return (
    <div className="mt-[66px]">
      <Label htmlFor="clientName" className="text-gray-600">
        Client Name (Optional)
      </Label>
      <Input
        {...register("clientName")}
        id="clientName"
        className="h-[52px] mt-[5px]"
        placeholder="Enter a client name"
      />
    </div>
  );
}
