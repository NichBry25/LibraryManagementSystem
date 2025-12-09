import { query } from "@/lib/sql";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ book_id: string | string[] }> }
) {
  const { book_id } = await params;

  const idParam = Array.isArray(book_id) ? book_id[0] : book_id;
  const bookId = Number.parseInt(idParam, 10);

  if (Number.isNaN(bookId)) {
    return NextResponse.json(
      { success: false, error: "Invalid book ID" },
      { status: 400 }
    );
  }

  const sql = `
    DELETE FROM book
    WHERE book_id = ?;
  `;

  const { error } = await query(sql, [bookId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Book deleted successfully",
  });
}
