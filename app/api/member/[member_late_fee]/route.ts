import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface LateFeeRow extends RowDataPacket {
  member_id: number;
  title: string;
  days_late: number;
  fine_amount: number;
  payment_status: string | null;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ member_late_fee: string | string[] }> }
) {
  const { member_late_fee } = await params;

  const idParam = Array.isArray(member_late_fee) ? member_late_fee[0] : member_late_fee;

  const memberId = Number.parseInt(idParam, 10);

  if (Number.isNaN(memberId)) {
    return NextResponse.json(
      { success: false, error: "Invalid member id (late fee)" },
      { status: 400 }
    );
  }

  const sql = `
    SELECT
      br.member_id,
      b.title,
      CASE
        WHEN br.return_date IS NULL AND CURRENT_DATE > br.due_date
          THEN DATEDIFF(CURRENT_DATE, br.due_date)
        ELSE 0
      END AS days_late,
      CASE
        WHEN CURRENT_DATE > br.due_date
          THEN DATEDIFF(CURRENT_DATE, br.due_date) * 50000
        ELSE 0
      END AS fine_amount,
      CASE
        WHEN br.borrowing_status = 'Overdue'
          THEN 'Unpaid'
        ELSE 'Paid'
      END AS payment_status
    FROM borrowing br
    JOIN activeMembers am ON br.member_id = am.member_id
    JOIN book b ON br.book_id = b.book_id
    WHERE br.borrowing_status = 'Overdue'
      AND br.member_id = ?;
  `;

  const { rows, error } = await query<LateFeeRow>(sql, [memberId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { success: false, error: "No overdue borrowings found for this member" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, borrowings: rows });
}
