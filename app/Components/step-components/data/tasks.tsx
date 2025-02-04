"use client";

import { IconType } from "react-icons";
import {
  FaCheckCircle,
  FaCode,
  FaPaintBrush,
  FaRocket
} from "react-icons/fa";

export type TaskStatus = "Not Started" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date; // Updated to Date type
  status: TaskStatus;
  priority: TaskPriority;
  isAdded: boolean;
  icon: IconType; // IconType for React Icons
};

export const tasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create the layout and design for the homepage.",
    dueDate: new Date("2023-12-15"), // Use Date object
    status: "Completed",
    priority: "High",
    isAdded: false,
    icon: FaPaintBrush, // Icon for design-related tasks
  },
  {
    id: "2",
    title: "Develop API Endpoints",
    description: "Build RESTful API endpoints for the backend.",
    dueDate: new Date("2023-12-15"), // Use Date object
    status: "Not Started",
    priority: "Medium",
    isAdded: false,
    icon: FaCode, // Icon for development-related tasks
  },
  {
    id: "3",
    title: "Write Unit Tests",
    description: "Write unit tests for the core functionality.",
    dueDate: new Date("2023-12-18"), // Use Date object
    status: "In Progress",
    priority: "High",
    isAdded: false,
    icon: FaCheckCircle, // Icon for testing-related tasks
  },
  {
    id: "4",
    title: "Deploy to Production",
    description: "Deploy the application to the production server.",
    dueDate: new Date("2023-12-22"), // Use Date object
    status: "Not Started",
    priority: "Medium",
    isAdded: false,
    icon: FaRocket, // Icon for deployment-related tasks
  },
];
