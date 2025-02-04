import { UseFormReturn } from "react-hook-form";
import { FaProjectDiagram } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { LuMilestone } from "react-icons/lu";
import { RiSpaceShipFill, RiTeamFill } from "react-icons/ri";
import { stepOneFormData } from "./step-components/schemas/step1-schema";
import { stepTwoFormData } from "./step-components/schemas/step2-schema";
import { stepThreeFormData } from "./step-components/schemas/step3-schema";
import { StepFourFormData } from "./step-components/schemas/step4-schema";
import Step1 from "./step-components/step-1";
import Step2 from "./step-components/step-2";
import Step3 from "./step-components/step-3";
import Step4 from "./step-components/step-4";
import Step5 from "./step-components/step-5";
import { Step } from "./stepper/types";

export const stepData = {
  step1: {
    purpose: "Define the basic details of the project",
    subtext:
      "Provide a clear and concise overview of your project to help your team understand its scope and objectives.",
  },
  step2: {
    purpose: "Assign team members and define their roles",
    subtext:
      "Add team members and assign roles to ensure everyone knows their responsibilities. You can also invite external collaborators if needed.",
  },
  step3: {
    purpose: "Break down the project into tasks and milestones",
    subtext:
      "Create a detailed task list with deadlines and priorities to keep your project on track. Add milestones to mark key achievements.",
  },
  step4: {
    purpose: "Plan the project’s financial and resource allocation",
    subtext:
      "Outline your budget and allocate resources effectively to avoid overspending and ensure smooth project execution.",
  },
  step5: {
    purpose: "Finalize and launch the project",
    subtext:
      "Review all the details you’ve entered to ensure everything is accurate. Once confirmed, launch your project and get started!",
  },
};

export const steps: Step[] = [
  {
    purpose: stepData.step1.purpose,
    subtext: stepData.step1.subtext,
    icon: FaProjectDiagram,
    label: "Project Overview",
    content: ({ methods }) => (
      <Step1
        purpose={stepData.step1.purpose}
        subtext={stepData.step1.subtext}
        methods={methods as UseFormReturn<stepOneFormData>} // Cast to the correct type
      />
    ),
  },
  {
    purpose: stepData.step2.purpose,
    subtext: stepData.step2.subtext,
    icon: RiTeamFill,
    label: "Team & Roles",
    content: ({ methods, users, setUsers }) => (
      <Step2
        purpose={stepData.step2.purpose}
        subtext={stepData.step2.subtext}
        methods={methods as UseFormReturn<stepTwoFormData>} // Cast to the correct type
        users={users}
        setUsers={setUsers}
      />
    ),
  },
  {
    purpose: stepData.step3.purpose,
    subtext: stepData.step3.subtext,
    icon: LuMilestone,
    label: "Tasks & Milestones",
    content: ({ methods, allTasks, setAllTasks }) => (
      <Step3
        purpose={stepData.step3.purpose}
        subtext={stepData.step3.subtext}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        methods={methods as UseFormReturn<stepThreeFormData>}
      />
    ),
  },
  {
    purpose: stepData.step4.purpose,
    subtext: stepData.step4.subtext,
    icon: FaMoneyBillWave,
    label: "Budget & Resources",
    content: ({ methods }) => (
      <Step4
        purpose={stepData.step4.purpose}
        subtext={stepData.step4.subtext}
        methods={methods as UseFormReturn<StepFourFormData>}
      />
    ),
  },
  {
    purpose: stepData.step5.purpose,
    subtext: stepData.step5.subtext,
    icon: RiSpaceShipFill,
    label: "Review & Launch",
    content: ({ comindedFormData }) => (
      <Step5
        purpose={stepData.step5.purpose}
        subtext={stepData.step5.subtext}
        comindedFormData={comindedFormData}
      />
    ),
  },
];
