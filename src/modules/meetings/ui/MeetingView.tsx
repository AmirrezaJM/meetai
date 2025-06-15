"use client";

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"

export default function MeetingView() {
    const trpc = useTRPC()
    const {data} = useQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <div>
        {JSON.stringify(data?.items)}
    </div>
  )
}
