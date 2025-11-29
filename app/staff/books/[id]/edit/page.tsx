import { notFound } from "next/navigation";
import Link from "next/link";
import { demoBooks, demoBranches, demoCategories } from "../../../../../lib/demoData";

type Params = { id: string };

export default function EditBookPage({ params }: { params: Params }) {
  const id = Number(params.id);
  const book = demoBooks.find((b) => b.id === id);

  if (!book) {
    return notFound();
  }

  return (
    <div className="v-stack" style={{ gap: "1.25rem", maxWidth: 640 }}>
      <Link href="/staff/books" className="button-link">
        ← Back to books
      </Link>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Edit book #{book.id}</div>
          <div className="card-subtitle">
            Update book info or change its status.
          </div>
        </div>

        <form className="v-stack">
          <div className="grid-2">
            <div className="v-stack">
              <div>
                <label htmlFor="title">Title</label>
                <input id="title" defaultValue={book.title} />
              </div>
              <div>
                <label htmlFor="author">Author</label>
                <input id="author" defaultValue={book.author} />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <select id="category" defaultValue={book.category}>
                  {demoCategories
                    .filter((c) => c !== "All categories")
                    .map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="v-stack">
              <div>
                <label htmlFor="year">Year published</label>
                <input
                  id="year"
                  type="number"
                  defaultValue={book.yearPublished}
                />
              </div>
              <div>
                <label htmlFor="branch">Branch</label>
                <select id="branch" defaultValue={book.branch}>
                  {demoBranches.map((branch) => (
                    <option key={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Status</label>
                <select defaultValue={book.status}>
                  <option value="available">Available</option>
                  <option value="borrowed">Borrowed</option>
                  <option value="reserved">Reserved</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>
          </div>

          <button type="button">Save changes (dummy)</button>
        </form>
      </div>
    </div>
  );
}
