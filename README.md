# Customer Analytics Platform

## Overview
The Customer Analytics Platform is a production-ready, backend-driven analytics system that ingests raw CSV data, stores it in a relational PostgreSQL database, and exposes aggregated business metrics through REST APIs and a minimal frontend dashboard.

This project is intentionally designed to demonstrate **real-world backend and data engineering concepts**, including data ingestion pipelines, relational modeling, SQL-based analytics, and cloud deployment.

---

## Live Demo
**Frontend (Production):**  
https://customer-analytics-platform-brown.vercel.app

**Metrics API:**  
https://customer-analytics-platform-brown.vercel.app/api/metrics/summary

---

## Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript  
- **Backend:** Next.js API Routes (Node.js runtime)  
- **Database:** PostgreSQL (Supabase – hosted cloud database)  
- **Data Processing:** SQL  
- **Deployment:** Vercel  
- **Version Control:** GitHub  

---

## System Architecture
1. CSV files are uploaded through REST API endpoints
2. Backend validates and parses the raw data
3. Data is stored in PostgreSQL using relational tables
4. SQL queries compute business-level metrics
5. Metrics are exposed via APIs
6. Frontend fetches and displays aggregated results

This architecture mirrors real production data pipelines used in analytics systems.

---

## Database Schema

### customers
| Column | Type | Description |
|------|------|-------------|
| id | UUID (PK) | Unique customer identifier |
| name | TEXT | Customer name |
| email | TEXT | Unique customer email |
| created_at | TIMESTAMP | Record creation time |

### transactions
| Column | Type | Description |
|------|------|-------------|
| id | UUID (PK) | Transaction ID |
| customer_id | UUID (FK) | References customers.id |
| amount | NUMERIC | Transaction amount |
| transaction_date | DATE | Date of transaction |

---

## API Endpoints

### Ingest Customers
Uploads a CSV file containing customer data.

**Endpoint**

POST /api/ingest/customers

name,email
John Doe,john@example.com
Jane Smith,jane@example.com

Ingest Transactions

Uploads a CSV file containing transaction data linked to customers.

Endpoint

POST /api/ingest/transactions

customer_email,amount,transaction_date
john@example.com,100.50,2025-01-01

Metrics Summary

Returns aggregated business metrics.

Endpoint
GET /api/metrics/summary

Response

{
  "totalCustomers": 3,
  "totalRevenue": 425.75,
  "totalTransactions": 3
}

API Demo (Production)
Upload Customers

curl -X POST -F "file=@customers.csv" \
https://customer-analytics-platform-brown.vercel.app/api/ingest/customers

Upload Transactions
curl -X POST -F "file=@transactions.csv" \
https://customer-analytics-platform-brown.vercel.app/api/ingest/transactions

Frontend

The frontend provides a minimal dashboard that displays:

Total customers

Total revenue

Total transactions

The UI is intentionally simple to keep the focus on backend logic, data flow, and analytics correctness.

Local Development
npm install
npm run dev

Create a .env.local file:
DB_HOST=your_db_host
DB_PORT=6543
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=postgres

Deployment Notes

The application is deployed on Vercel

PostgreSQL is hosted on Supabase

The production deployment is fully functional and backed by a cloud database

Environment variables are securely managed via Vercel

Key Learnings

Designing CSV ingestion pipelines

Relational data modeling with PostgreSQL

Writing SQL-based business metrics

API-driven analytics systems

Cloud deployment with environment configuration

End-to-end data flow from ingestion to visualization


Author
Abhishek Mane
Full Stack Developer
