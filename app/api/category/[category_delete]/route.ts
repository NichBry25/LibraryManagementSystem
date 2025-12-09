import { query } from "@/lib/sql";
import { NextResponse } from "next/server";

export async function DELETE(
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
    DELETE FROM category
    WHERE category_id = ?;
  `;

  const { error } = await query(sql, [categoryId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Category deleted successfully",
  });
}
