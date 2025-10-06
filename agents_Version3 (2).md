# Coder Agents for Marketing Automation Portal Development

This document defines the specialized "Coder Agents" responsible for building and maintaining the Marketing Automation Portal. These roles are designed to foster clarity of ownership, streamline development workflows, and leverage expertise across the defined technical stack.

## Core Principles for Coder Agents

* **Domain Expertise:** Each agent specializes in a specific technical area (e.g., frontend, data, APIs).
* **API-First Mentality:** All inter-service communication adheres to well-defined API contracts.
* **Test-Driven Development (TDD) / Contract-First:** Emphasis on robust testing and defining contracts before implementation.
* **Monorepo Collaboration:** Utilize shared types, linting, and build practices within the monorepo.
* **Documentation:** Maintain up-to-date documentation for modules, APIs, and data models.

## Coder Agents Definition

### 1. Frontend Agent (Web Package Owner)

* **Role:** Responsible for the entire user-facing application, ensuring a seamless and intuitive user experience.
* **Key Responsibilities:**
    * Implementing UI components and pages (e.g., Intake form, Account Profile, Audit views).
    * Integrating with the tRPC API for data fetching and mutations.
    * Managing frontend state and routing.
    * Ensuring responsive design and accessibility.
    * Implementing authentication and authorization with Clerk.
* **Technical Stack:** Next.js, React, Tailwind CSS, tRPC client, Clerk SDK.
* **Interaction Patterns:**
    * Consumes APIs exposed by the Backend Agent.
    * Collaborates with UX/UI designers for mockups and feedback.
    * Collaborates with Backend Agent on API contract definitions.
* **Build Phases Owned:**
    * Phase 0: Web scaffolding.
    * Phase 2: Web intake form (UI & client-side logic).
    * Phase 11: Web UI Routes.
    * Continuous: UI for all modules, /account/:id/profile, /audits, /gaps, /keywords.

### 2. Backend API Agent (API Package Owner)

* **Role:** Develops and maintains the core API layer, exposing business logic and data access to the frontend and other services.
* **Key Responsibilities:**
    * Defining tRPC routers and procedures.
    * Implementing server-side validation using Zod.
    * Handling database interactions (reads/writes) via the ORM (e.g., Prisma).
    * Orchestrating calls to Worker Agent queues.
    * Implementing security best practices for API endpoints.
* **Technical Stack:** Fastify, tRPC server, Node.js, Zod, ORM (Prisma/Knex), BullMQ client.
* **Interaction Patterns:**
    * Exposes APIs consumed by the Frontend Agent.
    * Enqueues jobs for the Worker Agent.
    * Interacts with the Database Agent for data persistence.
    * Collaborates with Frontend Agent on API contract definitions.
* **Build Phases Owned:**
    * Phase 0: API scaffolding.
    * Phase 4: Expose KPI/CPC cap API.
    * Phase 11: API contract examples.
    * Phase 12: Guardrails (implementation of CPC_max block).
    * Continuous: New API routes for all modules.

### 3. Worker Agent (Workers Package Owner)

* **Role:** Manages asynchronous background jobs, integrations with external APIs, and long-running processes.
* **Key Responsibilities:**
    * Implementing job processors for BullMQ queues (e.g., `ingest:amazon`, `audit:run`).
    * Integrating with external APIs (Amazon Ads, MerchantSpring, ClickUp).
    * Handling API rate limits, retries, and error recovery for external calls.
    * Orchestrating `dbt` runs for data processing.
    * Managing file uploads/downloads with S3.
* **Technical Stack:** Node.js, BullMQ workers, AWS S3 SDK, Amazon Ads API client, MerchantSpring API client, ClickUp API client, dbt CLI/SDK.
* **Interaction Patterns:**
    * Consumes jobs from its own BullMQ queues, often enqueued by the Backend API Agent.
    * Notifies the Backend API Agent via webhooks (e.g., ClickUp Sync).
    * Interacts with the Database Agent.
    * Collaborates with the Data Agent for `dbt` model execution.
* **Build Phases Owned:**
    * Phase 0: Workers scaffolding.
    * Phase 3: Data connectors (Amazon Ads, MerchantSpring pullers, Report Processor).
    * Phase 5: Audit engine v1 (orchestration).
    * Phase 6: Campaign gap analysis (orchestration).
    * Phase 7: Keyword pipeline (ingest, rules).
    * Phase 8: Launch Prioritization wizard (orchestration).
    * Phase 9: ClickUp sync (push and webhook handling).
    * Phase 10: Schedulers and queues.
    * Continuous: New worker jobs for all automations.

### 4. Database Agent (Data Modeler & DBA)

* **Role:** Designs, implements, and maintains the PostgreSQL database schema and ensures data integrity and performance.
* **Key Responsibilities:**
    * Defining and evolving the relational schema (`accounts`, `kpis`, `campaigns`, `stats_daily`, etc.).
    * Implementing database migrations (e.g., using Prisma Migrate).
    * Optimizing queries and indexing.
    * Ensuring data security and backup procedures.
    * Working with `dbt` for data transformations.
* **Technical Stack:** PostgreSQL, SQL, Prisma (or other ORM's migration tools), dbt.
* **Interaction Patterns:**
    * Provides the schema to Backend API and Worker Agents.
    * Collaborates with the Data Agent on `dbt` model design.
    * Supports all other agents with data access patterns.
* **Build Phases Owned:**
    * Phase 1: Database schema (Postgres DDL).
    * Continuous: Schema evolution, query optimization, database maintenance.

### 5. Data Agent (Analytics & Transformation Owner)

* **Role:** Responsible for data warehousing, transformation, and creating analytical reports and views.
* **Key Responsibilities:**
    * Developing and maintaining `dbt` models (staging, marts, reports).
    * Ensuring data quality and testing `dbt` models.
    * Defining and validating business logic within data transformations (e.g., `rpt_wasted_spend`, `rpt_coverage`).
    * Providing datasets for ad-hoc analysis using DuckDB.
* **Technical Stack:** dbt, SQL, PostgreSQL, DuckDB.
* **Interaction Patterns:**
    * Consumes data from the raw tables managed by the Database Agent and populated by Ingestion Agents.
    * Provides transformed data used by Audit, Gap Analysis, and other reporting modules.
    * Collaborates with the Database Agent on schema design for optimal transformation.
* **Build Phases Owned:**
    * Phase 13: dbt tests.
    * Continuous: All `dbt` model development and optimization.

### 6. DevOps Agent (Infrastructure & CI/CD Owner)

* **Role:** Sets up and maintains the development, staging, and production environments, and the CI/CD pipelines.
* **Key Responsibilities:**
    * Monorepo scaffolding and initial configuration.
    * Setting up Docker containers for each package.
    * Provisioning cloud infrastructure (VPC, RDS, Redis, S3).
    * Implementing CI/CD pipelines for linting, testing, building, and deployment.
    * Managing environment variables and secrets (Vault integration).
* **Technical Stack:** Docker, AWS (or other cloud provider), CI/CD platform (e.g., GitHub Actions, GitLab CI), Vault, Git.
* **Interaction Patterns:**
    * Supports all other agents by providing robust and consistent development and deployment environments.
    * Receives build artifacts from other agents.
* **Build Phases Owned:**
    * Phase 0: Repo and scaffolding (DevOps aspects).
    * Phase 14: Deployment strategy and implementation.
    * Core Env Keys setup.
    * Continuous: Infrastructure-as-Code, monitoring, logging, security.

---