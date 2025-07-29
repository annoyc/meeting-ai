import { auth } from "@/lib/auth";
import { HomeView } from "../modules/home/ui/views/home-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "../modules/dashboard/ui/components/dashboard-sidebar";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  return <DashboardSidebar />;
};

export default Page;
