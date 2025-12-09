import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface UpdateBranchRow extends RowDataPacket {
  affectedRows: number;
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { branch_id, branch_name, branch_address } = body;

  if (!branch_id || !branch_name || !branch_address) {
    return NextResponse.json(
      { success: false, error: "branch_id, branch_name, and branch_address are required" },
      { status: 400 }
    );
  }

  const sql = `
    UPDATE branch
    SET branch_name = ?, branch_address = ?
    WHERE branch_id = ?;
  `;

  const { rows, error } = await query<UpdateBranchRow>(sql, [
    branch_name,
    branch_address,
    branch_id,
  ]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    updated: rows.affectedRows,
  });
}
