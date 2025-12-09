import { query } from "@/lib/sql";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ author_id: string | string[] }> }
) {
  const { author_id } = await params;

  const idParam = Array.isArray(author_id) ? author_id[0] : author_id;
  const authorId = Number.parseInt(idParam, 10);

  if (Number.isNaN(authorId)) {
    return NextResponse.json(
      { success: false, error: "Invalid author ID" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const { first_name, last_name, biography } = body;

  const sql = `
    UPDATE author
    SET
      first_name = COALESCE(?, first_name),
      last_name = COALESCE(?, last_name)
    WHERE author_id = ?;
  `;

  const paramsSql = [
    first_name ?? null,
    last_name ?? null,
    authorId,
  ];

  const { error } = await query(sql, paramsSql);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, message: "Author updated successfully" });
}
