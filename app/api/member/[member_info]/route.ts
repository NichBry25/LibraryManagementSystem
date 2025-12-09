import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

interface MemberInfoRow extends RowDataPacket {
  member_id: number;
  member_name: string;
  membership_start_date: string;
  membership_end_date: string | null;
  member_status: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ member_info : string | string[] }> }
) {
  const { member_info } = await params;

  const idParam = Array.isArray(member_info) ? member_info[0] : member_info;
  const memberId = Number.parseInt(idParam, 10);

  if (Number.isNaN(memberId)) {
    return NextResponse.json(
      { success: false, error: "Invalid member id (info)" },
      { status: 400 }
    );
  }

  const sql = `
    SELECT
      member_id,
      CONCAT(first_name, ' ', last_name) AS member_name,
      membership_start_date,
      membership_end_date,
      member_status
    FROM activeMembers
    WHERE member_id = ?
      AND member_status IN ('active', 'suspended')
    LIMIT 1;
  `;

  const { rows, error } = await query<MemberInfoRow>(sql, [memberId]);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { success: false, error: "No information found for this member" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, member_info: rows });
}
