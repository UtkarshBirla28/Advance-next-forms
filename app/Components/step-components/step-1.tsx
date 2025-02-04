import { UseFormReturn } from "react-hook-form";

import ClientName from "./step1-fields/client-name";
import { ProjectCategory } from "./step1-fields/project-category";
import ProjectDescription from "./step1-fields/project-description";
import ProjectEndDate from "./step1-fields/project-end-date";
import ProjectName from "./step1-fields/project-name";
import ProjectStartDate from "./step1-fields/project-start-date";
import { stepOneFormData } from "./schemas/step1-schema";

type Step1Props = {
  purpose: string;
  subtext: string;
  methods: UseFormReturn<stepOneFormData>; // Specific to Step 1
};

export default function Step1({ purpose, subtext, methods }: Step1Props) {
  return (
    <div className=" mt-10 ">
      <h3 className="font-bold text-xl">{purpose}</h3>
      <p className="text-sm text-gray-500">{subtext}</p>
      <div className="grid grid-cols-2 mt-5 gap-8">
        <div className="mt-4 flex flex-col gap-7">
          <ProjectName methods={methods} />
          <ProjectDescription methods={methods} />
          <ProjectCategory methods={methods} />
        </div>
        <div className="mt-4 flex flex-col gap-7">
          <ProjectStartDate methods={methods} />
          <ProjectEndDate methods={methods} />
          <ClientName methods={methods} />
        </div>
      </div>
    </div>
  );
}
