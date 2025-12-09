import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface CurrentBorrow extends RowDataPacket {
  member_id: number;
  member_first_name: string;
  member_last_name: string;
  book_title: string;
  borrowed_at: string | null;
  due_date: string | null;
  return_date: string | null;
  fine_amount: number | null;
  borrowing_status: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ member_current_borrow : string | string[] }> }
) {
  const { member_current_borrow } = await params;

  const idParam = Array.isArray(member_current_borrow) ? member_current_borrow : member_current_borrow;
  const memberId = Number.parseInt(idParam, 10);

  if (Number.isNaN(memberId)) {
    return NextResponse.json(
      { success: false, error: "Invalid member id (current borrowing)" },
      { status: 400 }
    );
  }

  const sql = `
    SELECT
      member_id,
      member_first_name,
      member_last_name,
      book_title,
      borrowed_at,
      due_date
    FROM borrowing br
    WHERE borrowing_status = 'Currently Borrowed';
  `;

  const { rows, error } = await query<CurrentBorrow>(sql, [memberId]);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, borrowing: rows ?? [] });
}
