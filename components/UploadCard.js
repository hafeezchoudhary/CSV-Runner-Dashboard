// components/UploadCard.js
import { useRef, useState } from "react";
import { parseAndValidateCSV } from "../utils/parseCsv";

export default function UploadCard({ onData, setErrors }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setErrors([]);
    const text = await file.text();
    const { data, errors } = await parseAndValidateCSV(text);
    setLoading(false);
    if (errors.length) {
      setErrors(errors);
      onData([]);
    } else {
      onData(data);
    }
  }

  async function handleSample() {
    setLoading(true);
    setErrors([]);
    const res = await fetch("/sample.csv");
    const text = await res.text();
    const { data, errors } = await parseAndValidateCSV(text);
    setLoading(false);
    if (errors.length) setErrors(errors);
    else onData(data);
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
  <h2 className="text-lg font-semibold mb-2 flex justify-center text-[#2554c7]">Upload CSV</h2>
  <p className="text-sm text-slate-500 mb-4">
    The CSV must have headers <code>date, person, miles run</code>. You can upload your file or load the sample CSV.
  </p>

  <div className="flex gap-3 justify-center">
    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#3770f6] border rounded-md text-sm font-medium text-white hover:bg-[#2554c7]">
      Choose file
      <input ref={inputRef} onChange={handleFile} type="file" accept=".csv" className="sr-only" />
    </label>

    <button onClick={handleSample} className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#3770f6] border rounded-md text-sm font-medium text-white hover:bg-[#2554c7]">
      Load sample
    </button>
  </div>

  {loading && <p className="mt-3 text-sm text-slate-600">Parsing file…</p>}
</div>

  );
}
