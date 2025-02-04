import { CombinedFormData } from "@/app/page";
import { Card } from "@/components/ui/card";

export default function StepThreeReview({
  combinedFormData,
}: {
  combinedFormData: CombinedFormData | undefined;
}) {
  // State to hold the project data
  const stepThreeData =
    combinedFormData?.stepThree.tasks.filter((task) => task.isAdded) || [];

  return (
    <div>
      <h3 className="font-medium">Tasks and Milestones</h3>
      <Card className="p-5 bg-gray-50 shadow-none mt-3 flex flex-wrap gap-6">
        {/* Map through the stepThreeData array */}
        {stepThreeData.map((task) => {
          return (
            <div
              key={task.id}
              className="p-2 px-3 border rounded-lg text-sm flex gap-2 items-center bg-gray-100"
            >
              <div className="flex flex-col">
                <span className="font-medium">{task.title}</span>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
