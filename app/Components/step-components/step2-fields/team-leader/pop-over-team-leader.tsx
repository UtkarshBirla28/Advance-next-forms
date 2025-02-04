import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { FaPlus, FaUser } from "react-icons/fa";
import { User, UserProps } from "../team-members/team-members";

import { FaCirclePlus } from "react-icons/fa6";
import { Dispatch, SetStateAction } from "react";

import { TbFlagFilled } from "react-icons/tb";

export default function PopOverTeamLeader({ users, setUsers }: UserProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} className=" text-sm ">
          <FaPlus size={"12"} className="text-[10px] text-gray-600" />
          <span>Add Leader</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="poppins w-[330px]">
        <TeamsCommandList users={users} setUsers={setUsers} />
      </PopoverContent>
    </Popover>
  );
}

function TeamsCommandList({ users, setUsers }: UserProps) {
  return (
    <Command>
      <CommandInput placeholder="Search a member..." />
      <CommandList className="mt-2">
        <CommandEmpty>No results found.</CommandEmpty>
        {setUsers && (
          <>
            {users.map((user, index) => (
              <CommandItem key={index}>
                <SingleUser user={user} setUsers={setUsers} />
              </CommandItem>
            ))}
          </>
        )}
      </CommandList>
    </Command>
  );

  function SingleUser({
    user,
  }: {
    user: User;
    setUsers: Dispatch<SetStateAction<User[]>>;
  }) {
    //
    function updateUserLeadrship() {
      setUsers((prevState) =>
        prevState.map((u) => {
          if (u.id === user.id) {
            return { ...u, isLeader: true };
          }
          return { ...u, isLeader: false };
        })
      );
    }

    return (
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 select-none relative   ">
          {/* User avatar/icon */}
          <span className="size-8 bg-primary/15 rounded-full flex items-center justify-center">
            <FaUser className="text-sm text-primary/45" />
          </span>
          {/* User details (name and role) */}
          <div className="flex flex-col items-start">
            {/* User's name */}
            <span className="text-[14px] font-medium">{user.name}</span>
            {/* User's role */}
            <span className="text-slate-500 text-[13px]">{user.role}</span>
          </div>
        </div>

        {/* if the user is not a leader, show to button to add a member as a leader, 
        show the leader icon */}
        <div>
          {!user.isLeader ? (
            <Button
              onClick={() => updateUserLeadrship()}
              variant={"outline"}
              className="text-gray-400"
            >
              <FaCirclePlus />
            </Button>
          ) : (
            <Button variant={"ghost"} disabled={true} className="text-gray-400">
              <TbFlagFilled className="text-slate-400" />
            </Button>
          )}
        </div>
      </div>
    );
  }
}
