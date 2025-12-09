import { query } from "@/lib/sql";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ branch_id: string | string[] }> }
) {
  const { branch_id } = await params;

  const idParam = Array.isArray(branch_id) ? branch_id[0] : branch_id;
  const branchId = Number.parseInt(idParam, 10);

  if (Number.isNaN(branchId)) {
    return NextResponse.json(
      { success: false, error: "Invalid branch ID" },
      { status: 400 }
    );
  }

  const sql = `
    DELETE FROM branch
    WHERE branch_id = ?;
  `;

  const { error } = await query(sql, [branchId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Branch deleted successfully",
  });
}
