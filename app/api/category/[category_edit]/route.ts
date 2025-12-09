import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface UpdateCategoryRow extends RowDataPacket {
  affectedRows: number;
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { category_id, category_name, description } = body;

  if (!category_id || !category_name) {
    return NextResponse.json(
      { success: false, error: "category_id and category_name are required" },
      { status: 400 }
    );
  }

  const sql = `
    UPDATE category
    SET category_name = ?, description = ?
    WHERE category_id = ?;
  `;

  const { rows, error } = await query<UpdateCategoryRow>(sql, [
    category_name,
    description ?? null,
    category_id,
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
