import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

/* ========= DUMMY DATA ========= */

// 1) STUDENT ATTENDANCE PER MONTH
const attendanceData = [
  { month: "Jan", students: 30 },
  { month: "Feb", students: 28 },
  { month: "Mar", students: 32 },
  { month: "Apr", students: 29 },
  { month: "May", students: 35 },
  { month: "Jun", students: 31 },
];

// 2) BOOK BORROWED PER CATEGORY
const booksData = [
  { category: "Science", total: 40 },
  { category: "Math", total: 35 },
  { category: "English", total: 50 },
  { category: "History", total: 20 },
  { category: "IT", total: 45 },
];

// 3) CLUB MEMBERSHIP
const clubData = [
  { name: "Sports Club", value: 25 },
  { name: "Music Club", value: 20 },
  { name: "Art Club", value: 15 },
  { name: "Coding Club", value: 30 },
];

export default function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>School Dashboard</h1>

      <div style={{ marginBottom: "50px" }}>
        <h2>1. Student Attendance per Month</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="students" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginBottom: "50px" }}>
        <h2>2. Books Borrowed per Category</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={booksData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginBottom: "50px" }}>
        <h2>3. Club Membership</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={clubData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}