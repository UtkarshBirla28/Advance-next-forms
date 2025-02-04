"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Controller, UseFormReturn } from "react-hook-form";
import { stepOneFormData } from "../schemas/step1-schema";

function getNextDay() {
  // Step 1: Find out what today's date is
  const today = new Date(); // "today" is like looking at a calendar and seeing today's date

  // Step 2: Make a copy of today's date so we can change it
  const nextDay = new Date(today); // "nextDay" is like taking a photo of today's date so we can edit it

  // Step 3: Add 1 day to today's date to get tomorrow's date
  nextDay.setDate(today.getDate() + 1);

  nextDay.setHours(0, 0, 0, 0);

  return nextDay;
}

export default function ProjectEndDate({
  methods,
}: {
  methods: UseFormReturn<stepOneFormData>;
}) {
  // State to manage the selected start date
  // const [startDate, setStartDate] = useState<Date | undefined>(getNextDay());

  const { control } = methods;

  //function to disable the older dates in comparaison to the current date
  const isDateDisabled = (date: Date) => {
    const nextDay = getNextDay();
    return date < nextDay; // Disable dates before today
  };

  // //function to handle the date selection
  // function handleSelectedDate(date: Date | undefined) {
  //   // Only update the startDate if a valid date is selected
  //   if (date) {
  //     setStartDate(date);
  //   }
  //   // If date is undefined (user tries to unselect), do nothing
  // }

  return (
    <div className="">
      <Label className="text-gray-600 mb-6">Target Date</Label>
      <Controller
        control={control}
        defaultValue={getNextDay()}
        name="endDate"
        render={({ field }) => {
          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-12 mt-1"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 poppins">
                <Calendar
                  className="w-full"
                  mode="single"
                  selected={field.value}
                  disabled={isDateDisabled}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}
