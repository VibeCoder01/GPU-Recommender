import { config } from 'dotenv';
config();

import '@/ai/flows/retrieve-gpu-info.ts';
import '@/ai/flows/rank-and-select-gpu.ts';