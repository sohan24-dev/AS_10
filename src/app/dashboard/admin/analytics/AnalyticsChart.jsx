"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
];

export default function AnalyticsChart({
    payments = 0,
    hires = 0,
    users = 0,
    comments = 0,
    lawyers = 0,
}) {
    const chartData = [
        { name: "Payments", value: payments },
        { name: "Hires", value: hires },
        { name: "Users", value: users },
        { name: "Comments", value: comments },
        { name: "Lawyers", value: lawyers },
    ];

    return (
        <div className="p-6">
            <h1 className="mb-6 text-3xl font-bold">
                Analytics Dashboard length
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-5">
                <div className="p-5 bg-blue-100 rounded-xl shadow">
                    <h2 className="text-gray-600 font-medium">Payments</h2>
                    <p className="text-3xl font-bold">{payments}</p>
                </div>

                <div className="p-5 bg-green-100 rounded-xl shadow">
                    <h2 className="text-gray-600 font-medium">Hires</h2>
                    <p className="text-3xl font-bold">{hires}</p>
                </div>

                <div className="p-5 bg-yellow-100 rounded-xl shadow">
                    <h2 className="text-gray-600 font-medium">Users</h2>
                    <p className="text-3xl font-bold">{users}</p>
                </div>

                <div className="p-5 bg-red-100 rounded-xl shadow">
                    <h2 className="text-gray-600 font-medium">Comments</h2>
                    <p className="text-3xl font-bold">{comments}</p>
                </div>

                <div className="p-5 bg-purple-100 rounded-xl shadow">
                    <h2 className="text-gray-600 font-medium">Lawyers</h2>
                    <p className="text-3xl font-bold">{lawyers}</p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="p-6 bg-white rounded-xl shadow">
                <div className="w-full h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={180}
                                label={({ name, percent }) =>
                                    `${name} (${((percent || 0) * 100).toFixed(0)}%)`
                                }
                            >
                                {chartData.map((item, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}