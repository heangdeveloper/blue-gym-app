"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { 
    User,
    BanknoteArrowUp,
    BanknoteArrowDown,
    Users,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", unpaid: 186, paid: 80 },
    { month: "February", unpaid: 305, paid: 200 },
    { month: "March", unpaid: 237, paid: 120 },
    { month: "April", unpaid: 73, paid: 190 },
    { month: "May", unpaid: 209, paid: 130 },
    { month: "June", unpaid: 214, paid: 140 },
    { month: "July", unpaid: 180, paid: 160 },
    { month: "August", unpaid: 250, paid: 170 },
    { month: "September", unpaid: 220, paid: 150 },
    { month: "October", unpaid: 260, paid: 200 },
    { month: "November", unpaid: 300, paid: 220 },
    { month: "December", unpaid: 280, paid: 240 },
];

const chartConfig = {
    unpaid: {
        label: "Unpaid",
        color: "var(--chart-1)",
    },
    paid: {
        label: "Paid",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export default function Home() {
    return (
        <>
            <div>
                <div className="flex flex-col mb-6 sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="">
                        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Track your business performance and key metrics.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardContent>
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Customer</p>
                                    <p className="text-2xl font-bold tracking-tight">2,392</p>
                                    <div className="flex items-center gap-1.5">
                                        <TrendingUp className="w-3.5 h-3.5 text-green-500"/>
                                        <span className="text-xs font-semibold text-green-500">+24.7%</span>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-chart-1/10">
                                    <User className="w-5 h-5 text-chart-1"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Income</p>
                                    <p className="text-2xl font-bold tracking-tight">2,392</p>
                                    <div className="flex items-center gap-1.5">
                                        <TrendingDown className="w-3.5 h-3.5 text-destructive"/>
                                        <span className="text-xs font-semibold text-destructive">-5.2%</span>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-chart-2/10">
                                    <BanknoteArrowUp className="w-5 h-5 text-chart-2"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">Expense</p>
                                    <p className="text-2xl font-bold tracking-tight">2,392</p>
                                    <div className="flex items-center gap-1.5">
                                        <TrendingDown className="w-3.5 h-3.5 text-destructive"/>
                                        <span className="text-xs font-semibold text-destructive">-5.2%</span>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-chart-3/10">
                                    <BanknoteArrowDown className="w-5 h-5 text-chart-3"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground">User</p>
                                    <p className="text-2xl font-bold tracking-tight">2,392</p>
                                    <div className="flex items-center gap-1.5">
                                        <TrendingUp className="w-3.5 h-3.5 text-green-500"/>
                                        <span className="text-xs font-semibold text-green-500">+8.1%</span>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-chart-4/10">
                                    <Users className="w-5 h-5 text-chart-4"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-6 grid grid-cols-1">
                    <Card>
                        <CardHeader>
                            <h4 className="text-base font-semibold tracking-tight">Customer Amount</h4>
                            <p className="text-xs text-muted-foreground">Amount customer have paid and unpaid per month</p>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="aspect-auto h-90 w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dashed" />}
                                    />
                                    <Bar dataKey="unpaid" fill="var(--color-unpaid)" radius={4} />
                                    <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
