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
    }) as { name: string; email: string }[];

    for (const record of records) {
      const name = record.name;
      const email = record.email;

      if (!name || !email) continue;

      await pool.query(
        "INSERT INTO customers (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
        [name, email]
      );
    }

    return NextResponse.json({
      message: "Customers ingested successfully",
      count: records.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to ingest customers" },
      { status: 500 }
    );
  }
}
