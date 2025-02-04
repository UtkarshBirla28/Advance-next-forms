import { User } from "./team-members/team-members";

export const usersArray: User[] = [
  {
    id: "1",
    name: "Sofia Davis",
    email: "m@example.com",
    role: "Owner",
    isAdded: true,
    isLeader: true,
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "p@example.com",
    role: "Member",
    isAdded: false,
    isLeader: false,
  },
  {
    id: "3",
    name: "John Doe",
    email: "p@example.com",
    role: "Viewer",
    isAdded: false,
    isLeader: false,
  },
];

export const rolesArray = [
  { name: "Owner", isChecked: false },
  { name: "Member", isChecked: false },
  { name: "Viewer", isChecked: false },
];
