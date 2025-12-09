import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface CreateCategoryRow extends RowDataPacket {
  insertId: number;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { category_name, description } = body;

  if (!category_name) {
    return NextResponse.json(
      { success: false, error: "Category name is required" },
      { status: 400 }
    );
  }

  const sql = `
    INSERT INTO category (category_name, description)
    VALUES (?, ?);
  `;

  const { rows, error } = await query<CreateCategoryRow>(sql, [
    category_name,
    description ?? null,
  ]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    category_id: rows.insertId,
  });
}
