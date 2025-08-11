"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Cpu, DollarSign, Gamepad2, Gauge, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getRecommendation } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  budget: z.coerce
    .number({ invalid_type_error: "Please enter a valid number." })
    .positive("Budget must be a positive number."),
  intendedUses: z
    .string()
    .min(10, { message: "Please describe your intended uses in at least 10 characters." })
    .max(200, { message: "Description must be 200 characters or less." }),
  desiredPerformance: z.enum(["Low", "Medium", "High"], {
    required_error: "Please select a performance level.",
  }),
});

type Recommendation = {
  recommendedGpu: string;
  reasoning: string;
};

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 500,
      intendedUses: "",
      desiredPerformance: "Medium",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setRecommendation(null);
    startTransition(async () => {
      const result = await getRecommendation(values);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.success && result.data) {
        setRecommendation(result.data);
      }
    });
  }

  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full p-3 mb-4">
           <Cpu className="h-10 w-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          GPU Recs
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find the perfect graphics card for your rig with AI-powered recommendations.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Tell Us Your Needs</CardTitle>
            <CardDescription>Fill out the details below to get a custom recommendation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base"><DollarSign className="w-5 h-5" /> Budget (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 800" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="intendedUses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base"><Gamepad2 className="w-5 h-5" /> Intended Uses</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 1440p gaming on high settings, video editing, and streaming."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desiredPerformance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base"><Gauge className="w-5 h-5" /> Desired Performance</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a performance level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 text-lg">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                     <Sparkles className="mr-2 h-5 w-5" />
                     Get Recommendation
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="mt-8 lg:mt-0">
           {isPending ? (
              <Card className="shadow-lg h-full">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-5 w-full" />
                     <Skeleton className="h-5 w-5/6" />
                  </div>
                   <div className="space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-5/6" />
                  </div>
                </CardContent>
              </Card>
           ) : recommendation ? (
            <Card className="shadow-lg animate-in fade-in-50">
              <CardHeader>
                <CardTitle className="text-2xl">Your AI-Powered Recommendation</CardTitle>
                 <CardDescription>Based on your requirements, here is the best match.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Recommended GPU</h3>
                  <p className="text-xl font-bold text-foreground">{recommendation.recommendedGpu}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Reasoning</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{recommendation.reasoning}</p>
                </div>
              </CardContent>
            </Card>
           ) : (
            <Card className="shadow-lg h-full flex items-center justify-center bg-muted/30 border-dashed">
                <div className="text-center p-8">
                    <div className="inline-flex items-center justify-center bg-background rounded-full p-3 mb-4">
                       <Sparkles className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Your recommendation will appear here</h3>
                    <p className="text-muted-foreground mt-2">Fill out the form to get started!</p>
                </div>
            </Card>
           )}
        </div>
      </div>
    </main>
  );
}
