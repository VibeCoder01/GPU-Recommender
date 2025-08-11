// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Ranks available GPUs based on user requirements and selects the best match.
 *
 * - rankAndSelectGPU - A function that handles the ranking and selection of GPUs.
 * - RankAndSelectGpuInput - The input type for the rankAndSelectGPU function.
 * - RankAndSelectGpuOutput - The return type for the rankAndSelectGPU function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RankAndSelectGpuInputSchema = z.object({
  budget: z.number().describe('The user\s budget for the GPU.'),
  intendedUse: z.string().describe('The intended use of the GPU (e.g., gaming, video editing, machine learning).'),
  desiredPerformance: z.string().describe('The desired performance level (e.g., high, medium, low).'),
  availableGpus: z.array(z.string()).describe('A list of available GPUs with their specifications and pricing.'),
});
export type RankAndSelectGpuInput = z.infer<typeof RankAndSelectGpuInputSchema>;

const RankAndSelectGpuOutputSchema = z.object({
  recommendedGpu: z.string().describe('The recommended GPU based on the user\s requirements.'),
  reasoning: z.string().describe('The reasoning behind the GPU recommendation.'),
});
export type RankAndSelectGpuOutput = z.infer<typeof RankAndSelectGpuOutputSchema>;

export async function rankAndSelectGPU(input: RankAndSelectGpuInput): Promise<RankAndSelectGpuOutput> {
  return rankAndSelectGpuFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rankAndSelectGpuPrompt',
  input: {schema: RankAndSelectGpuInputSchema},
  output: {schema: RankAndSelectGpuOutputSchema},
  prompt: `You are an expert in recommending GPUs based on user requirements.

Given the user's budget, intended use, desired performance, and a list of available GPUs with their specifications and pricing, rank the GPUs and select the one that best matches the user's needs.

Budget: {{{budget}}}
Intended Use: {{{intendedUse}}}
Desired Performance: {{{desiredPerformance}}}
Available GPUs: {{#each availableGpus}}{{{this}}}\n{{/each}}

Consider price, performance benchmarks, and suitability for the specified use cases.

Provide a recommendation with a clear reasoning.
`,
});

const rankAndSelectGpuFlow = ai.defineFlow(
  {
    name: 'rankAndSelectGpuFlow',
    inputSchema: RankAndSelectGpuInputSchema,
    outputSchema: RankAndSelectGpuOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
