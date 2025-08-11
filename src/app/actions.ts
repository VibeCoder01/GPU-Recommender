'use server';

import { z } from 'zod';
import { gpuData } from '@/lib/gpu-data';

export type Gpu = typeof gpuData[0] & {
  _price?: number;
  _score?: number;
  _live?: LivePrice | null;
  _why?: string;
};

export type LivePrice = {
  price: number;
  source: string;
};

type LivePricingConfig = {
    useLive: boolean;
    liveBase: string;
}

const recommendationSchema = z.object({
  useCase: z.enum(["gaming", "creator", "ai"]),
  resolution: z.coerce.number(),
  budget: z.coerce.number(),
  vram: z.coerce.number(),
  brand: z.enum(["any", "NVIDIA", "AMD"]),
});

// A placeholder for fetching live prices. In a real app, this would make a network request.
async function fetchLiveFor(gpu: Gpu, config: LivePricingConfig): Promise<LivePrice | null> {
    if (!config.useLive || !config.liveBase) return null;
    const urls = (gpu.retailers||[]).map(r=>r.url).filter(Boolean);
    if (!urls.length) return null;
    // In a real app, you'd fetch this from your Cloudflare worker.
    // For now, we'll simulate a delay and return null.
    await new Promise(resolve => setTimeout(resolve, 50));
    return null; 
}


function scoreGpu(g: Gpu, values: z.infer<typeof recommendationSchema>){
    const { useCase, resolution, vram, budget, brand } = values;

    if(brand !=="any" && g.brand!==brand) return -1;
    if(g.vram_gb < vram) return -1;
    if((g._price ?? g.price_from) > budget) return -1;

    let s = 0;
    let why = [];

    s += Math.min(g.vram_gb/2, 15); // VRAM weight
    why.push(`${g.vram_gb}GB VRAM`);

    s += Math.min(g.bus_bit/32, 12); // bandwidth proxy

    const resMap: {[key: number]: number} = {1080:1,1440:2,2160:3};
    const tier = (g.vram_gb>=24?3:(g.vram_gb>=16?2:(g.vram_gb>=12?2:1))) + (g.bus_bit>=256?1:0);
    const want = resMap[resolution];
    if(tier>=want) { s+=10; } else { s-=5; }

    if(useCase==='gaming'){
      s += Math.max(0, 6 - (g.tgp_w||200)/75);
    } else if(useCase==='creator'){
      s += (g.vram_gb>=16?10:0) + (g.bus_bit>=256?4:0);
    } else if(useCase==='ai'){
      s += (g.brand==='NVIDIA'?12:-6) + (g.vram_gb>=24?8:(g.vram_gb>=16?4:0));
    }

    s += Math.max(0, 12 - ((g._price ?? g.price_from) / 150));

    g._why = why.join(', ');
    return Math.round(s);
  }

export async function getRecommendation(values: Omit<z.infer<typeof recommendationSchema>, 'resolution' | 'vram'> & { resolution: string, vram: string}, liveConfig?: LivePricingConfig) {
  try {
    const validatedFields = recommendationSchema.safeParse(values);
    if (!validatedFields.success) {
      const errorMessage = validatedFields.error.issues.map(issue => issue.message).join(' ');
      return { error: `Invalid input: ${errorMessage}` };
    }
    
    const data: Gpu[] = JSON.parse(JSON.stringify(gpuData));

    if (liveConfig?.useLive && liveConfig.liveBase) {
      const tasks = data.map(async g => {
        const live = await fetchLiveFor(g, liveConfig);
        if (live && typeof live.price === 'number' && isFinite(live.price)) {
          g._live = live;
          g._price = live.price;
        }
      });
      await Promise.allSettled(tasks);
    }
    
    data.forEach(g => {
        g._price = g._price ?? g.price_from;
        g._score = scoreGpu(g, validatedFields.data)
    });

    const sorted = data.filter(g => (g._score ?? -1) >= 0).sort((a, b) => (b._score ?? 0) - (a._score ?? 0) || (a._price ?? 0) - (b._price ?? 0));

    return {
      success: true,
      data: sorted,
    };
  } catch (error) {
    console.error('Error in getRecommendation action:', error);
    return { error: 'An unexpected server error occurred. Please try again later.' };
  }
}
