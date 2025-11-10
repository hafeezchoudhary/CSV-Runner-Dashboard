"use client";
import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, CartesianGrid } from "recharts";

export default function ChartsPanel({ data, perPersonView = null }) {
  const byDate = {};
  data.forEach((r) => {
    const key = r.date;
    byDate[key] = (byDate[key] || 0) + Number(r.miles);
  });
  const dateSeries = Object.keys(byDate).sort().map((d) => ({ date: d, total: Number(byDate[d]) }));

  const persons = [...new Set(data.map((d) => d.person))].slice(0, 6);
  const perDatePerson = {};
  data.forEach((r) => {
    perDatePerson[r.date] = perDatePerson[r.date] || { date: r.date };
    perDatePerson[r.date][r.person] = (perDatePerson[r.date][r.person] || 0) + Number(r.miles);
  });
  const perDateSeries = Object.values(perDatePerson).sort((a, b) => a.date.localeCompare(b.date));

  const [selectedPerson, setSelectedPerson] = useState(persons[0] || null);

  return (
    <div className="grid gap-6 md:grid-cols-2">

      {/* bar chart */}
      <div className="bg-white p-4 rounded shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
        <h3 className="text-sm font-medium mb-2">Total Miles by Date (bar)</h3>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={dateSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="Total miles" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* per-person line chart */}
      <div className="bg-white p-4 rounded shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
        <h3 className="text-sm font-medium mb-2">Per-Person over time (line)</h3>

        {/* Person Selector Buttons */}
        <div className="flex gap-2 mb-3">
          {persons.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPerson(p)}
              className={`px-3 py-1 text-sm font-medium rounded ${selectedPerson === p ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-700"
                }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Line Chart with permanent dots */}
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={perDateSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedPerson && (
                <Line
                  type="monotone"
                  dataKey={selectedPerson}
                  stroke="#0ea5e9"
                  dot={{ r: 4, stroke: "#0ea5e9", strokeWidth: 2, fill: "#fff" }} // permanent visible dots
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
