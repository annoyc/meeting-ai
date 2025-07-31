import z from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          // TODO: add meeting count logic
          meetingCount: sql<number>`count(*)`,
        })
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select({
        ...getTableColumns(agents),
        // TODO: add meeting count logic
        meetingCount: sql<number>`count(*)`,
      })
      .from(agents);

    return data;
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [data] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();

      return data;
    }),
});
