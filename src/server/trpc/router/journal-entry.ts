import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const journalEntryRouter = router({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: `Hello  JournalEntry`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.journalEntry.findMany();
  }),
  getById: publicProcedure
  .input(z.string())
  .query(({input, ctx}) => {
    return ctx.prisma.journalEntry.findUnique({
        where: {
            id: input
        }
    })
  }),   
  create: publicProcedure
  .mutation(({ ctx }) => {
    return ctx.prisma.journalEntry.create({
        data: {}
    });
  }),

});