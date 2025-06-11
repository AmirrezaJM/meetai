/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
export default function AgentsViews() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
