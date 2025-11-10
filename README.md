# CSV Runner Dashboard (Next.js)

## Project overview
This is an implementation of the "CSV Runner Dashboard" assignment. Users upload CSVs with `date, person, miles run`. The app validates the CSV, shows overall and per-person metrics, provides charts (bar & line), and a data preview.

## Assumptions
- CSV header names are exact: `date`, `person`, `miles run`.
- Dates are parseable by `new Date(dateString)`.
- Miles are non-negative numeric values.

## Prerequisites
- Node.js 18+ recommended
- npm
- No database required

## Setup
1. `git clone <repo>`
2. `cd csv-runner-dashboard`
3. `npm install`
4. Create `.env` if you want custom config (none required by default).

## Run
- `npm run dev` — app runs at http://localhost:3000

## Verify acceptance checklist
- Sample CSV: `public/sample.csv` is provided. Click "Load sample".
- Overall & per-person charts: visible under Charts panel.
- Metrics: top of page under Summary.
- Error handling: try removing a header or changing a miles cell to "abc" to see errors.

## Features & limitations
Works:
- CSV parsing and validation
- Visualizations (recharts)
- Summary metrics (avg/min/max) overall and per person
Known gaps:
- No server-side persistence (not required)
- Very large CSVs (>50k rows) may need streaming / server processing

## Architecture & folder structure
See project root. `pages/` has the UI; `components/` contains UI building blocks; `utils/parseCsv.js` handles parsing/validation.

## Accessibility & UI
- Buttons and inputs have clear labels.
- Contrast uses Tailwind defaults; typography & spacing prioritize readability.
- Table has proper headings.

## Notes
- To integrate `shadcn/ui`, follow their setup and replace components with `Card`, `Button`, etc. The current design uses Tailwind classes compatible with shadcn patterns.
