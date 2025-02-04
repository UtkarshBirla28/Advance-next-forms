"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { TasksTable } from "./task-table";

import { Table } from "@tanstack/react-table";
import { Task } from "../data/tasks";

const TEXTS = {
  TEXT_BUTTON: "Select Task",
  DIALOG_HEADER: "Manage Tasks",
  DIALOG_DESCRIPTION:
    "Create and manage tasks for your project. Select the tasks to add  to your project",
};

export default function TasksDialog({
  table,
  onAddTask,
  openState,
}: {
  table: Table<Task>;
  onAddTask: () => void;
  openState: { isOpen: boolean; setIsOpen: (open: boolean) => void };
}) {
  return (
    <Dialog open={openState.isOpen} onOpenChange={openState.setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="text-sm mt-4">
          {/* <FaPlus size={"12"} className="text-[10px] text-gray-600" /> */}
          <span>{TEXTS.TEXT_BUTTON}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="poppins max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{TEXTS.DIALOG_HEADER}</DialogTitle>
          <DialogDescription>{TEXTS.DIALOG_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        {/* tasks table */}
        <div>
          <TasksTable table={table} />
        </div>
        {/* dialog footer */}
        <DialogFooter className="">
          <div className="flex items-center gap-6 mt-4 mb-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="h-11">
                Close
              </Button>
            </DialogClose>
            <Button onClick={onAddTask} className="h-11" variant={"default"}>
              Update Task(s)
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
