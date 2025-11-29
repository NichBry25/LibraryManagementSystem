import Link from "next/link";

export default function StaffDashboardPage() {
  return (
    <div className="v-stack" style={{ gap: "1.25rem" }}>
      <header>
        <h1>Staff dashboard</h1>
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          Staff can manage books, branches, and confirm borrow requests.
        </p>
      </header>

      <section className="grid-2">
        <div className="v-stack">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Catalogue management</div>
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.85rem",
              }}
            >
              <li style={{ marginBottom: "0.5rem" }}>
                <Link href="/staff/books" className="button-link">
                  View / edit books
                </Link>
              </li>
              <li>
                <Link href="/staff/books/new" className="button-link">
                  Add new book
                </Link>
              </li>
            </ul>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Branch management</div>
            </div>
            <Link href="/staff/branches" className="button-link">
              Manage branches
            </Link>
          </div>
        </div>

        <aside className="card">
          <div className="card-header">
            <div className="card-title">Borrowing flow (for staff)</div>
          </div>
          <ol
            style={{
              margin: 0,
              paddingLeft: "1.2rem",
              fontSize: "0.8rem",
              lineHeight: 1.5,
            }}
          >
            <li>Member submits a borrow request with proposed return date.</li>
            <li>Staff checks if the book is Available in this branch.</li>
            <li>
              If yes, confirm request → status becomes Borrowed and held for 3
              hours.
            </li>
            <li>
              If not picked up within 3 hours, cancel request and revert status
              to Available.
            </li>
            <li>
              When book is returned, set return_date and compute late fees if
              current date &gt; due_date.
            </li>
          </ol>
        </aside>
      </section>
    </div>
  );
}
