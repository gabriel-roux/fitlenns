"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useState } from "react";
import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
	Tooltip,
} from "recharts";

const data = [
	{ name: "Carboidratos", value: 20, max: 100, fill: "#34d399" },
	{ name: "Gordura", value: 15, max: 100, fill: "#60a5fa" },
	{ name: "Proteína", value: 25, max: 100, fill: "#fbbf24" },
	{ name: "Cal", value: 450, max: 1000, fill: "#a78bfa" },
	{ name: "Água", value: 6, max: 10, fill: "#38bdf8" },
];

const chartConfig = {
	value: { label: "Valor" },
} satisfies ChartConfig;

export function NutrientChart() {
	const [waterCups, setWaterCups] = useState(6);

	const incrementWaterCups = () => {
		if (waterCups < 10) {
			setWaterCups(waterCups + 1);
		}
	};

	return (
		<Card className="relative max-w-[527px] mx-auto border-0 pt-6 shadow-none bg-transparent bg-black text-white overflow-hidden">
			<div className="flex flex-col items-center justify-center text-center">
				<h2 className="text-lg font-bold">Resumo</h2>
				<p>de hoje</p>
			</div>
			<CardContent>
				<div className="grid grid-cols-3 gap-4 justify-center mt-4">
					{data.slice(0, 3).map((item) => (
						<div key={item.name} className="text-center">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square max-h-[150px]"
							>
								<RadialBarChart
									width={150}
									height={150}
									data={[item]}
									startAngle={0}
									endAngle={(item.value / item.max) * 360}
									innerRadius={50}
									outerRadius={70}
								>
									<PolarGrid
										gridType="circle"
										radialLines={false}
										stroke="none"
										className="first:fill-neutral-700 last:fill-[#000]"
										polarRadius={[56, 44]}
									/>
									<Tooltip
										cursor={false}
										content={({ payload }) => {
											if (payload?.length) {
												return (
													<div className="bg-black/80 text-white px-2 py-1 rounded text-xs">
														{payload[0].payload.name}: {payload[0].value}
													</div>
												);
											}
											return null;
										}}
									/>
									<RadialBar
										dataKey="value"
										cornerRadius={5}
										fill={item.fill}
										maxBarSize={item.max}
									/>
									<PolarRadiusAxis
										tick={false}
										tickLine={false}
										axisLine={false}
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
																className="fill-white  text-xl font-bold"
															>
																{item.value}
															</tspan>
															<tspan
																x={viewBox.cx}
																y={(viewBox.cy || 0) + 12}
																className="fill-white text-[10px]"
															>
																{item.name}
															</tspan>
														</text>
													);
												}
											}}
										/>
									</PolarRadiusAxis>
								</RadialBarChart>
							</ChartContainer>
						</div>
					))}
				</div>

				<div className="grid grid-cols-2 gap-4 justify-center pb-1">
					{data.slice(3, 5).map((item) => (
						<div key={item.name} className="text-center">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square max-h-[150px]"
							>
								<RadialBarChart
									width={150}
									height={150}
									data={[item]}
									startAngle={0}
									endAngle={(item.value / item.max) * 360}
									innerRadius={50}
									outerRadius={70}
								>
									<PolarGrid
										gridType="circle"
										radialLines={false}
										stroke="none"
										className="first:fill-neutral-700 last:fill-[#000]"
										polarRadius={[56, 44]}
									/>
									<Tooltip
										cursor={false}
										content={({ payload }) => {
											if (payload?.length) {
												return (
													<div className="bg-black/80 text-white px-2 py-1 rounded text-xs">
														{payload[0].payload.name}: {payload[0].value}
													</div>
												);
											}
											return null;
										}}
									/>
									<RadialBar
										dataKey="value"
										cornerRadius={5}
										fill={item.fill}
										maxBarSize={item.max}
									/>
									<PolarRadiusAxis
										tick={false}
										tickLine={false}
										axisLine={false}
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
																className="fill-white  text-xl font-bold"
															>
																{item.value}
															</tspan>
															<tspan
																x={viewBox.cx}
																y={(viewBox.cy || 0) + 12}
																className="fill-white text-[10px]"
															>
																{item.name}
															</tspan>
														</text>
													);
												}
											}}
										/>
									</PolarRadiusAxis>
								</RadialBarChart>
							</ChartContainer>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 justify-center pb-1">
					<div className="text-center mx-auto">
						<p className="text-lg max-w-[380px]">
							Além disso, mantém você no <span className="text-green">caminho certo</span> com sua <span className="text-green">ingestão de água</span>!💧
						</p>
					</div>

					<div className="text-center mt-2">
						<ChartContainer
							config={chartConfig}
							className="mx-auto aspect-square max-h-[150px]"
						>
							<RadialBarChart
									width={270}
									height={270}
									data={[
										{
											name: "Copos de Água",
											value: waterCups,
											max: 10,
											fill: "#38bdf8",
										},
									]}
									startAngle={0}
									endAngle={(waterCups / 10) * 360}
									innerRadius={65}
									outerRadius={80}
							>
								<PolarGrid
									gridType="circle"
									radialLines={false}
									stroke="none"
									className="first:fill-neutral-700 last:fill-[#000]"
									polarRadius={[70, 60]}
								/>
								<Tooltip
									cursor={false}
									content={({ payload }) => {
										if (payload?.length) {
											return (
												<div className="bg-black/80 text-white px-2 py-1 rounded text-xs">
													{payload[0].payload.name}: {payload[0].value}
												</div>
											);
										}
										return null;
									}}
								/>
								<RadialBar
									dataKey="value"
									cornerRadius={5}
									fill="#38bdf8"
									maxBarSize={10}
								/>
								<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
															y={(viewBox.cy || 0) + 12}
															className="fill-white text-[10px]"
														>
															Copos de Água
														</tspan>
														<tspan
															x={viewBox.cx}
															y={viewBox.cy}
															className="fill-white text-xl font-bold"
														>
															{waterCups}
														</tspan>
														<tspan
															x={viewBox.cx}
															y={(viewBox.cy || 0) + 24}
															className="fill-white text-xl font-bold"
														>
															<button
																type="button"
																onClick={incrementWaterCups}
																className="px-2 py-1 bg-blue-500 text-white rounded-full text-sm"
															>
																+
															</button>
														</tspan>
													</text>
												);
											}
										}}
									/>
								</PolarRadiusAxis>
							</RadialBarChart>
						</ChartContainer>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}