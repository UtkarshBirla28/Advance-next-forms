import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Controller, UseFormReturn } from "react-hook-form";
import { IconType } from "react-icons";

import {
  FaChartLine,
  FaCode,
  FaHardHat,
  FaGraduationCap,
  FaHeart,
} from "react-icons/fa";
import { stepOneFormData } from "../schemas/step1-schema";

type Category =
  | "Marketing"
  | "Software Development"
  | "Construction"
  | "Education"
  | "Healthcare";

type SelectedItemType = {
  label: Category;
  icon: IconType;
};

export const selectedItems: SelectedItemType[] = [
  {
    label: "Marketing",
    icon: FaChartLine,
  },
  {
    label: "Software Development",
    icon: FaCode,
  },
  {
    label: "Construction",
    icon: FaHardHat,
  },
  {
    label: "Education",
    icon: FaGraduationCap,
  },
  {
    label: "Healthcare",
    icon: FaHeart,
  },
];

export function ProjectCategory({
  methods,
}: {
  methods: UseFormReturn<stepOneFormData>;
}) {
  const { control } = methods;

  return (
    <div className="h-28">
      <Label htmlFor="projectCategory" className="text-gray-600 mb-2">
        Project Category
      </Label>
      <Controller
        control={control}
        defaultValue="Software Development"
        name="category"
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value: string) => {
              //see if the value prop is in the selctedItems array
              const selectedItem = selectedItems.find(
                (item) => item.label === value
              );

              //if it is the case, update the selectedCategory
              if (selectedItem) {
                field.onChange(selectedItem.label);
              }
            }}
          >
            <SelectTrigger className="h-[52px] mt-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="poppins">
              {selectedItems.map((item) => (
                <SelectItem key={item.label} value={item.label}>
                  <div className="flex items-center gap-2">
                    {/* icon */}
                    <div className="bg-primary/10 size-8 rounded-md flex items-center justify-center">
                      <item.icon className="text-primary/45" />
                    </div>
                    {/* label */}
                    <span> {item.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
