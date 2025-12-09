import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface CreateBranchRow extends RowDataPacket {
  insertId: number;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { branch_name, branch_address } = body;

  if (!branch_name || !branch_address) {
    return NextResponse.json(
      { success: false, error: "Branch name and address are required" },
      { status: 400 }
    );
  }

  const sql = `
    INSERT INTO branch (branch_name, branch_address)
    VALUES (?, ?);
  `;

  const { rows, error } = await query<CreateBranchRow>(sql, [
    branch_name,
    branch_address,
  ]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    branch_id: rows.insertId,
  });
}
