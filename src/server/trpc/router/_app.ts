// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { journalEntryRouter } from "./journal-entry";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  journalEntry: journalEntryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
