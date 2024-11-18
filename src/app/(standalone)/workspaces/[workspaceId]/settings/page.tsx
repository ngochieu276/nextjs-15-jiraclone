import { getCurrent } from "@/features/auth/queries";
import { getWorkSpace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceEdSettingPagesProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceEdSettingPages = async ({
  params,
}: WorkspaceEdSettingPagesProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkSpace({ workspaceId: params.workspaceId });

  if (!initialValues) {
    redirect(`/workspaces/${params.workspaceId}`);
  }

  return (
    <div className=" w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceEdSettingPages;
