import { UseFormReturn } from "react-hook-form";
import { IconType } from "react-icons";
import { stepOneFormData } from "../step-components/schemas/step1-schema";
import { stepTwoFormData } from "../step-components/schemas/step2-schema";
import { User } from "../step-components/step2-fields/team-members/team-members";
import { Dispatch, SetStateAction } from "react";
import { stepThreeFormData } from "../step-components/schemas/step3-schema";
import { Task } from "../step-components/data/tasks";
import { StepFourFormData } from "../step-components/schemas/step4-schema";
import { CombinedFormData } from "@/app/page";

// Union type for form methods
export type FormMethods =
  | UseFormReturn<stepOneFormData>
  | UseFormReturn<stepTwoFormData>
  | UseFormReturn<stepThreeFormData>
  | UseFormReturn<StepFourFormData>;

export type Step = {
  purpose: string;
  subtext: string;
  icon: IconType;
  label: string;
  content: ({
    methods,
    users,
    setUsers,
    allTasks,
    setAllTasks,
    comindedFormData,
  }: {
    methods: FormMethods; // Use the union type
    users?: User[] | undefined;
    setUsers?: Dispatch<SetStateAction<User[]>> | undefined;
    //
    allTasks?: Task[] | undefined;
    setAllTasks?: Dispatch<SetStateAction<Task[]>> | undefined;
    comindedFormData?: CombinedFormData;
  }) => React.ReactNode;
};
