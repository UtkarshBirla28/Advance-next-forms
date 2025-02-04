import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { FaUser } from "react-icons/fa";
import { User } from "../team-members/team-members";
import PopOverTeamLeader from "./pop-over-team-leader";
import { UseFormReturn } from "react-hook-form";
import { stepTwoFormData } from "../../schemas/step2-schema";
export default function TeamLeader({
  users,
  setUsers,
  methods
}: {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>> | undefined;
  methods: UseFormReturn<stepTwoFormData>;
}) {
  const teamLeader = users.find((user) => user.isLeader);
  return (
    <div className="mt-[66px] w-1/2">
      <div className="flex flex-col gap-1">
        <Label htmlFor="clientName" className="text-gray-600">
          Team Leader
        </Label>
        <span className="text-[13px] text-gray-400">
          Please choose a leader for the team
        </span>
      </div>

      <div className="border p-3 w-full rounded-lg mt-4 flex justify-between items-center">
        <div>
          {teamLeader ? (
            <SingleUser user={teamLeader} />
          ) : (
            <span className="text-slate-500 text-sm">
              PLease add a leader to this project...
            </span>
          )}
        </div>

        <PopOverTeamLeader users={users} setUsers={setUsers} methods={methods} />
      </div>
    </div>
  );
}

function SingleUser({ user }: { user: User }) {
  return (
    <div className="p-2 border rounded-lg  px-7 flex items-center gap-2 select-none relative">
      {/* User avatar/icon */}
      <span className="size-8 bg-primary/15 rounded-full flex items-center justify-center">
        <FaUser className="text-sm text-primary/45" />
      </span>

      {/* User details (name and role) */}
      <div className="flex flex-col">
        {/* User's name */}
        <span className="text-[14px] font-medium">{user.name}</span>
        {/* User's role */}
        <span className="text-slate-500 text-[13px]">{user.role}</span>
      </div>
      {/* close icon */}
    </div>
  );
}
