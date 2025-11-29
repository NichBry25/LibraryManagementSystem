import { demoBranches } from "../../../lib/demoData";

export default function BranchesPage() {
  return (
    <div className="v-stack" style={{ gap: "1.25rem" }}>
      <header>
        <h1>Branches</h1>
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          Manage branch information. This will later map to the branch table.
        </p>
      </header>

      <section className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Branch name</th>
              <th>Address (placeholder)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoBranches.map((branch, index) => (
              <tr key={branch}>
                <td>{branch}</td>
                <td>Address line for {branch}</td>
                <td>
                  <button type="button">Edit (placeholder)</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card" style={{ maxWidth: 520 }}>
        <div className="card-header">
          <div className="card-title">Add / edit branch</div>
        </div>
        <form className="v-stack">
          <div>
            <label htmlFor="branch-name">Branch name</label>
            <input id="branch-name" />
          </div>
          <div>
            <label htmlFor="branch-address">Branch address</label>
            <textarea id="branch-address" />
          </div>
          <button type="button">Save branch (dummy)</button>
        </form>
      </section>
    </div>
  );
}
