import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CombinedFormData } from "@/app/page";

export default function StepOneReview({
  combinedFormData,
}: {
  combinedFormData: CombinedFormData | undefined;
}) {
  // State to hold the project data
  // const [stepOneData, setStepOneData] = useState([
  //   { label: "Project Name", value: "This is a project name" },
  //   {
  //     label: "Project Description",
  //     value:
  //       "This is a project name This is a project name This is a project name This is a project name This is a project name This is a project name",
  //   },
  //   {
  //     label: "Project Category",
  //     value: "Software Development",
  //   },
  //   { label: "Start Date", value: "January 14th, 2025" },
  //   { label: "End Date", value: "January 28th, 2025" },
  //   { label: "Client Name", value: "John" },
  // ]);

  interface StepOneData {
    label: string;
    value: Date | string;
  }

  const stepOneData: StepOneData[] = [
    { label: "Project Name", value: combinedFormData?.stepOne.name || "" },
    {
      label: "Project Description",
      value: combinedFormData?.stepOne.description || "",
    },
    {
      label: "Project Category",
      value: combinedFormData?.stepOne.category || "",
    },
    {
      label: "Start Date",
      value: combinedFormData?.stepOne.startDate || new Date(),
    },
    {
      label: "End Date",
      value: combinedFormData?.stepOne.endDate || new Date(),
    },
    {
      label: "Client Name",
      value: combinedFormData?.stepOne.clientName || "",
    },
  ];

  return (
    <div>
      <h3 className="font-medium">Project Overview</h3>
      <Card className="p-5 bg-gray-50 shadow-none mt-3 flex flex-col gap-6">
        {/* Map through the project data array */}
        {stepOneData.map((field, index) => (
          <div key={index} className="flex gap-2">
            <span className={`text-sm font-medium w-[40%]`}>
              {field.label} :
            </span>
            <span className="text-sm opacity-80 text-start w-full">
              {field.value instanceof Date
                ? field.value.toLocaleDateString() // Convert Date to string
                : field.value}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}
