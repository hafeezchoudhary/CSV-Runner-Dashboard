// components/SummaryMetrics.js
export default function SummaryMetrics({ overall, perPerson }) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
  <div className="p-4 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
    <h4 className="text-sm text-slate-500">Overall Average</h4>
    <div className="text-2xl font-bold">{overall.avg.toFixed(2)} mi</div>
    <div className="mt-2 text-sm text-slate-500">
      min: {overall.min} mi · max: {overall.max} mi · total: {overall.total.toFixed(2)} mi
    </div>
  </div>

  <div className="p-4 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.25)] md:col-span-2">
    <h4 className="text-sm text-slate-500">Per Person</h4>
    <div className="mt-2 space-y-2">
      {Object.entries(perPerson).map(([person, stats]) => (
        <div key={person} className="flex items-center justify-between bg-slate-50 p-3 rounded shadow-sm">
          <div>
            <div className="font-medium">{person}</div>
            <div className="text-sm text-slate-500">Avg {stats.avg.toFixed(2)} · min {stats.min} · max {stats.max}</div>
          </div>
          <div className="text-sm font-semibold">{stats.total.toFixed(2)} mi</div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
