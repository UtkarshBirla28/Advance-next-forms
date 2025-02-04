"use client";

import StepOneReview from "./step5-fields/step-one-review";
import StepTwoReview from "./step5-fields/step-two-review";
import StepThreeReview from "./step5-fields/step-three-review";
import StepFourReview from "./step5-fields/step-four-reveiw";
import { CombinedFormData } from "@/app/page";

type Step5Props = {
  purpose: string;
  subtext: string;
  comindedFormData?: CombinedFormData | undefined;
};

export default function Step5({
  purpose,
  subtext,
  comindedFormData,
}: Step5Props) {
  console.log(comindedFormData);

  return (
    <div className=" ">
      <h3 className="font-bold text-xl">{purpose}</h3>
      <p className="text-sm text-gray-500">{subtext}</p>

      <div className="mt-16 grid grid-cols-2 gap-8">
        <div className=" flex flex-col gap-9">
          {/* Project Overview */}
          <StepOneReview combinedFormData={comindedFormData} />
          {/* Tasks and Milestones */}
          <StepThreeReview combinedFormData={comindedFormData} />
        </div>
        <div className=" flex gap-10 flex-col ">
          <StepTwoReview combinedFormData={comindedFormData} />

          <StepFourReview combinedFormData={comindedFormData} />
        </div>
      </div>
    </div>
  );
}
