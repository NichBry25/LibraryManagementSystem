import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import { AuthorRow } from "@/types/db";

export async function GET() {
  const sql = `
    SELECT
      author_id,
      first_name,
      last_name
    FROM author
    ORDER BY last_name ASC, first_name ASC;
  `;

  const { rows, error } = await query<AuthorRow>(sql);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, authors: rows ?? [] });
}
