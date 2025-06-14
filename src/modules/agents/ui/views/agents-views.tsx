/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";
export default function AgentsViews() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({pageSize:3}));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} />
      <h1>Hello </h1>
      {data.items.length === 0 && (
        <EmptyState 
          title="Create your first agent"
          description="Create an agent to jin your meetings. Each agent will follow your instructions and can interact with participant during the call."
        />
      )}
    </div>
  );
}
