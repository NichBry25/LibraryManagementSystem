import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface CreateBookRow extends RowDataPacket {
  insertId: number;
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
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
      { success: false, error: "Missing required book fields" },
      { status: 400 }
    );
  }

  const sql = `
    INSERT INTO book (
      title,
      author_id,
      category_id,
      year_published,
      branch_id,
      book_status,
      is_digital,
      img_link
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const { rows, error } = await query<CreateBookRow>(sql, [
    title,
    author_id,
    category_id,
    year_published,
    branch_id,
    book_status,
    is_digital,
    img_link
  ]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    book_id: rows.insertId,
  });
}
