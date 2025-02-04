"use client";

import { Label } from "@/components/ui/label";

import { MdError } from "react-icons/md";

import TasksDialog from "./step3-fields/tasks-dialog";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { tasksColumns } from "./step3-fields/tasks-columns";
import { IoClose } from "react-icons/io5";
import { UseFormReturn } from "react-hook-form";
import { stepThreeFormData } from "./schemas/step3-schema";
import { Task } from "./data/tasks";

type Step3Props = {
  purpose: string;
  subtext: string;
  allTasks?: Task[];
  setAllTasks?: Dispatch<SetStateAction<Task[]>> | undefined;
  methods: UseFormReturn<stepThreeFormData>; // Specific to Step 2
};

export default function Step3({
  purpose,
  subtext,
  allTasks = [],
  setAllTasks,
  methods,
}: Step3Props) {
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const {
    formState: { errors },
  } = methods;

  // Memoize added tasks to avoid recalculating on every render
  const addedTasks = useMemo(
    () => allTasks.filter((task) => task.isAdded),
    [allTasks]
  );

  console.log(allTasks);

  // Use TanStack Table's useReactTable hook
  const table = useReactTable({
    data: allTasks,
    columns: tasksColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  // Convert rowSelection into an array of selected tasks
  const selectedTasks = Object.keys(rowSelection)
    .map(Number)
    .map((index) => allTasks[index])
    .filter(Boolean); // Filter out undefined values

  // Update isAdded based on rowSelection when the user clicks "Add Task"
  function onClickedAddBtn() {
    if (setAllTasks) {
      setAllTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          isAdded: selectedTasks.some((selected) => selected.id === task.id),
        }))
      );
    }

    setIsOpen(false);
  }

  function handleDeleteClickedTask(taskProp: Task) {
    //update the isAdded property based on the id property
    const updtaedTasks = allTasks.map((task) => {
      if (task.id === taskProp.id) {
        return { ...task, isAdded: false };
      }

      return task;
    });

    //create a copy of the rowSelection
    const updateRowSelection = { ...rowSelection };
    //extract the task index
    const taskIndex = allTasks.findIndex((task) => task.id === taskProp.id);

    if (setAllTasks) {
      //update the all tasks state and the row selection state
      setAllTasks(updtaedTasks);

      if (taskIndex !== -1) {
        //delete the index key from the updateRowSelection
        delete updateRowSelection[taskIndex];
        //set the update
        setRowSelection(updateRowSelection);
      }
      //
    }
  }

  return (
    <div className=" ">
      <h3 className="font-bold text-xl">{purpose}</h3>
      <p className="text-sm text-gray-500">{subtext}</p>

      <div className="mb-36 mt-20">
        <div className="flex flex-col">
          <Label htmlFor="tasks" className="text-gray-600 text-[14px]">
            Tasks
          </Label>
          <span className="text-gray-600 text-[12px]">
            Choose the tasks to add in the project
          </span>
        </div>

        <div className="border p-3 rounded-lg flex flex-wrap gap-3 mt-7">
          {addedTasks.length === 0 && (
            <div className="h-7 flex items-center">
              <span className="text-gray-500 text-sm ">
                Select a task to add to this project...
              </span>
            </div>
          )}
          {addedTasks.map((task) => (
            <AddedTask
              key={task.id}
              task={task}
              onDeleteTaskBtn={handleDeleteClickedTask}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          {errors.tasks && (
            <div className="text-red-500 text-sm mt-1 flex items-center gap-2">
              <MdError />
              <span>{errors.tasks.message}</span>
            </div>
          )}

          <TasksDialog
            table={table}
            onAddTask={onClickedAddBtn}
            openState={{ isOpen, setIsOpen }}
          />
        </div>
      </div>
    </div>
  );
}

function AddedTask({
  task,
  onDeleteTaskBtn,
}: {
  task: Task;
  onDeleteTaskBtn: (task: Task) => void;
}) {
  return (
    <div className="border p-3 rounded-md relative pr-8">
      <div className="flex items-center gap-2">
        <div className="size-8 bg-primary/25 rounded-md text-primary/45 flex items-center justify-center">
          <task.icon className="text-sm" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{task.title}</span>
          <span className="text-[13px] text-gray-500">{task.priority}</span>
        </div>
      </div>
      <IoClose
        onClick={() => onDeleteTaskBtn(task)}
        className="absolute top-2 right-1 text-sm text-gray-500 cursor-pointer"
      />
    </div>
  );
}
