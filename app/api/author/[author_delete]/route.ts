import { query } from "@/lib/sql";
import { NextResponse } from "next/server";

export async function DELETE(
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

  const sql = `
    DELETE FROM author
    WHERE author_id = ?;
  `;

  const { error } = await query(sql, [authorId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Author deleted successfully",
  });
}
