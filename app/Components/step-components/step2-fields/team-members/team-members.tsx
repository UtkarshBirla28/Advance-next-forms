import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { FaFlag, FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import MemberDialog from "./members-dialog";
import { Dispatch, SetStateAction } from "react";

import { UseFormReturn } from "react-hook-form";
import { stepTwoFormData } from "../../schemas/step2-schema";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Member" | "Viewer";
  isAdded: boolean;
  isLeader: boolean;
};

export interface UserProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>> | undefined;
  methods: UseFormReturn<stepTwoFormData>;
}

export default function TeamMembers({ users, setUsers, methods }: UserProps) {
  const {
    formState: { errors },
  } = methods;

  return (
    <div className="mb-6 mt-16">
      {/* Label for the Team Members section */}
      <Label htmlFor="projectName" className="text-gray-600">
        Team Members
      </Label>

      {/* Container for displaying the list of team members */}
      <div className="p-3 rounded-lg border flex flex-wrap gap-3">
        {/* if the all the isadded propreties are false then show the span tag below */}
        {users.every((User) => User.isAdded === false) === true && (
          <div className="h-8 flex justify-center text-slate-600   items-center">
            <span className=" text-sm italic">
              Please add a member to the project...
            </span>
          </div>
        )}
        {/* Map through the users array and render a SingleUser component for each user */}
        {setUsers && (
          <>
            {users
              .filter((user) => user.isAdded)
              .map((user, index) => (
                <SingleUser user={user} setUsers={setUsers} key={index} />
              ))}
          </>
        )}
      </div>
      {/* member dialog */}
      <div className="flex justify-between">
        {/* Error message section (currently hardcoded, replace with dynamic error handling) */}

        {errors.users && (
          <div className="text-red-500 text-sm flex items-center gap-2 mt-2">
            <MdError />
            <span>{errors.users.message}</span>
          </div>
        )}

        {setUsers && (
          <>
            <MemberDialog users={users} setUsers={setUsers} />
          </>
        )}
      </div>
    </div>
  );
}

function SingleUser({
  user,
  setUsers,
}: {
  user: User;
  setUsers: Dispatch<SetStateAction<User[]>>;
}) {
  function addOrRemoveUser(userArg: User) {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (userArg.id === user.id) {
          return { ...user, isAdded: !user.isAdded };
        }

        return user;
      })
    );
  }
  return (
    <div className="p-2 border rounded-lg pl-5 pr-10 flex items-center gap-2 select-none relative">
      {/* User avatar/icon */}
      <span className="size-8 bg-primary/15 rounded-full flex items-center justify-center">
        <FaUser className="text-sm text-primary/45" />
      </span>

      {/* User details (name and role) */}
      <div className="flex items-start gap-3  ">
        <div className="flex flex-col">
          {/* User's name */}
          <span className="text-[14px] font-medium">{user.name}</span>
          {/* User's role */}
          <span className="text-slate-500 text-[13px]">{user.role}</span>
        </div>
        {user.isLeader && (
          <FaFlag size={12} className="text-sm mt-1 text-red-500" />
        )}
      </div>

      {/* close icon */}
      <IoIosClose
        onClick={() => addOrRemoveUser(user)}
        className="absolute text-[18px] top-[6px] right-1 cursor-pointer text-slate-500"
      />
    </div>
  );
}
