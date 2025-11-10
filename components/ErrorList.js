// components/ErrorList.js
export default function ErrorList({ errors = [] }) {
  if (!errors || !errors.length) return null;
  return (
    <div className="mt-4 rounded-md bg-rose-50 border border-rose-100 p-4">
      <h3 className="text-sm font-medium text-rose-800">Errors ({errors.length})</h3>
      <ul className="mt-2 text-sm text-rose-700 list-disc pl-5 space-y-1">
        {errors.map((e, i) => (
          <li key={i}>{e.message}</li>
        ))}
      </ul>
    </div>
  );
}
