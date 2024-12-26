/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Link from "next/link";
import { RiAddCircleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useCreateProjectModal from "@/features/projects/hooks/use-create-project-modal";
import ProjectAvatar from "@/features/projects/components/project-avatar";

const Projects = () => {
  // const projectId = null;

  const pathName = usePathname();
  const { open } = useCreateProjectModal();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className=" text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          className=" size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          onClick={open}
        />
      </div>
      {data?.documents?.map((project: any) => {
        const href = `/workspaces/${workspaceId}/projects/${project?.$id}`;
        const isActive = pathName === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              {project.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
