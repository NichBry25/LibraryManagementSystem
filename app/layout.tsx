import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Library Management System",
  description: "Wireframe UI for LMS project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="header">
            <div className="header-left">
              <Link href="/" className="logo">
                LMS
              </Link>
            </div>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/books">Books</Link>
              <Link href="/login">Login</Link>
              <Link href="/member">Member dashboard</Link>
              <Link href="/staff">Staff dashboard</Link>
            </nav>
          </header>

          <main className="main">{children}</main>

          <footer className="footer">
            <span className="muted">
              Simple wireframe UI • Replace demo data with real API later
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
