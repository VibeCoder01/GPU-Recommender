'use server';

/**
 * @fileOverview A GPU information retrieval AI agent.
 *
 * - retrieveGPUInfo - A function that retrieves information about GPUs based on user requirements.
 * - RetrieveGPUInfoInput - The input type for the retrieveGPUInfo function.
 * - RetrieveGPUInfoOutput - The return type for the retrieveGPUInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RetrieveGPUInfoInputSchema = z.object({
  budget: z.number().describe('The budget for the GPU in USD.'),
  intendedUses: z.string().describe('The intended uses for the GPU (e.g., gaming, video editing).'),
  desiredPerformance: z.string().describe('The desired performance level (e.g., high, medium, low).'),
});
export type RetrieveGPUInfoInput = z.infer<typeof RetrieveGPUInfoInputSchema>;

const RetrieveGPUInfoOutputSchema = z.object({
  gpuInfo: z.string().describe('Information about available GPUs that match the user criteria.'),
});
export type RetrieveGPUInfoOutput = z.infer<typeof RetrieveGPUInfoOutputSchema>;

export async function retrieveGPUInfo(input: RetrieveGPUInfoInput): Promise<RetrieveGPUInfoOutput> {
  return retrieveGPUInfoFlow(input);
}

const retrieveGPUInfoPrompt = ai.definePrompt({
  name: 'retrieveGPUInfoPrompt',
  input: {schema: RetrieveGPUInfoInputSchema},
  output: {schema: RetrieveGPUInfoOutputSchema},
  prompt: `You are a helpful assistant that retrieves information about GPUs based on user requirements.

  The user will provide their budget, intended uses, and desired performance level.
  You will use this information to search for available GPUs that match the criteria.

  Budget: {{{budget}}}
  Intended Uses: {{{intendedUses}}}
  Desired Performance: {{{desiredPerformance}}}

  Provide detailed information about the available GPUs, including key specifications, pricing, and links to purchase.
`,
});

const retrieveGPUInfoFlow = ai.defineFlow(
  {
    name: 'retrieveGPUInfoFlow',
    inputSchema: RetrieveGPUInfoInputSchema,
    outputSchema: RetrieveGPUInfoOutputSchema,
  },
  async input => {
    const {output} = await retrieveGPUInfoPrompt(input);
    return output!;
  }
);
