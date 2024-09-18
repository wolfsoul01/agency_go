"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

export const description = "Resumen de licencias";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export interface Main {
  A: number;
  B: number;
  C: number;
  C1: number;
  D: number;
  D1: number;
}

export function GrafDriverLicencies() {
  const { isFetching, data } = useQuery<Main | null>({
    queryKey: [`licencies`],
    queryFn: () => query.get("/analytic/licencies").then((res) => res.data),
    initialData: null,
  });

  const chartData = [
    { licencie: "A", count: data?.A, fill: "var(--color-chrome)" },
    { licencie: "B", count: data?.B, fill: "var(--color-safari)" },
    { licencie: "C", count: data?.C, fill: "var(--color-firefox)" },
    { licencie: "C1", count: data?.C1, fill: "var(--color-edge)" },
    { licencie: "D", count: data?.D, fill: "var(--color-other)" },
    { licencie: "D1", count: data?.D1, fill: "var(--color-other)" },
  ];
  const totalVisitors = React.useMemo(() => {
    return (
      chartData && chartData.reduce((acc, curr) => acc + (curr?.count ?? 0), 0)
    );
  }, [chartData]);


  if (!data || isFetching) return <div></div>;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Resumen de licencias</CardTitle>
        <CardDescription>{formatDate(new Date())}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="licencie"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
