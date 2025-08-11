'use server';

import { z } from 'zod';
import { retrieveGPUInfo } from '@/ai/flows/retrieve-gpu-info';
import { rankAndSelectGPU } from '@/ai/flows/rank-and-select-gpu';

const recommendationSchema = z.object({
  budget: z.coerce.number().positive('Budget must be a positive number.'),
  intendedUses: z.string().min(3, 'Please describe your intended uses.'),
  desiredPerformance: z.enum(['Low', 'Medium', 'High']),
});

export async function getRecommendation(values: z.infer<typeof recommendationSchema>) {
  try {
    const validatedFields = recommendationSchema.safeParse(values);
    if (!validatedFields.success) {
      // Create a more descriptive error message from validation issues
      const errorMessage = validatedFields.error.issues.map(issue => issue.message).join(' ');
      return { error: `Invalid input: ${errorMessage}` };
    }

    const { budget, intendedUses, desiredPerformance } = validatedFields.data;

    const gpuInfoResult = await retrieveGPUInfo({
      budget,
      intendedUses,
      desiredPerformance,
    });

    if (!gpuInfoResult?.gpuInfo) {
      return { error: 'Could not retrieve GPU information from the knowledge base. Please try adjusting your criteria.' };
    }

    const recommendationResult = await rankAndSelectGPU({
      budget,
      intendedUse: intendedUses,
      desiredPerformance,
      availableGpus: [gpuInfoResult.gpuInfo],
    });

    if (!recommendationResult?.recommendedGpu) {
      return { error: 'Could not generate a specific recommendation based on the retrieved information. Please try again.' };
    }

    return {
      success: true,
      data: recommendationResult,
    };
  } catch (error) {
    console.error('Error in getRecommendation action:', error);
    return { error: 'An unexpected server error occurred. Please try again later.' };
  }
}
