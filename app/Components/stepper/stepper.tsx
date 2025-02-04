"use client";

import React, { useState } from "react";
import { Step } from "./types";
import { IconType } from "react-icons";

export const Stepper = ({
  steps,
  currentStep,
  onChangeStep, //callback function
}: {
  steps: Step[];
  currentStep: number;
  onChangeStep: (stepIndex: number) => void;
}) => {
  return (
    <div className="flex items-start justify-start p-7 ml-20">
      {/*  */}
      <div className=" border rounded-lg flex justify-center items-center p-2">
        {/* steps array */}
        {steps.map((step, index) => (
          // step wrapper
          <div
            onClick={() => {
              onChangeStep(index);
            }}
            key={index}
            className="flex items-center p-3 gap-2 cursor-pointer "
          >
            {/* Step Indicator */}
            <StepIndicator Icon={step.icon} isActive={currentStep === index} />

            {/* Step Label (only shown for the active step) */}
            {currentStep === index && (
              <StepLabel label={step.label} stepNumber={index + 1} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;

function StepLabel({
  label,
  stepNumber,
}: {
  label: string;
  stepNumber: number;
}) {
  return (
    <div className="flex flex-col  ">
      <span className="text-[13px] font-medium text-primary">
        STEP {stepNumber}
      </span>
      <span className="font-bold">{label}</span>
    </div>
  );
}

function StepIndicator({
  Icon,
  isActive,
}: {
  Icon: IconType;
  isActive: boolean;
}) {
  return (
    <div
      className={`  p-3 rounded-full ${
        isActive ? "bg-primary/10" : "bg-gray-100"
      }`}
    >
      <Icon className={`${isActive ? "text-primary" : "text-gray-400"}`} />
    </div>
  );
}
