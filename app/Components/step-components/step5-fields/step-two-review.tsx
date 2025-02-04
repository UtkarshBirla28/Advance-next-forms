import { CombinedFormData } from "@/app/page";
import { Card } from "@/components/ui/card";

export default function StepTwoReview({
  combinedFormData,
}: {
  combinedFormData: CombinedFormData | undefined;
}) {
  // State to hold the project data
  const stepTwoData = [
    {
      label: "Team Members",
      value: combinedFormData?.stepTwo.users
        //filter out the added
        .filter((user) => user.isAdded)
        //extract the name
        .map((user) => user.name)
        //
        .join(","),
    },
    {
      label: "Team Leader",
      value: combinedFormData?.stepTwo.users
        .filter((user) => user.isLeader)
        .map((user) => user.name),
    },
  ];

  return (
    <div>
      <h3 className="font-medium">Teams And Roles</h3>
      <Card className="p-5 bg-gray-50 shadow-none mt-3 flex flex-col gap-6">
        {/* Map through the project data array */}
        {stepTwoData.map((field, index) => (
          <div key={index} className="flex gap-2">
            <span className={`text-sm font-medium w-[40%]`}>
              {field.label} :
            </span>
            <span className="text-sm opacity-80 text-start w-full">
              {field.value}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}
