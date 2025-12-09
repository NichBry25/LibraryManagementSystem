import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface BookByStatus extends RowDataPacket {
  book_id: number;
  title: string;
  author_first: string;
  author_last: string;
  category_name: string;
  year_published: number;
  branch_name: string;
  book_status: string;
  is_digital: number;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ book_status: string | string[] }> }
) {
  const { book_status } = await params;

  const statusParam = Array.isArray(book_status) ? book_status[0] : book_status;

  if (!statusParam || typeof statusParam !== "string") {
    return NextResponse.json(
      { success: false, error: "Invalid book status" },
      { status: 400 }
    );
  }

  const sql = `
    SELECT
      b.book_id,
      b.title,
      a.first_name AS author_first,
      a.last_name AS author_last,
      c.category_name,
      b.year_published,
      br.branch_name,
      b.book_status,
      b.is_digital
    FROM book b
    JOIN author a ON b.author_id = a.author_id
    JOIN category c ON b.category_id = c.category_id
    JOIN branch br ON b.branch_id = br.branch_id
    WHERE b.book_status = ?;
  `;

  const { rows, error } = await query<BookByStatus>(sql, [statusParam]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, books: rows ?? [] });
}
