import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { llmRouter } from "./llm-providers";
import { generateImage } from "./_core/imageGeneration";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  llm: llmRouter,
  visual: router({
    generateConcept: publicProcedure
      .input(z.object({ prompt: z.string().min(3).max(500) }))
      .mutation(async ({ input }) => {
        const prompt = `Concept art for BELENTANI / JUDAS ERA. Absolute black, blood red neon, antique gold, cosmic artifact, ritual sci-fi, premium album visual, no text, no logos. User direction: ${input.prompt}`;
        return generateImage({ prompt, quality: "medium" });
      }),
  }),
});

export type AppRouter = typeof appRouter;
