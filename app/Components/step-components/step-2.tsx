"use client";

import { Dispatch, SetStateAction } from "react";

import TeamLeader from "./step2-fields/team-leader/team-leader";
import TeamMembers, { User } from "./step2-fields/team-members/team-members";
import { stepTwoFormData } from "./schemas/step2-schema";
import { UseFormReturn } from "react-hook-form";

type Step2Props = {
  purpose: string;
  subtext: string;
  methods: UseFormReturn<stepTwoFormData>; // Specific to Step 2
  users?: User[];
  setUsers?: Dispatch<SetStateAction<User[]>> | undefined;
};

export default function Step2({
  purpose,
  subtext,
  methods,
  users = [],
  setUsers,
}: Step2Props) {
  return (
    <div className=" ">
      <h3 className="font-bold text-xl">{purpose}</h3>
      <p className="text-sm text-gray-500">{subtext}</p>

      <div className="  mt-5 gap-8">
        <TeamMembers users={users} setUsers={setUsers} methods={methods} />
        <TeamLeader users={users} setUsers={setUsers} methods={methods} />
      </div>
    </div>
  );
}
