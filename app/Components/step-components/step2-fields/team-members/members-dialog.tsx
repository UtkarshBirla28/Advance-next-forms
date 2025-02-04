import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { User } from "./team-members";

//
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dispatch, SetStateAction, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { TbFlag2Filled } from "react-icons/tb";
import { rolesArray } from "../step2-data";

export default function MemberDialog({
  users,
  setUsers,
}: {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}) {
  // state
  const alreadyAddedUsers = users.filter((user) => user.isAdded === true);
  const notAddedUsers = users.filter((user) => user.isAdded === false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className=" text-sm mt-4 ">
          <FaPlus size={"12"} className="text-[10px] text-gray-600" />
          <span>Add Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="poppins">
        <DialogHeader>
          <DialogTitle className="text-[22px]">Manage Team Members</DialogTitle>
          <DialogDescription>
            Add new or remove existing members to this project
          </DialogDescription>
        </DialogHeader>

        {/* users list */}
        <div className="mt-4">
          <Command>
            <CommandInput placeholder="Search adn add team members..." />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList className="mt-6">
              {alreadyAddedUsers.length > 0 && (
                <CommandGroup heading="Already Added Members">
                  {alreadyAddedUsers.map((user, index) => (
                    <CommandItem key={index}>
                      <UserItem user={user} setUsers={setUsers} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {notAddedUsers.length > 0 && (
                <CommandGroup heading="All Members">
                  {notAddedUsers.map((user) => (
                    <CommandItem key={user.id}>
                      {/* call user item component, and pass in it the user object */}
                      <UserItem user={user} setUsers={setUsers} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UserItem({
  user,
  setUsers,
}: {
  user: User;
  setUsers: Dispatch<SetStateAction<User[]>>;
}) {
  // function to update the isAdded proprety
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
    <div className="flex justify-between items-center w-full">
      {/* avatar + name + role */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {/* avatar icon */}
          <div className="size-8 bg-primary/25 rounded-full flex items-center justify-center text-primary/35">
            <FaUser className="text-sm" />
          </div>

          {/* name and role */}
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
            <span className="text-slate-500">{user.role}</span>
          </div>
        </div>
        {/* if the user is a leader show the flag icon */}
        {user.isLeader && <TbFlag2Filled className="text-slate-400" />}
      </div>

      <div className="flex items-center gap-2">
        {/* call the role drop down component */}
        <RolesDropDown user={user} />
        {/*  */}
        {/* show the add and remove user buttons */}
        <div>
          {user.isAdded ? (
            <Button
              onClick={() => addOrRemoveUser(user)}
              variant={"outline"}
              className="text-red-500"
            >
              <IoPersonRemoveSharp />
            </Button>
          ) : (
            <Button
              onClick={() => addOrRemoveUser(user)}
              variant={"outline"}
              className="text-primary"
            >
              <IoMdPersonAdd />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

//role drop down
function RolesDropDown({ user }: { user: User }) {
  const [roles] = useState(() => {
    return rolesArray.map((role) =>
      role.name === user.role
        ? { ...role, isChecked: true }
        : { ...role, isChecked: false }
    );
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {user.role}
          <IoIosArrowDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 poppins">
        {roles.map((role, index) => (
          <DropdownMenuCheckboxItem
            className={`${role.isChecked ? "font-bold" : "text-slate-700"
              } h-10`}
            key={index}
            checked={role.isChecked}
          // onCheckedChange={setShowStatusBar}
          >
            {role.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
