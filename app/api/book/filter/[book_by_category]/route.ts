import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import { BookRow } from "@/types/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category_id: string | string[] }> }
) {
  const { category_id } = await params;

  const idParam = Array.isArray(category_id) ? category_id[0] : category_id;
  const categoryId = Number.parseInt(idParam, 10);

  if (Number.isNaN(categoryId)) {
    return NextResponse.json(
      { success: false, error: "Invalid category ID" },
      { status: 400 }
    );
  }

  const sql = `
    SELECT
      b.book_id,
      b.title,
      CONCAT(a.first_name, ' ', a.last_name) AS author_name,
      c.category_name,
      b.year_published,
      br.branch_name,
      b.book_status,
      b.is_digital
      b.img_link
    FROM book b
    JOIN category c ON b.category_id = c.category_id
    JOIN author a ON b.author_id = a.author_id
    JOIN branch br ON b.branch_id = br.branch_id
    WHERE b.category_id = ?;
  `;

  const { rows, error } = await query<BookByCategory>(sql, [categoryId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, books: rows ?? [] });
}
