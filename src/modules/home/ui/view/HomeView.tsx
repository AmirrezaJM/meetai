"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export default function HomeView() {
  const {data: session} = authClient.useSession();
  const router = useRouter();

  if(!session) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session?.user.name}</p>
      <button
        className="btn btn-primary"
        onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => {router.push("/sign-in")},
            }
        })}
      >
        Sign Out
      </button>
    </div>
);
}
