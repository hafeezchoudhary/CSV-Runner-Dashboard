import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "CSV Runner Dashboard",
  description: "Upload CSV and view runner metrics + charts visually",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
