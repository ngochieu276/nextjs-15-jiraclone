import { getCurrent } from "@/features/auth/queries";

import { redirect } from "next/navigation";
import WorkspaceIdSettingClientPage from "./client";

const WorkspaceEdSettingPages = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdSettingClientPage />;
};

export default WorkspaceEdSettingPages;
