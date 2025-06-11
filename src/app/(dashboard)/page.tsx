import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/view/HomeView";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session) {
    redirect("/sign-in");
  }

  return (
    <HomeView />
);
}
