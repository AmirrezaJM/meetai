import { auth } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/view/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }

  return <SignInView />;
}
