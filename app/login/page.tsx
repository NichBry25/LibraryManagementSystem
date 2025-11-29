import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="card-header">
        <div className="card-title">Login</div>
        <div className="card-subtitle">
          For this prototype, choose a role to continue.
        </div>
      </div>

      <div className="v-stack">
        <Link href="/member" className="button-link" style={{ width: "100%" }}>
          Continue as Member
        </Link>
        <Link href="/staff" className="button-link" style={{ width: "100%" }}>
          Continue as Staff
        </Link>
      </div>

      <p className="muted" style={{ marginTop: "0.75rem", fontSize: "0.8rem" }}>
        In the real app, this page will connect to authentication and check your
        member or staff record.
      </p>
    </div>
  );
}
