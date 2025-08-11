"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getRecommendation, Gpu, LivePrice } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { gpuData, sources, quickChips, LAST_CHECKED } from "@/lib/gpu-data";

const formSchema = z.object({
  useCase: z.enum(["gaming", "creator", "ai"]),
  budget: z.coerce.number().min(100),
  vram: z.enum(["0", "8", "12", "16", "20", "24"]),
  brand: z.enum(["any", "NVIDIA", "AMD"]),
});

type FormData = z.infer<typeof formSchema>;

function formatTimestamp(isoString?: string) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<Gpu[]>([]);
  const [useLive, setUseLive] = useState(false);
  const [lastCheckedTimestamp, setLastCheckedTimestamp] = useState<string | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    setUseLive(localStorage.getItem('gpu_use_live') === '1');
    onSubmit(form.getValues());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useCase: "gaming",
      budget: 900,
      vram: "0",
      brand: "any",
    },
  });

  function onSubmit(values: FormData) {
    startTransition(async () => {
      const recommendations = await getRecommendation(values, { useLive });
      if (recommendations.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: recommendations.error,
        });
      } else if (recommendations.data) {
        setResults(recommendations.data);
        setLastCheckedTimestamp(recommendations.lastChecked);
      }
    });
  }

  const handleQuickChip = (setter: () => Partial<FormData>) => {
    const newValues = setter();
    form.reset({ ...form.getValues(), ...newValues });
    onSubmit({ ...form.getValues(), ...newValues });
  };
  
  const handleReset = () => {
    form.reset({
      useCase: "gaming",
      budget: 900,
      vram: "0",
      brand: "any",
    });
    onSubmit({
      useCase: "gaming",
      budget: 900,
      vram: "0",
      brand: "any",
    });
  };

  const handleUseLiveChange = (checked: boolean) => {
    setUseLive(checked);
    localStorage.setItem('gpu_use_live', checked ? '1' : '0');
    onSubmit(form.getValues());
  }

  const getScoreBadge = (score: number = 0) => {
    if(score>=26) return {className:'good', text:'Great fit'};
    if(score>=20) return {className:'ok', text:'Good fit'};
    if(score>=14) return {className:'warn', text:'Fair fit'};
    return {className:'bad', text:'Poor fit'};
  }

  const liveDotColor = useLive ? '#2fd36b' : '#444';
  const liveLabelText = useLive ? 'live pricing enabled' : 'offline pricing';

  const headerLastChecked = useLive
    ? (lastCheckedTimestamp ? `Live prices from ${formatTimestamp(lastCheckedTimestamp)}` : 'Fetching live prices...')
    : `Prices from ${LAST_CHECKED}`;


  return (
    <>
      <header className="sticky top-0 z-10 bg-background/75 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold tracking-wide flex items-center gap-4">
            GPU Recommender (UK)
            <Badge variant="secondary" className="text-xs font-normal">{headerLastChecked}</Badge>
          </h1>
          <p className="text-xs text-muted-foreground">
            Specs are embedded from UK retailer pages. Optional live pricing via the server. Data stays auditable.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Your requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onChange={() => onSubmit(form.getValues())} className="space-y-4">
                <div className="space-y-4 border border-border rounded-lg p-4">
                  <FormField
                    control={form.control}
                    name="useCase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Primary use</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="gaming">Gaming</SelectItem>
                            <SelectItem value="creator">Content creation / video</SelectItem>
                            <SelectItem value="ai">AI / ML (CUDA-heavy)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="budget" render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-xs">Budget (max, £)</FormLabel>
                              <FormControl><Input type="number" step="10" {...field} /></FormControl>
                          </FormItem>
                      )}/>
                      <FormField control={form.control} name="brand" render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-xs">Brand preference</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                  <SelectContent>
                                      <SelectItem value="any">Either / any</SelectItem>
                                      <SelectItem value="NVIDIA">NVIDIA</SelectItem>
                                      <SelectItem value="AMD">AMD</SelectItem>
                                  </SelectContent>
                              </Select>
                          </FormItem>
                      )}/>
                  </div>
                  <div className="text-xs text-muted-foreground -mt-2 col-span-2">We compare against a conservative “from £” price from UK listings (or your live price if enabled).</div>


                  <div className="grid grid-cols-1 gap-4">
                      <FormField control={form.control} name="vram" render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-xs">Min VRAM (GB)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                  <SelectContent>
                                      <SelectItem value="0">No minimum</SelectItem>
                                      <SelectItem value="8">8</SelectItem>
                                      <SelectItem value="12">12</SelectItem>
                                      <SelectItem value="16">16</SelectItem>
                                      <SelectItem value="20">20</SelectItem>
                                      <SelectItem value="24">24</SelectItem>
                                  </SelectContent>
                              </Select>
                          </FormItem>
                      )}/>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                    {quickChips.map(chip => (
                      <button key={chip.label} type="button" onClick={() => handleQuickChip(chip.set)} className="text-xs inline-flex items-center gap-2 bg-muted hover:bg-muted/80 border border-transparent rounded-full px-3 py-1.5">
                         <span className="block w-2 h-2 rounded-full bg-accent"></span>
                         {chip.label}
                      </button>
                    ))}
                </div>

                <div className="flex gap-2 pt-2">
                    <Button type="button" onClick={() => onSubmit(form.getValues())} className="bg-primary hover:bg-primary/90 flex-1">Recommend</Button>
                    <Button type="button" onClick={handleReset} variant="ghost" className="flex-1">Reset</Button>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="useLive" checked={useLive} onCheckedChange={(checked) => handleUseLiveChange(Boolean(checked))} />
                      <label htmlFor="useLive" className="text-sm">Use live prices when available</label>
                    </div>
                </div>
                 <p className="text-xs text-muted-foreground">Live prices are scraped from retailer sites on the server. This may be slow.</p>

              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-lg">Results</CardTitle>
              <Badge variant="secondary" className="flex items-center gap-2 text-xs font-normal">
                {isPending ? <Skeleton className="w-16 h-4" /> : `${results.length} match${results.length !== 1 ? 'es':''}`}
                <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: liveDotColor }}></span>
                <span className="text-muted-foreground">{liveLabelText}</span>
              </Badge>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-separate" style={{ borderSpacing: '0 8px' }}>
                        <thead>
                            <tr>
                                <th className="text-left text-xs uppercase opacity-80 p-2">Model</th>
                                <th className="text-left text-xs uppercase opacity-80 p-2">VRAM</th>
                                <th className="text-left text-xs uppercase opacity-80 p-2">Bus</th>
                                <th className="text-left text-xs uppercase opacity-80 p-2">Power</th>
                                <th className="text-left text-xs uppercase opacity-80 p-2">Price</th>
                                <th className="text-left text-xs uppercase opacity-80 p-2">Fit score</th>
                                <th className="text-left text-xs uppercase opacity-80 p-2">Notes</th>
                                <th className="text-left text-xs uppercase opacity-80 p-2">Links</th>
                            </tr>
                        </thead>
                        <tbody>
                          {isPending ? (
                            Array.from({length: 5}).map((_, i) => (
                               <tr key={i} className="bg-muted/20">
                                <td className="p-2 rounded-l-lg"><Skeleton className="h-5 w-32" /></td>
                                <td className="p-2"><Skeleton className="h-5 w-12" /></td>
                                <td className="p-2"><Skeleton className="h-5 w-12" /></td>
                                <td className="p-2"><Skeleton className="h-5 w-12" /></td>
                                <td className="p-2"><Skeleton className="h-5 w-16" /></td>
                                <td className="p-2"><Skeleton className="h-5 w-20" /></td>
                                <td className="p-2"><Skeleton className="h-5 w-24" /></td>
                                <td className="p-2 rounded-r-lg"><Skeleton className="h-5 w-24" /></td>
                               </tr>
                            ))
                          ) : (
                            results.map(gpu => {
                                const scoreInfo = getScoreBadge(gpu._score);
                                return (
                                <tr key={gpu.model} className="bg-muted/20 text-sm">
                                    <td className="p-2 font-bold rounded-l-lg">
                                      <div>{gpu.brand} {gpu.model}</div>
                                      <Badge variant="outline" className="text-xs mt-1">{gpu.mem_type}</Badge>
                                    </td>
                                    <td className="p-2">{gpu.vram_gb} GB</td>
                                    <td className="p-2">{gpu.bus_bit}-bit</td>
                                    <td className="p-2">{gpu.tgp_w ? `${gpu.tgp_w} W` : '—'}</td>
                                    <td className="p-2">
                                        £{gpu._price?.toFixed(2)}
                                        {gpu._live ? 
                                          <div className="text-xs text-muted-foreground">from <a href={gpu._live.source} target="_blank" rel="noopener" className="text-blue-400 hover:underline">live source</a></div>
                                          : <div className="text-xs text-muted-foreground">embedded baseline</div>
                                        }
                                    </td>
                                    <td className={`p-2 font-bold ${scoreInfo.className}`}>
                                        {gpu._score} <Badge variant="outline" className="text-xs">{scoreInfo.text}</Badge>
                                    </td>
                                    <td className="p-2 text-xs text-muted-foreground">{gpu.notes}</td>
                                    <td className="p-2 text-xs rounded-r-lg">
                                        {(gpu.retailers || []).slice(0, 2).map(r => (
                                            <a key={r.name} href={r.url} target="_blank" rel="noopener" className="text-blue-400 hover:underline block">{r.name}</a>
                                        ))}
                                    </td>
                                </tr>
                                )
                            })
                          )}
                        </tbody>
                    </table>
                </div>

                 <Accordion type="single" collapsible defaultValue="item-1" className="w-full mt-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-base">Data provenance — UK retailer pages used</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-2 pt-2">
                                {sources.map(s => (
                                    <div key={s.title} className="bg-muted/30 p-2 rounded-md">
                                        <a href={s.url} target="_blank" rel="noopener" className="text-blue-400 hover:underline text-sm">{s.title}</a>
                                        <p className="text-xs text-muted-foreground">{s.url}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">If a price looks off, use the retailer link to verify — prices move daily. Live pricing uses server-side scraping and may be slow.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
