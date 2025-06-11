import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import AgentsViews from "@/modules/agents/ui/views/agents-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading agents"
            description="this may take a few seconds..."
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Error Agents"
              description="please try again later!"
            />
          }
        >
          <AgentsViews />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
