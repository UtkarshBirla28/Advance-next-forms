import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { MdError } from "react-icons/md";
import { stepOneFormData } from "../schemas/step1-schema";

import { useEffect } from "react";

export default function ProjectName({
  methods,
}: {
  methods: UseFormReturn<stepOneFormData>;
}) {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = methods;

  //access to the name input state
  const nameValue = watch("name"); // Watch the `name` field

  //trigger the description when the user update the input name so that the errors disappear
  //when the user has not been before validated
  //
  useEffect(() => {
    trigger("name");
  }, [nameValue]);

  return (
    <div className="h-28">
      <Label htmlFor="projectName" className="text-gray-600">
        Project Name
      </Label>
      <Input
        id="projectName"
        className="h-12 mt-1"
        placeholder="Enter project name"
        {...register("name")}
      />

      {errors.name && (
        <div className="text-red-500 text-sm flex items-center gap-2 mt-2">
          <MdError />
          <span>{errors.name.message}</span>
        </div>
      )}
    </div>
  );
}
