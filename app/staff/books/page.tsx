import Link from "next/link";
import { demoBooks } from "../../../lib/demoData";

export default function StaffBooksPage() {
  return (
    <div className="v-stack" style={{ gap: "1.25rem" }}>
      <header className="h-stack" style={{ justifyContent: "space-between" }}>
        <div>
          <h1>Books (staff view)</h1>
          <p className="muted" style={{ fontSize: "0.85rem" }}>
            Staff can edit or add books. Each physical book has one copy in one
            branch.
          </p>
        </div>
        <Link href="/staff/books/new" className="button-link">
          + Add book
        </Link>
      </header>

      <section className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Branch</th>
              <th>Format</th>
              <th>Status</th>
              <th style={{ width: 90 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.branch}</td>
                <td>{book.isDigital ? "Digital" : "Physical"}</td>
                <td>
                  <span className="badge">{book.status}</span>
                </td>
                <td>
                  <Link
                    href={`/staff/books/${book.id}/edit`}
                    className="button-link"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
