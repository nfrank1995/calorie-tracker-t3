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
  // update: publicProcedure
  // .input(z.object({
  //   id: z.string(),
  //   weight: z.number(),
  //   meals: z.array(z.object({}),
  //   )
  // }))
  // .mutation(({ input, ctx }) => {
  //   const { id, ...rest} = input;
  //   return ctx.prisma.journalEntry.update({
  //       where: {id},
  //       data: {rest}
  //   });
  // }),   
  deleteWithId: publicProcedure
  .input(z.object({
    id: z.string(),
  }))
  .mutation(({ input, ctx }) => {
    const {id, ...rest} = input;
    return ctx.prisma.journalEntry.delete({
      where: {id}
    });
  }),

});