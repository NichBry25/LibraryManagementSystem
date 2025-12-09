import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import { BranchRow } from "@/types/db";

export async function GET() {
  const sql = `
    SELECT
      branch_id,
      branch_name,
      branch_address
    FROM branch
    ORDER BY branch_name ASC;
  `;

  const { rows, error } = await query<BranchRow>(sql);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, branches: rows ?? [] });
}
