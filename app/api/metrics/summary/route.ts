import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const customersResult = await pool.query(
      "SELECT COUNT(*) AS total_customers FROM customers"
    );

    const revenueResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS total_revenue FROM transactions"
    );

    const transactionsResult = await pool.query(
      "SELECT COUNT(*) AS total_transactions FROM transactions"
    );

    return NextResponse.json({
      totalCustomers: Number(customersResult.rows[0].total_customers),
      totalRevenue: Number(revenueResult.rows[0].total_revenue),
      totalTransactions: Number(transactionsResult.rows[0].total_transactions),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
