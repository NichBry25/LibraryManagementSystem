import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface HistoryRow extends RowDataPacket {
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
  { params }: { params: Promise<{ member_details : string | string[] }> }
) {
  const { member_details } = await params;

  const idParam = Array.isArray(member_details) ? member_details[0] : member_details;
  const memberId = Number.parseInt(idParam, 10);

  if (Number.isNaN(memberId)) {
    return NextResponse.json({ success: false, error: "Invalid member id" }, { status: 400 });
  }

  const sql = `
    SELECT
      am.member_id,
      am.first_name AS member_first_name,
      am.last_name AS member_last_name,
      b.title AS book_title,
      br.borrowed_at,
      br.due_date,
      br.return_date,
      br.fine_amount,
      CASE
        WHEN br.return_date IS NULL AND br.due_date < CURDATE() THEN 'Overdue'
        WHEN br.return_date IS NULL THEN 'Currently Borrowed'
        ELSE 'Returned'
      END AS borrowing_status
    FROM borrowing br
    JOIN activeMembers am ON br.member_id = am.member_id
    JOIN book b ON br.book_id = b.book_id
    WHERE br.member_id = ?
    ORDER BY br.borrowed_at DESC;
  `;

  const { rows, error } = await query<HistoryRow>(sql, [memberId]);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  if (!rows || rows.length === 0) {
    return NextResponse.json({ success: false, error: "No borrowing history for this member" }, { status: 404 });
  }

  return NextResponse.json({ success: true, history: rows });
}
