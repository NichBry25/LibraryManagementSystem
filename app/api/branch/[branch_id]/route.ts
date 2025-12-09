import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import { BranchRow } from "@/types/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ branch_id: string | string[] }> }
) {
  const { branch_id } = await params;

  const idParam = Array.isArray(branch_id) ? branch_id[0] : branch_id;
  const branchId = Number.parseInt(idParam, 10);

  if (Number.isNaN(branchId)) {
    return NextResponse.json(
      { success: false, error: "Invalid branch id" },
      { status: 400 }
    );
  }

  const sql = `
    SELECT
      branch_id,
      branch_name,
      branch_addressS
    FROM branch
    WHERE branch_id = ?;
  `;

  const { rows, error } = await query<BranchRow>(sql, [branchId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, branch: rows ?? [] });
}
