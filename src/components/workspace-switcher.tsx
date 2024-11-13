"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { RiAddCircleFill } from "react-icons/ri";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import WorkspaceAvatar from "@/features/workspaces/components/workspace-avatar";

const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspaces();

  return (
    <div className=" flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className=" text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className=" size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent className=" bg-white">
          {workspaces?.documents.map((workspace) => {
            return (
              <SelectItem key={workspace.$id} value={workspace.$id}>
                <div className=" flex justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />
                  <span className=" truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
