"use client";

import { useEffect, useState } from "react";

type Metrics = {
  totalCustomers: number;
  totalRevenue: number;
  totalTransactions: number;
};

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/metrics/summary");

        if (!res.ok) {
          throw new Error("Failed to fetch metrics");
        }

        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load metrics at the moment."
        );
      }
    };

    fetchMetrics();
  }, []);

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Customer Analytics Platform</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!metrics && !error && <p>Loading metrics...</p>}

      {metrics && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Total Customers:</strong> {metrics.totalCustomers}</p>
          <p><strong>Total Revenue:</strong> ₹{metrics.totalRevenue}</p>
          <p><strong>Total Transactions:</strong> {metrics.totalTransactions}</p>
        </div>
      )}
    </main>
  );
}
