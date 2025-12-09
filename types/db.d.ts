import type { RowDataPacket } from "mysql2";

export interface BookRow extends RowDataPacket {
  book_id: number;
  title: string;
  year_published: number;
  book_status: string;
  is_digital: 0 | 1;
  author_first: string;
  author_last: string;
  category_name: string;
  branch_name: string;
}

export interface MemberRow extends RowDataPacket {
  member_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  membership_start_date: string;
  membership_end_date?: string | null;
  member_status: string;
}

export interface BorrowingRow extends RowDataPacket {
  borrowing_id: number;
  member_id: number;
  book_id: number;
  borrowed_at: string;
  due_date: string;
  return_date?: string | null;
  fine_amount?: number | null;
  borrowing_status: string;
}