'use server';
/**
 * @fileOverview A flow that generates exercises for a given topic.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateExercisesInputSchema = z.object({
  topic: z.string().describe('The topic to generate exercises for.'),
});
export type GenerateExercisesInput = z.infer<typeof GenerateExercisesInputSchema>;

export const GenerateExercisesOutputSchema = z.object({
  exercises: z.string().describe('The generated exercises in Markdown format.'),
});
export type GenerateExercisesOutput = z.infer<typeof GenerateExercisesOutputSchema>;

export const generateExercises = ai.defineFlow(
  {
    name: 'generateExercises',
    inputSchema: GenerateExercisesInputSchema,
    outputSchema: GenerateExercisesOutputSchema,
  },
  async (input: GenerateExercisesInput) => {
    const { output } = await ai.generate({
      prompt: `Bạn là một AI tạo bài tập toán học. Hãy tạo 3 bài tập tự luận (kèm đáp án chi tiết) về chủ đề sau. Sử dụng công thức LaTeX.

Chủ đề: ${input.topic}`,
      output: {
        schema: GenerateExercisesOutputSchema,
      },
    });

    return output!;
  }
);
