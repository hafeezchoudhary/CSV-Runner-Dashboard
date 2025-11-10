// utils/parseCsv.js
import Papa from "papaparse";

/**
 * Expected header names (exact): date, person, miles run
 * Returns: { data: Array, errors: Array }
 */
export function parseAndValidateCSV(fileOrText) {
  return new Promise((resolve) => {
    const config = {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        const rows = results.data;
        const errors = [];
        // Validate headers exist
        const headers = results.meta.fields || [];
        const required = ["date", "person", "miles run"];
        const missing = required.filter((r) => !headers.includes(r));
        if (missing.length) {
          errors.push({
            type: "HEADER_MISSING",
            message: `Missing required headers: ${missing.join(", ")}`
          });
          resolve({ data: [], errors });
          return;
        }

        // Validate each row
        const parsedRows = [];
        rows.forEach((r, idx) => {
          const line = idx + 2; // header line is 1
          const rowErrors = [];

          // date validity
          const dateStr = (r["date"] || "").trim();
          const dateObj = new Date(dateStr);
          if (!dateStr || Number.isNaN(dateObj.getTime())) {
            rowErrors.push(`Invalid date at line ${line}: "${dateStr}"`);
          }

          // person
          const person = (r["person"] || "").trim();
          if (!person) {
            rowErrors.push(`Missing person at line ${line}`);
          }

          // miles run numeric
          const milesRaw = (r["miles run"] || "").toString().trim();
          const miles = Number(milesRaw);
          if (milesRaw === "" || Number.isNaN(miles) || miles < 0) {
            rowErrors.push(`Invalid miles run at line ${line}: "${milesRaw}"`);
          }

          if (rowErrors.length) {
            rowErrors.forEach((e) => errors.push({ type: "ROW", message: e }));
          } else {
            parsedRows.push({
              date: dateStr,
              person,
              miles: miles
            });
          }
        });

        resolve({ data: parsedRows, errors });
      },
      error: (err) => {
        resolve({ data: [], errors: [{ type: "PARSE_ERROR", message: err.message }] });
      }
    };

    if (typeof fileOrText === "string") {
      Papa.parse(fileOrText, config);
    } else {
      Papa.parse(fileOrText, config);
    }
  });
}
