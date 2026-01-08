import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { parse } from "csv-parse/sync";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "CSV file is required" },
        { status: 400 }
      );
    }

    const text = await file.text();

    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
    }) as {
      customer_email: string;
      amount: string;
      transaction_date: string;
    }[];

    for (const record of records) {
      const customerEmail = record.customer_email;
      const amount = record.amount;
      const transactionDate = record.transaction_date;

      if (!customerEmail || !amount || !transactionDate) continue;

      const customerResult = await pool.query(
        "SELECT id FROM customers WHERE email = $1",
        [customerEmail]
      );

      if (customerResult.rows.length === 0) continue;

      const customerId = customerResult.rows[0].id;

      await pool.query(
        `INSERT INTO transactions (customer_id, amount, transaction_date)
         VALUES ($1, $2, $3)`,
        [customerId, amount, transactionDate]
      );
    }

    return NextResponse.json({
      message: "Transactions ingested successfully",
      count: records.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to ingest transactions" },
      { status: 500 }
    );
  }
}
