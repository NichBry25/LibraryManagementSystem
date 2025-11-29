import Link from "next/link";
import { demoBranches, demoCategories } from "../../../../lib/demoData";

export default function NewBookPage() {
  return (
    <div className="v-stack" style={{ gap: "1.25rem", maxWidth: 640 }}>
      <Link href="/staff/books" className="button-link">
        ← Back to books
      </Link>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Add new book</div>
          <div className="card-subtitle">
            This will eventually insert into the book and storage tables.
          </div>
        </div>

        <form className="v-stack">
          <div className="grid-2">
            <div className="v-stack">
              <div>
                <label htmlFor="title">Title</label>
                <input id="title" />
              </div>
              <div>
                <label htmlFor="author">Author</label>
                <input id="author" />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <select id="category">
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
                <input id="year" type="number" />
              </div>
              <div>
                <label htmlFor="branch">Branch</label>
                <select id="branch">
                  {demoBranches.map((branch) => (
                    <option key={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Format</label>
                <select>
                  <option value="physical">Physical</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
            </div>
          </div>

          <button type="button">Save (dummy button)</button>
        </form>
      </div>
    </div>
  );
}
