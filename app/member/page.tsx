export default function MemberDashboardPage() {
  return (
    <div className="v-stack" style={{ gap: "1.25rem" }}>
      <header>
        <h1>Member dashboard</h1>
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          This view represents a logged-in active member.
        </p>
      </header>

      <section className="grid-2">
        <div className="v-stack">
          {/* Currently borrowed */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Currently borrowed</div>
              <div className="card-subtitle">
                Books with return_date still empty.
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Branch</th>
                  <th>Due date</th>
                  <th>Pickup status</th>
                </tr>
              </thead>
              <tbody>
                {/* Demo row */}
                <tr>
                  <td>Introduction to Databases</td>
                  <td>Main Campus</td>
                  <td>2025-12-10</td>
                  <td>Picked up</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Borrow history */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Borrow history</div>
              <div className="card-subtitle">
                Previously returned books (return_date filled).
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Borrowed</th>
                  <th>Returned</th>
                  <th>Late?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Modern Python</td>
                  <td>2025-10-01</td>
                  <td>2025-10-14</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <aside className="v-stack">
          {/* Membership status */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Membership status</div>
            </div>
            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1fr",
                rowGap: "0.35rem",
                columnGap: "0.5rem",
                fontSize: "0.85rem",
              }}
            >
              <dt>Member ID</dt>
              <dd>#M12345</dd>

              <dt>Status</dt>
              <dd>
                <span className="badge">active</span>
              </dd>

              <dt>Start date</dt>
              <dd>2024-09-01</dd>

              <dt>End date</dt>
              <dd>2026-09-01</dd>
            </dl>
          </div>

          {/* Late fees */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Late fees</div>
              <div className="card-subtitle">
                Generated when current date &gt; due_date.
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Days late</th>
                  <th>Fee (demo)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Example of a returned-late book */}
                <tr>
                  <td>Civil Engineering Basics</td>
                  <td>3</td>
                  <td>3 × base fee</td>
                  <td>Paid</td>
                </tr>
              </tbody>
            </table>

            <p className="muted" style={{ fontSize: "0.75rem" }}>
              When a book is returned late, the fee stops multiplying on the
              return date.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
