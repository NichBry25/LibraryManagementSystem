import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface CurrentBorrow extends RowDataPacket {
  member_id: number;
  title: string;
  borrowed_at: string;
  due_date: string;
  return_date: string | null;
  fine_amount: number | null;
  borrowing_status: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ member_current_borrow: string | string[] }> }
) {
  const { member_current_borrow } = await params;

  const idParam = Array.isArray(member_current_borrow) ? member_current_borrow[0] : member_current_borrow;

  const memberId = Number.parseInt(idParam, 10);

  if (Number.isNaN(memberId)) {
    return NextResponse.json(
      { success: false, error: "Invalid member id (current borrowing)" },
      { status: 400 }
    );
  }

  const sql = `
    SELECT
      am.member_id,
      b.title,
      br.borrowed_at,
      br.due_date,
      br.return_date,
      br.fine_amount,
      CASE
        WHEN br.return_date IS NULL AND br.due_date < CURRENT_DATE
          THEN 'Overdue'
        WHEN br.return_date IS NULL
          THEN 'Currently Borrowed'
        ELSE 'Returned'
      END AS borrowing_status
    FROM borrowing br
    JOIN activeMembers am ON br.member_id = am.member_id
    JOIN book b ON br.book_id = b.book_id
    WHERE br.member_id = ?
      AND br.return_date IS NULL
    ORDER BY br.borrowed_at DESC;
  `;

  const { rows, error } = await query<CurrentBorrow>(sql, [memberId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, current_borrows: rows ?? [] });
}
