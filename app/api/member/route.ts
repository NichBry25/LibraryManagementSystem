import { query } from "@/lib/sql";
import { NextResponse } from "next/server";
import { MemberRow } from "@/types/db";

export async function GET() {
  const sql = `
    SELECT
      member_id,
      first_name,
      last_name,
      phone_number,
      email,
      membership_start_date,
      membership_end_date,
      member_status
    FROM activeMembers
    WHERE member_status IN ('active', 'suspended')
    ORDER BY member_status DESC, last_name;
  `;

  const { rows, error } = await query<MemberRow>(sql);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, members: rows });
}
