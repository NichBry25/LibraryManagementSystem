import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import { CategoryRow } from "@/types/db";

export async function GET() {
  const sql = `
    SELECT
      category_id,
      category_name,
      description
    FROM category
    ORDER BY category_name ASC;
  `;

  const { rows, error } = await query<CategoryRow>(sql);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, categories: rows ?? [] });
}
