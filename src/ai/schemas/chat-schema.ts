// src/ai/schemas/chat-schema.ts
import { z } from 'zod';

export const ChatInputSchema = z.object({
  message: z.string(),
  media: z.optional(z.array(z.object({
    url: z.string().describe("A data URI of the media."),
  })))
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  message: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
