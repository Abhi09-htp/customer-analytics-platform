"use client";

import { useEffect, useState } from "react";

type Metrics = {
  totalCustomers: number;
  totalRevenue: number;
  totalTransactions: number;
};

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/metrics/summary")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load metrics");
        return res.json();
      })
      .then(setMetrics)
      .catch(() => setError("Unable to load metrics"));
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
