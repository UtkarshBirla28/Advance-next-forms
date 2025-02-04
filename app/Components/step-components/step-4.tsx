import { UseFormReturn } from "react-hook-form";
import CostTrackingMethod from "./step4-fields/cost-tracking";
import ResourceAllocation from "./step4-fields/ressource-allocation";
import TotalBudget from "./step4-fields/total-budget";
import { StepFourFormData } from "./schemas/step4-schema";

type Step4Props = {
  purpose: string;
  subtext: string;
  methods: UseFormReturn<StepFourFormData>;
};

export default function Step4({ purpose, subtext, methods }: Step4Props) {
  const {
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = methods;
  //
  return (
    <div className="  ">
      <h3 className="font-bold text-xl">{purpose}</h3>
      <p className="text-sm text-gray-500">{subtext}</p>

      <div className="mb-6  grid grid-cols-2 gap-4 mt-[66px]">
        <TotalBudget control={control} errors={errors} trigger={trigger} />
        <CostTrackingMethod control={control} />
      </div>
      <ResourceAllocation
        register={register}
        watch={watch}
        trigger={trigger}
        errors={errors}
      />
    </div>
  );
}
