import { notFound } from "next/navigation";
import Link from "next/link";
import { demoBooks } from "../../../lib/demoData";

type Params = { id: string };

export default function BookDetailPage({ params }: { params: Params }) {
  const id = Number(params.id);
  const book = demoBooks.find((b) => b.id === id);

  if (!book) {
    return notFound();
  }

  const canBorrow = book.status === "available";

  return (
    <div className="v-stack" style={{ gap: "1.25rem" }}>
      <Link href="/books" className="button-link">
        ← Back to books
      </Link>

      <section className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{book.title}</div>
            <span className="badge">{book.status}</span>
          </div>
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              rowGap: "0.4rem",
              columnGap: "0.75rem",
              fontSize: "0.9rem",
            }}
          >
            <dt>Author</dt>
            <dd>{book.author}</dd>

            <dt>Category</dt>
            <dd>{book.category}</dd>

            <dt>Year</dt>
            <dd>{book.yearPublished}</dd>

            <dt>Branch</dt>
            <dd>{book.branch}</dd>

            <dt>Format</dt>
            <dd>{book.isDigital ? "Digital" : "Physical"}</dd>
          </dl>
        </div>

        <aside className="card">
          <div className="card-header">
            <div className="card-title">Borrow / download</div>
          </div>

          <p className="muted" style={{ fontSize: "0.8rem" }}>
            This follows your business flow:
            <br />
            digital ⇒ immediate download; physical ⇒ staff confirms availability
            and proposed return date.
          </p>

          {book.isDigital ? (
            <button disabled={!canBorrow}>
              Download digital copy (mock button)
            </button>
          ) : (
            <form className="v-stack">
              <div>
                <label htmlFor="return-date">Proposed return date</label>
                <input id="return-date" type="date" />
              </div>
              <button disabled={!canBorrow}>Request to borrow</button>
              {!canBorrow && (
                <p className="muted" style={{ fontSize: "0.8rem" }}>
                  This copy is not available. Staff will see this as{" "}
                  <q>Borrowed</q> in the system.
                </p>
              )}
            </form>
          )}

          <div
            className="card"
            style={{
              marginTop: "0.75rem",
              background: "#ffffff",
              borderStyle: "dashed",
            }}
          >
            <div className="card-title" style={{ fontSize: "0.85rem" }}>
              Borrowing rules (summary)
            </div>
            <ul
              style={{
                margin: "0.3rem 0 0",
                paddingLeft: "1.1rem",
                fontSize: "0.8rem",
              }}
            >
              <li>Each book has exactly one copy in one branch.</li>
              <li>
                If staff confirms, book is marked Borrowed and held for 3 hours.
              </li>
              <li>
                If not picked up within 3 hours, request is cancelled and status
                resets to Available.
              </li>
              <li>
                While return_date is null, it appears under &quot;Currently
                borrowed&quot;.
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
