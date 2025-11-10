"use client";
import { useMemo, useState } from "react";
import UploadCard from "../components/UploadCard";
import ErrorList from "../components/ErrorList";
import SummaryMetrics from "../components/SummaryMetrics";
import ChartsPanel from "../components/ChartsPanel";

function computeMetrics(rows) {
  if (!rows || !rows.length) {
    return {
      overall: { avg: 0, min: 0, max: 0, total: 0 },
      perPerson: {}
    };
  }

  let total = 0;
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  const per = {};

  rows.forEach((r) => {
    const m = Number(r.miles);
    total += m;
    if (m < min) min = m;
    if (m > max) max = m;
    if (!per[r.person]) per[r.person] = { total: 0, count: 0, min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
    per[r.person].total += m;
    per[r.person].count += 1;
    per[r.person].min = Math.min(per[r.person].min, m);
    per[r.person].max = Math.max(per[r.person].max, m);
  });

  const avg = total / rows.length;
  const perPerson = {};
  Object.entries(per).forEach(([k, v]) => {
    perPerson[k] = {
      avg: v.total / v.count,
      min: Number(v.min.toFixed(2)),
      max: Number(v.max.toFixed(2)),
      total: v.total
    };
  });

  return {
    overall: { avg, min: Number(min.toFixed(2)), max: Number(max.toFixed(2)), total },
    perPerson
  };
}

export default function Page() {
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState([]);

  const metrics = useMemo(() => computeMetrics(rows), [rows]);

  return (
    <main className="min-h-screen p-6 md:p-10 flex items-center justify-center">
      {rows.length === 0 ? (
        <div className="max-w-md w-full">
          <header className="mb-8 text-center w-full">
            <h1 className="text-3xl font-bold text-[#2554c7]">Upload Your Running Data</h1>
            <p className="text-slate-500 mt-1">
              Import your CSV file to visualize running metrics, track progress, and compare performance across runners
            </p>
          </header>
          <UploadCard onData={setRows} setErrors={setErrors} />
          {errors.length > 0 && <ErrorList errors={errors} />}

        </div>
      ) : (
        // Dashboard after upload
        <div className="max-w-6xl w-full mx-auto mt-18">
          <header className="mb-8 text-center w-full">
            <h1 className="text-3xl font-bold text-[#2554c7]">Upload Your Running Data</h1>
            <p className="text-slate-500 mt-1">
              Import your CSV file to visualize running metrics, track progress, and compare performance across runners
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              <UploadCard onData={setRows} setErrors={setErrors} />
              {errors.length > 0 && <ErrorList errors={errors} />}
            </div>

            <div className="md:col-span-2 space-y-6">
              <SummaryMetrics overall={metrics.overall} perPerson={metrics.perPerson} />
              <ChartsPanel data={rows} />

              <div className="bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                <h3 className="text-sm font-medium mb-3">Data Preview</h3>
                <div className="overflow-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Person</th>
                        <th className="p-2 text-right">Miles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="p-2">{r.date}</td>
                          <td className="p-2">{r.person}</td>
                          <td className="p-2 text-right">{Number(r.miles).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>

  );
}
