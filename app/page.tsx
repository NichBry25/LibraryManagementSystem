import Link from "next/link";
import { demoBooks, demoCategories } from "../lib/demoData";

export default function LandingPage() {
  return (
    <div className="v-stack" style={{ gap: "1.5rem" }}>
      <section className="grid-2">
        <div className="v-stack">
          <h1>Library Management System</h1>
          <p className="muted">
            Simple wireframe for browsing, borrowing, and managing books across
            branches.
          </p>

          <div className="h-stack">
            <Link href="/books" className="button-link">
              Browse all books
            </Link>
            <Link href="/login" className="button-link">
              Login as member or staff
            </Link>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Quick actions</div>
            </div>
            <ul style={{ paddingLeft: "1.1rem", margin: 0, fontSize: "0.85rem" }}>
              <li>View catalogue by category</li>
              <li>Open a book details page and see borrowing rules</li>
              <li>Jump to member or staff dashboards</li>
            </ul>
          </div>
        </div>

        <aside className="card">
          <div className="card-header">
            <div className="card-title">Browse by category</div>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {demoCategories.map((cat) => (
              <li
                key={cat}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.3rem 0",
                  borderBottom: "1px dashed #ccc",
                  fontSize: "0.85rem",
                }}
              >
                <span>{cat}</span>
                <Link href={`/books?category=${encodeURIComponent(cat)}`}>
                  <span className="muted" style={{ fontSize: "0.8rem" }}>
                    View
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="card">
        <div className="card-header">
          <div className="card-title">Recently added books</div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Branch</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {demoBooks.map((book) => (
              <tr key={book.id}>
                <td>
                  <Link href={`/books/${book.id}`}>{book.title}</Link>
                </td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.branch}</td>
                <td>
                  <span className="badge">{book.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
