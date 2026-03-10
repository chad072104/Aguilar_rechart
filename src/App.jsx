import React from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ------------------ Sample Data ------------------
const kpiData = { totalSales: 12500, totalRevenue: 980000, totalExpenses: 560000, productionEfficiency: 87 };

const feedData = [
  { type: "Starter", sold: 1200, inventory: 300 },
  { type: "Grower", sold: 950, inventory: 200 },
  { type: "Finisher", sold: 600, inventory: 150 },
  { type: "Layer", sold: 800, inventory: 180 },
  { type: "Broiler", sold: 500, inventory: 120 }
];

const productionData = [
  { month: "Jan 2025", planned: 500, actual: 480 },
  { month: "Feb 2025", planned: 520, actual: 510 },
  { month: "Mar 2025", planned: 540, actual: 530 },
  { month: "Apr 2025", planned: 560, actual: 570 }
];

const revenueData = [
  { name: "Starter", value: 300000 },
  { name: "Grower", value: 250000 },
  { name: "Finisher", value: 180000 },
  { name: "Layer", value: 200000 },
  { name: "Broiler", value: 50000 }
];

const COLORS = ["#09f24b","#ef1111","#0eca82","#2e2d25","#d08d08"];

const monthlySales = [
  { month: "Jan 2025", sales: 300 },
  { month: "Feb 2025", sales: 320 },
  { month: "Mar 2025", sales: 350 },
  { month: "Apr 2025", sales: 400 }
];

const heatmapData = [
  { month: "Jan", Starter: 120, Grower: 90, Finisher: 60, Layer: 80 },
  { month: "Feb", Starter: 110, Grower: 95, Finisher: 70, Layer: 75 },
  { month: "Mar", Starter: 130, Grower: 85, Finisher: 65, Layer: 90 },
  { month: "Apr", Starter: 100, Grower: 100, Finisher: 80, Layer: 85 }
];

const feedTypes = ["Starter", "Grower", "Finisher", "Layer"];

// ------------------ Forecasting ------------------
function forecastSales(data, months = 6) {
  const n = data.length;
  if (n < 2) return [];
  const last = data[n - 1].sales;
  const prev = data[n - 2].sales;
  const growth = last - prev;
  const forecast = [];
  for (let i = 1; i <= months; i++) {
    forecast.push({ month: `Forecast ${i}`, sales: last + growth * i });
  }
  return forecast;
}

const forecastedSales = forecastSales(monthlySales, 6);
const combinedSales = [...monthlySales, ...forecastedSales];

// ------------------ Heatmap Color ------------------
function getColor(value) {
  if (value > 100) return "#4CAF50"; // High stock
  if (value > 80) return "#FFEB3B";  // Medium stock
  return "#F44336";                  // Low stock
}

// ------------------ Inventory Heatmap Component ------------------
function InventoryHeatmap() {
  return (
    <div style={{ width: "100%", height: 400, marginTop: 40 }}>
      <h3>Inventory Heatmap (Monthly)</h3>
      <ResponsiveContainer>
        <BarChart data={heatmapData} layout="vertical">
          <XAxis type="number"/>
          <YAxis type="category" dataKey="month"/>
          <Tooltip/>
          {feedTypes.map((feed) => (
            <Bar
              key={feed}
              dataKey={feed}
              fill="#8884d8"
              shape={(props) => {
                const { x, y, width, height, value } = props;
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={getColor(value)}
                  />
                );
              }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ------------------ Main App ------------------
export default function App() {
  return (
    <div style={{ padding: 40 }}>

      <h1>Feed Mill Dashboard (Past 3 Years & Forecast)</h1>

      {/* KPI CARDS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div style={{ background: "#f0f0f0", padding: 20, flex: 1 }}>
          <h3>Total Sales</h3>
          <p>{kpiData.totalSales}</p>
        </div>
        <div style={{ background: "#f0f0f0", padding: 20, flex: 1 }}>
          <h3>Total Revenue</h3>
          <p>${kpiData.totalRevenue.toLocaleString()}</p>
        </div>
        <div style={{ background: "#f0f0f0", padding: 20, flex: 1 }}>
          <h3>Total Expenses</h3>
          <p>${kpiData.totalExpenses.toLocaleString()}</p>
        </div>
        <div style={{ background: "#f0f0f0", padding: 20, flex: 1 }}>
          <h3>Production Efficiency</h3>
          <p>{kpiData.productionEfficiency}%</p>
        </div>
      </div>

      {/* BAR CHART */}
      <h3>Top & Least Selling Feeds / Inventory</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={feedData}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="type"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey="sold" fill="#10ef6d" name="Units Sold"/>
          <Bar dataKey="inventory" fill="#ed1417" name="Inventory"/>
        </BarChart>
      </ResponsiveContainer>

      {/* LINE CHART with Forecast */}
      <h3>Monthly Sales & Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={combinedSales}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="month"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Actual & Forecast Sales"/>
        </LineChart>
      </ResponsiveContainer>

      {/* GROUP BAR CHART */}
      <h3>Planned vs Actual Production</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={productionData}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="month"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey="planned" fill="#14e348" name="Planned"/>
          <Bar dataKey="actual" fill="#e3181f" name="Actual"/>
        </BarChart>
      </ResponsiveContainer>

      {/* DONUT CHART */}
      <h3>Revenue Distribution by Feed Type</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={revenueData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            label
          >
            {revenueData.map((entry,index)=>(
              <Cell key={index} fill={COLORS[index % COLORS.length]}/>
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>

      {/* HEATMAP */}
      <InventoryHeatmap />

    </div>
  );
}