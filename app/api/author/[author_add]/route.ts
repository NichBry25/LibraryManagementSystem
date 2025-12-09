import { query } from "@/lib/sql";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { first_name, last_name } = body;

  if (!first_name || !last_name) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const sql = `
    INSERT INTO author (first_name, last_name)
    VALUES (?, ?);
  `;

  const params = [first_name, last_name];

  const { error } = await query(sql, params);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, message: "Author added successfully" });
}
