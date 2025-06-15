import { db } from "@/db";
import { z } from "zod";
import { meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
// import { agentsInsertSchema } from "../";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const meetingRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingMeeting] = await db
        .select({
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(eq(meetings.id, input.id));
      if (!existingMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting is not found",
        });
      }
      return existingMeeting;
    }),
  getMany: protectedProcedure
    .input(
      z
        .object({
          page: z.number().default(1),
          pageSize: z.number().min(1).max(100).default(10),
          search: z.string().nullish(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
        const { page = 1, pageSize = 10, search = undefined } = input ?? {};
      
        const data = await db
          .select({
            ...getTableColumns(meetings),
          })
          .from(meetings)
          .where(
            and(
              eq(meetings.userId, ctx.auth.user.id),
              search ? ilike(meetings.name, `%${search}%`) : undefined
            )
          )
          .orderBy(desc(meetings.createdAt), desc(meetings.id))
          .limit(pageSize)
          .offset((page - 1) * pageSize);
      
        const [total] = await db
          .select({ count: count() })
          .from(meetings)
          .where(
            and(
              eq(meetings.userId, ctx.auth.user.id),
              search ? ilike(meetings.name, `%${search}%`) : undefined
            )
          );
      
        const totalPages = Math.ceil(total.count / pageSize);
      
        return {
          items: data,
          total: total.count,
          totalPages,
        };
      })
});
