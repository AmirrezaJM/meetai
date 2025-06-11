/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ResponsiveDialog } from "@/components/reponsive-dialog";
import { Button } from "@/components/ui/button";

export default function AgentsViews() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <ResponsiveDialog
        title="Responsive Test"
        description="Responsive description"
        open 
        onOpenChange={() => {}}
      >
        <Button>Some Action</Button>
      </ResponsiveDialog>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
