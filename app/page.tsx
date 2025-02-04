"use client";

import { useEffect, useState } from "react";
import Stepper from "./Components/stepper/stepper";
import { steps } from "./Components/steps-data";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

// React hook form and zod resolver imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Import schemas and types
import {
  stepOneSchema,
  stepOneFormData,
} from "./Components/step-components/schemas/step1-schema";
import { usersArray } from "./Components/step-components/step2-fields/step2-data";
import { User } from "./Components/step-components/step2-fields/team-members/team-members";
import {
  stepTwoFormData,
  stepTwoSchema,
} from "./Components/step-components/schemas/step2-schema";
import { tasks } from "./Components/step-components/data/tasks";
import {
  stepThreeFormData,
  stepThreeSchema,
} from "./Components/step-components/schemas/step3-schema";
import {
  StepFourFormData,
  stepFourSchema,
} from "./Components/step-components/schemas/step4-schema";
import { z } from "zod";

// Button labels for navigation
const BUTTON_LABELS = {
  BACK: "Back",
  NEXT: "Next Step",
  SUMBIT: "Launch Project",
};

// Combined schema for all steps
export const combinedSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
  stepFour: stepFourSchema,
});

// Infer the type for the combined schema
export type CombinedFormData = z.infer<typeof combinedSchema>;

export default function Home() {
  // State for managing the current step, users, tasks, and combined form data
  const [currentStep, setCurrentStep] = useState(0);
  const [users, setUsers] = useState<User[]>(usersArray);
  const [allTasks, setAllTasks] = useState(tasks);
  const [allFormData, setAllFormData] = useState<CombinedFormData>({
    stepOne: {
      name: "",
      category: "Software Development",
      description: "",
      endDate: new Date(),
      startDate: new Date(),
      clientName: "",
    },
    stepTwo: {
      users: [],
    },
    stepThree: { tasks: [] },
    stepFour: {
      costTrackingMethod: "fixed-budget",
      resourceAllocation: "",
      totalBudget: 0,
    },
  });

  // React Hook Form methods for each step
  const stepOneMethods = useForm<stepOneFormData>({
    resolver: zodResolver(stepOneSchema),
  });

  const stepTwoMethods = useForm<stepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: { users: usersArray },
  });

  const stepThreeMethods = useForm<stepThreeFormData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: { tasks: allTasks },
  });

  const stepFourMethods = useForm<StepFourFormData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      totalBudget: 0,
      costTrackingMethod: "fixed-budget",
      resourceAllocation: "",
    },
  });

  // Destructure methods for each step
  const { trigger: triggerStepOne, watch: watchStepOne } = stepOneMethods;
  const {
    trigger: triggerStepTwo,
    setValue: setValueStepTwo,
    watch: watchStepTwo,
  } = stepTwoMethods;
  const {
    trigger: triggerStepThree,
    setValue: setValueStepThree,
    watch: watchStepThree,
  } = stepThreeMethods;
  const { watch: watchStepFour, trigger: triggerStepFour } = stepFourMethods;

  // Update allFormData whenever the current step or form values change
  useEffect(() => {
    const updateFormData = () => {
      const stepOneData = watchStepOne();
      const stepTwoData = watchStepTwo();
      const stepThreeData = watchStepThree();
      const stepFourData = watchStepFour();

      setAllFormData((prevData) => ({
        ...prevData,
        stepOne: stepOneData,
        stepTwo: stepTwoData,
        stepThree: stepThreeData,
        stepFour: stepFourData,
      }));
    };

    updateFormData();
  }, [currentStep, watchStepOne, watchStepTwo, watchStepThree, watchStepFour]);

  // Log step 4 fields whenever they change
  useEffect(() => {
    const subscription = watchStepFour((value) => {
      console.log("Step 4 fields updated:", value);
    });
    return () => subscription.unsubscribe(); // Cleanup subscription
  }, [watchStepFour]);

  // Update the users in the form state when step 2 is active
  useEffect(() => {
    if (currentStep === 1) {
      setValueStepTwo("users", users);
      triggerStepTwo();
    }
  }, [currentStep, triggerStepTwo, users]);

  // Update the tasks in the form state when step 3 is active
  useEffect(() => {
    if (currentStep === 2) {
      setValueStepThree("tasks", allTasks);
      triggerStepThree();
    }
  }, [currentStep, triggerStepThree, allTasks]);

  // Helper functions for navigation
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep < steps.length - 1;

  // Function to handle the next step
  const handleNext = async () => {
    if (currentStep === 0) {
      const isStepOneValid = await triggerStepOne();
      if (isStepOneValid) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 1) {
      const isStepTwoValid = await triggerStepTwo();
      if (isStepTwoValid) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      const isStepThreeValid = await triggerStepThree();
      if (isStepThreeValid) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 3) {
      const isStepFourValid = await triggerStepFour();
      if (isStepFourValid) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Function to handle the back step
  const handleBack = () => {
    if (currentStep >= 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to return the current step's form methods
  function returnTheCurrentStepMethod() {
    if (currentStep === 0) {
      return stepOneMethods;
    } else if (currentStep === 1) {
      return stepTwoMethods;
    } else if (currentStep === 2) {
      return stepThreeMethods;
    } else if (currentStep === 3) {
      return stepFourMethods;
    }
    return stepThreeMethods; // Fallback (should not happen)
  }

  return (
    <div className="poppins px-20">
      {/* The Stepper */}
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onChangeStep={(index) => setCurrentStep(index)}
      />

      {/* Render the Step Component depending on the current step */}
      <div className="mt-10 mx-28">
        {steps[currentStep].content({
          methods: returnTheCurrentStepMethod(),
          users: currentStep === 1 ? users : undefined,
          setUsers: currentStep === 1 ? setUsers : undefined,
          allTasks: currentStep === 2 ? allTasks : undefined,
          setAllTasks: currentStep === 2 ? setAllTasks : undefined,
          comindedFormData: currentStep === 4 ? allFormData : undefined,
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="mx-28 mt-20 mb-8">
        <div className="flex items-center justify-end gap-4">
          <Button
            disabled={isFirstStep}
            variant={"ghost"}
            className="p-7"
            onClick={handleBack}
          >
            <FaArrowLeft />
            <span>{BUTTON_LABELS.BACK}</span>
          </Button>
          {isLastStep ? (
            <Button className="p-7" onClick={handleNext}>
              {BUTTON_LABELS.NEXT}
            </Button>
          ) : (
            <Button className="p-7" onClick={() => alert("Form submitted!")}>
              {BUTTON_LABELS.SUMBIT}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
