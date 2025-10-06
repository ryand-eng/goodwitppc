# Technical Specification: Amazon Advertising Automation Platform

## System Purpose & Core Modules

This platform is a comprehensive Amazon advertising management solution focused on automating and streamlining key client workflows. Primary modules include:

- **Client Onboarding**: Multi-step intake form capturing new client details. **Status:** Incomplete
- **Account Audits**: AI-powered analysis (Google Gemini) of listing quality, PPC coverage, and wasted spend. **Status:** Incomplete
- **Gap Analysis**: Strategic identification of missing campaign structures via a decision matrix. **Status:** Incomplete
- **Keyword Intelligence**: Search term performance and keyword opportunity analysis. **Status:** Incomplete
- **Task Automation**: Automatic syncing of findings and strategic actions to ClickUp. **Status:** Incomplete

## Technical Architecture

The system leverages a modern, scalable technology stack:

| Layer        | Technology                | Purpose                                                              | Status      |
|--------------|--------------------------|----------------------------------------------------------------------|-------------|
| Frontend     | React, TypeScript, Vite  | Fast, type-safe SPA for user interactions.                           | Incomplete  |
| Backend      | Fastify, tRPC, Zod       | High-performance, type-safe API on Google Cloud Run.                 | Incomplete  |
| AI Services  | Google Gemini            | Core engine for analysis and auditing.                               | Incomplete  |
| Storage      | IndexedDB (Current), PostgreSQL (Planned) | Demo uses browser storage; planned migration to SQL DB for production. | Incomplete  |
| Authentication | SessionStorage (Current), JWT (Planned) | Basic demo auth; planned transition to secure JWT-based auth.        | Incomplete  |
| Task Integration | ClickUp API (Planned) | Push platform outputs into project management workflows.             | Incomplete  |
| Deployment   | Google Cloud Run         | Serverless, containerized backend deployment.                        | Incomplete  |

## Planned Data Model (SQL Schema)

The backend will use a relational database schema with key tables. **All tables and persistence logic are incomplete.**

- **accounts**: Primary client info (name, status, contact).
- **brands & asins**: Client product catalog management.
- **kpis**: Client-specific performance targets (ACOS, TACOS, CVR, etc.).
- **audits, gaps, analyses**: JSON outputs from AI tools.
- **tasks**: Synced ClickUp actions, linked to source analyses.
- **files**: Metadata for uploaded assets, stored in cloud (S3/GCS).

## API & Data Flow

- **Frontend ↔ Backend**: Communication via tRPC ensures end-to-end type safety. **Incomplete**
- **Intake Flow**: Client submits onboarding form (browser storage, planned backend mutation: `client.create`). **Incomplete**
- **Analysis Flow**: Admin triggers tools (e.g. `audit.run`, `gap.run` mutations). **Incomplete**
- **AI Processing**: Backend fetches client data, constructs prompt, interacts with Google Gemini, receives structured JSON. **Incomplete**
- **Result Storage**: Analysis results saved in corresponding tables. **Incomplete**
- **Task Sync (Future)**: Analysis results parsed and actionable items pushed to ClickUp via API. **Incomplete**

## High-Level Roadmap

**Milestone 1:**  
- Foundational frontend and backend (`client.list` endpoint). **Incomplete**

**Milestone 2:**  
- Implement `client.create`, `audit.run`, `gap.run` mutations for core analysis workflows. **Incomplete**

**Milestone 3:**  
- Migrate data persistence to PostgreSQL. **Incomplete**

**Milestone 4:**  
- Integrate ClickUp for automated task creation. **Incomplete**

**Milestone 5:**  
- Add JWT-based authentication and Prometheus metrics. **Incomplete**

**Milestone 6:**  
- Refine AI prompts, establish CI/CD pipeline, complete automated workflow. **Incomplete**

---

**Notes:**  
- All modules and features are currently marked INCOMPLETE for a fresh build.
- AI analysis, integrations, and all persistence logic are to be scoped and implemented.