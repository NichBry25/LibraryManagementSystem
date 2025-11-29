"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { demoBooks, demoCategories } from "../../lib/demoData";

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("all");

  const filteredBooks = useMemo(() => {
    return demoBooks.filter((book) => {
      const matchesSearch =
        search.trim().length === 0 ||
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All categories" || book.category === category;

      const matchesStatus =
        status === "all" ? true : book.status === status.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  return (
    <div className="v-stack" style={{ gap: "1.25rem" }}>
      <div>
        <h1>Books</h1>
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          Sort and search books. This page will later query the books table.
        </p>
      </div>

      <section className="card">
        <div className="card-header">
          <div className="card-title">Filters</div>
        </div>
        <div className="grid-2">
          <div className="v-stack">
            <label htmlFor="search">Search by title or author</label>
            <input
              id="search"
              placeholder="e.g. 'Python' or 'Jane Doe'"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="v-stack">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {demoCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="available">Available only</option>
              <option value="borrowed">Borrowed</option>
              <option value="reserved">Reserved</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <div className="card-title">Results</div>
          <div className="card-subtitle">
            {filteredBooks.length} book(s) match the current filters.
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Branch</th>
              <th>Format</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>
                  <Link href={`/books/${book.id}`}>{book.title}</Link>
                </td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.branch}</td>
                <td>{book.isDigital ? "Digital" : "Physical"}</td>
                <td>
                  <span className="badge">{book.status}</span>
                </td>
              </tr>
            ))}
            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan={6} className="muted">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
