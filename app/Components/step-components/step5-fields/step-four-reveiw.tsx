import { CombinedFormData } from "@/app/page";
import { Card } from "@/components/ui/card";

function formatNumber(number: number | undefined) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number || 0);

  return formattedNumber;
}

export default function StepFourReview({
  combinedFormData,
}: {
  combinedFormData: CombinedFormData | undefined;
}) {
  // State to hold the project data
  const stepFourData = [
    {
      label: "Total Budget",
      value: `${formatNumber(combinedFormData?.stepFour.totalBudget)} $`,
    },
    {
      label: "Cost Tracking Method",
      value: combinedFormData?.stepFour.costTrackingMethod,
    },
    {
      label: "Ressource Allocation",
      value: combinedFormData?.stepFour.resourceAllocation,
    },
  ];

  return (
    <div>
      <h3 className="font-medium">Budget & Resources</h3>
      <Card className="p-5 bg-gray-50 shadow-none mt-3 flex flex-col gap-6">
        {/* Map through the project data array */}
        {stepFourData.map((field, index) => (
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
