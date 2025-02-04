import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { MdError } from "react-icons/md";
import { stepOneFormData } from "../schemas/step1-schema";

import { useEffect } from "react";

export default function ProjectDescription({
  methods,
}: {
  methods: UseFormReturn<stepOneFormData>;
}) {
  const maxLength = 135;

  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = methods;
  // jsx
  //get access to the state of description by using the watch from react hook form
  const description = watch("description", "");
  //
  //trigger the description when the user update the text area so that the errors disappear
  //when the user has not been before validated
  //
  const watchDescription = watch("description");
  useEffect(() => {
    trigger("description");
  }, [watchDescription]);

  return (
    <div className=" h-[147px] ">
      <Label htmlFor="projectDescription" className="text-gray-600">
        Project Description
      </Label>
      <Textarea
        {...register("description")}
        id="projectDescription"
        className="h-12 mt-2 resize-none"
        placeholder="Enter a description for the project"
      />

      <div className="flex justify-between mt-1">
        {/* error */}
        {errors.description && (
          <div className="text-red-500 text-sm  flex items-center gap-2">
            <MdError />
            <span>{errors.description.message}</span>
          </div>
        )}

        {/* Character counter */}
        <div className="text-sm text-gray-500 mt-1">
          {description.length}/{maxLength} characters
        </div>
      </div>
    </div>
  );
}
