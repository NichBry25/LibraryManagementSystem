import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface UpdateBookRow extends RowDataPacket {
  affectedRows: number;
}

export async function PUT(req: Request) {
  const body = await req.json();

  const {
    book_id,
    title,
    author_id,
    category_id,
    year_published,
    branch_id,
    book_status,
    is_digital,
    img_link
  } = body;

  if (
    !book_id ||
    !title ||
    !author_id ||
    !category_id ||
    !year_published ||
    !branch_id ||
    !book_status ||
    !is_digital ||
    !img_link === undefined
  ) {
    return NextResponse.json(
      { success: false, error: "Missing required fields for book update" },
      { status: 400 }
    );
  }

  const sql = `
    UPDATE book
    SET
      title = ?,
      author_id = ?,
      category_id = ?,
      year_published = ?,
      branch_id = ?,
      book_status = ?,
      is_digital = ?
      img_link = ?
    WHERE book_id = ?;
  `;

  const { rows, error } = await query<UpdateBookRow>(sql, [
    title,
    author_id,
    category_id,
    year_published,
    branch_id,
    book_status,
    is_digital,
    img_link,
    book_id,
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
