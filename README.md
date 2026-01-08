# Customer Analytics Platform

## Overview
The Customer Analytics Platform is a backend-driven data system that ingests raw customer and transaction data, stores it in a relational database, and exposes business metrics via APIs and a minimal frontend.

The project demonstrates real-world backend and data engineering concepts such as data ingestion, relational modeling, SQL-based analytics, and API-driven reporting.

---

## Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript
- **Backend:** Next.js API Routes (Node.js runtime)
- **Database:** PostgreSQL
- **Data Processing:** SQL
- **Deployment:** Vercel (frontend + APIs)
- **Version Control:** GitHub

---

## System Architecture
1. CSV files are uploaded via API endpoints
2. Backend parses and validates data
3. Data is stored in PostgreSQL using relational tables
4. SQL queries compute business metrics
5. Metrics are exposed through REST APIs
6. Frontend fetches and displays aggregated results

---

## Database Schema
### customers
- id (PK)
- name
- email
- created_at

### transactions
- id (PK)
- customer_id (FK → customers.id)
- amount
- transaction_date

---

## API Endpoints

### Ingest Customers
Uploads a CSV file with customer data.

**CSV Format:**
```csv
name,email
John Doe,john@example.com

Ingest Transactions
POST /api/ingest/transactions
Uploads a CSV file with transaction data linked to customers.

CSV Format:
customer_email,amount,transaction_date
john@example.com,100.50,2025-01-01

Metrics Summary
GET /api/metrics/summary

Response:
{
  "totalCustomers": 3,
  "totalRevenue": 425.75,
  "totalTransactions": 3
}

Frontend

The frontend provides a minimal dashboard that displays:

Total custom
ers

Total revenue

Total transactions

The UI is intentionally simple to keep focus on backend logic and data flow.

Local Setup
npm install
npm run dev

Create a .env.local file:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=customer_analytics


Deployment Notes

The application is deployed on Vercel.

The PostgreSQL database runs locally, so data ingestion and metrics APIs require local execution. This limitation is documented intentionally to reflect real-world deployment constraints.
Live Demo:
https://customer-analytics-platform-brown.vercel.app

Note: The application uses a local PostgreSQL database.
The deployed version demonstrates frontend rendering and API structure,
while full functionality is available when running locally.


Key Learnings

Designing ingestion pipelines for raw data

Relational data modeling with PostgreSQL

Writing SQL-based business metrics

API-driven analytics systems

End-to-end data flow from ingestion to visualization

Author
Abhishek Mane
FullStack Developer