"use client"

import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ReferenceDot, XAxis } from "recharts"

const chartData = [
  { day: 1, value: 1 },
  { day: 30, value: 20 },
  { day: 60, value: 50 },
]

const chartConfig = {
  value: {
    label: "Você",
    color: "#fff",
  },
} satisfies ChartConfig

export function EvolutionGraph() {
  return (
    <Card className="shadow-none border-none mx-auto max-w-max bg-black">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <div className="relative w-full h-72 ">
            <AreaChart
              accessibilityLayer
              data={chartData}  
              margin={{
                left: 20,   
                right: 12,
                top: 20,
                bottom: 30, 
              }}
              width={500}   
              height={300}  
            >
              <CartesianGrid vertical={false} horizontal={false} /> 
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `Dia ${value}`}
              />
              <Area
                dataKey="value"
                type="natural"
                fill="url(#gradient)"
                fillOpacity={0.6}
                stroke="#32CD32"
              />
              <ReferenceDot x={1} y={1} r={6} fill="#fff" />
              <ReferenceDot x={30} y={20} r={6} fill="#fff" />
              <ReferenceDot x={60} y={50} r={6} fill="#fff" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#FF0000', stopOpacity: 0.5 }} />
                  <stop offset="50%" style={{ stopColor: '#FFFF00', stopOpacity: 0.5 }} />
                  <stop offset="100%" style={{ stopColor: '#32CD32', stopOpacity: 0.5 }} />
                </linearGradient>
              </defs>
            </AreaChart>

            <div
              className="absolute text-[10px] w-max font-bold bg-white rounded-full px-2 py-1 truncate "
              style={{
                left: "0%", 
                bottom: "25%",  
              }}
            >
              Você
            </div>

            <div
              className="absolute text-[10px] w-max font-bold bg-white rounded-full p-1 truncate  "
              style={{
                left: "60%", 
                top: "6%", 
              }}
            >
              Nível que você pode alcançar com o Fit Lens
            </div>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span className="text-white text-xs font-semibold">Nível Atual</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-teal-500" />
          <span className="text-white text-xs font-semibold">Nível que você pode alcançar com o Fit Lens</span>
        </div>
      </CardFooter>
    </Card>
  )
}