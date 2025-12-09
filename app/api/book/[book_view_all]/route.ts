import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import { BookRow } from "@/types/db";

export async function GET() {
  const sql = `
    SELECT
      b.book_id,
      b.title,
      a.author_name,
      c.category_name,
      b.year_published,
      br.branch_name,
      b.book_status,
      b.is_digital
    FROM book b
    JOIN author a ON b.author_id = a.author_id
    JOIN category c ON b.category_id = c.category_id
    JOIN branch br ON b.branch_id = br.branch_id
    ORDER BY b.title ASC;
  `;

  const { rows, error } = await query<BookRow>(sql);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, books: rows ?? [] });
}