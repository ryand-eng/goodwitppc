# AI Agents for Marketing Automation Portal

This document describes the design and responsibilities of various AI agents within the Marketing Automation Portal. These agents are designed to perform specific, atomic tasks, interact with defined tools, and coordinate with each other to achieve the system's overall goal of automating client onboarding, auditing, analysis, and task management.

## Core Principles

* **Autonomy within Scope:** Each agent operates independently within its defined responsibilities.
* **Tool-Use Driven:** Agents primarily interact with the system through a set of defined tools (APIs, database, S3, queues).
* **Event-Driven:** Agents react to specific triggers (e.g., new data in a queue, a cron schedule, an API call).
* **Output Focus:** Agents produce structured outputs (e.g., updated database records, enqueued jobs, generated reports).
* **Error Handling:** Agents include robust error detection and reporting mechanisms.

## Agents Definition

### 1. Intake Agent

* **Role:** Facilitates the initial client data collection and onboarding initiation.
* **Triggers:** `POST /intake/submit` API call from the Web UI.
* **Input:** Client details (account name, KPIs, brands, ASINs, initial files).
* **Tools:** DB, S3 Client, Queue (`access:check`)
* **Outputs:** New/updated database records, enqueued `access:check` job.
* **Error Handling:** Report validation errors to the Web UI; log DB/S3 errors.

### 2. Access Verification Agent

* **Role:** Verifies connectivity and permissions to client advertising accounts.
* **Triggers:** `access:check` job in the worker queue.
* **Input:** `account_id`
* **Tools:** Amazon Ads API, Seller Central API, DB, Queue (`am:alert`), Changelog Agent
* **Outputs:** Updated account status, optional alert job, changelog entry.
* **Error Handling:** Handle API errors, distinguish temporary/permanent access issues.

### 3. Data Ingestion Agent (Amazon Ads)

* **Role:** Periodically pulls campaign and performance data from Amazon Ads API.
* **Triggers:** `ingest:amazon` job (scheduled/ad-hoc).
* **Input:** `account_id`, `start_date`, `end_date`
* **Tools:** Amazon Ads API, DB, Changelog Agent
* **Outputs:** Updated records, changelog entry.
* **Error Handling:** Retry API, log entity errors, skip problematic records.

### 4. Data Ingestion Agent (MerchantSpring)

* **Role:** Periodically pulls aggregated data from MerchantSpring.
* **Triggers:** `ingest:ms` job (scheduled/ad-hoc).
* **Input:** `account_id`, `date_range`
* **Tools:** MerchantSpring API, S3 Client, DB
* **Outputs:** Raw S3 data, updated stats_daily.
* **Error Handling:** Handle API rate limits, schema changes.

### 5. Data Processing Agent (Report Processor)

* **Role:** Normalizes, aggregates, and computes derived metrics for the data warehouse.
* **Triggers:** Hourly cron job, after ingestion agents complete.
* **Input:** `account_id`, optionally `date_range`
* **Tools:** dbt CLI/SDK, DB
* **Outputs:** Updated dbt tables/views.
* **Error Handling:** Monitor dbt failures, log data quality issues.

### 6. KPI Calculation Agent

* **Role:** Calculates and updates key performance indicators, specifically `CPC_cap`.
* **Triggers:** After kpis update, daily cron.
* **Input:** `account_id`
* **Tools:** DB
* **Outputs:** Updated kpis.cpc_cap.
* **Error Handling:** Ensure required metrics are present.

### 7. Audit Agent

* **Role:** Executes various audit checks and identifies areas for improvement.
* **Triggers:** `audit:run` job (scheduled/ad-hoc).
* **Input:** `account_id`
* **Tools:** DB, Reporting Tools, ClickUp Push Agent
* **Outputs:** audits record, audit deck (S3), enqueued ClickUp jobs.
* **Error Handling:** Log audit check failures, continue with others.

### 8. Gap Analysis Agent

* **Role:** Compares campaign structure against Decision Matrix.
* **Triggers:** `gaps:run` job (scheduled/ad-hoc).
* **Input:** `account_id`
* **Tools:** DB
* **Outputs:** gaps records, optional ClickUp jobs.
* **Error Handling:** Handle incomplete/malformed campaign data.

### 9. Keyword Management Agent

* **Role:** Automates keyword discovery, scoring, harvesting, and negation.
* **Triggers:** keywords:ingest, rules:harvest, rules:negate jobs.
* **Input:** `account_id`, search_terms, performance data.
* **Tools:** DB, OpenAI API (optional), ClickUp Push Agent
* **Outputs:** Updated keywords/search_terms, tasks, ClickUp jobs.
* **Error Handling:** Manage rate limits, ambiguous intent.

### 10. Launch Prioritization Agent

* **Role:** Generates phased plan for new launches/builds.
* **Triggers:** `POST /launch/prioritize`
* **Input:** `account_id`, gaps, budget, KPIs.
* **Tools:** DB, ClickUp Push Agent
* **Outputs:** Enqueued ClickUp build tasks.
* **Error Handling:** Warn for insufficient budget/missing KPIs.

### 11. ClickUp Push Agent

* **Role:** Pushes tasks/subtasks/updates to ClickUp.
* **Triggers:** clickup:push job
* **Input:** `account_id`, tasks[]
* **Tools:** ClickUp API, DB
* **Outputs:** Tasks in ClickUp, updated tasks record.
* **Error Handling:** API errors, rate limits, error mapping.

### 12. ClickUp Sync Agent

* **Role:** Receives webhooks from ClickUp to update internal statuses.
* **Triggers:** `POST /clickup/webhook`
* **Input:** Webhook payload
* **Tools:** DB, Changelog Agent
* **Outputs:** Updated tasks record, changelog entry.
* **Error Handling:** Verify webhook, handle unexpected payloads.

### 13. CPC Guard Agent

* **Role:** Prevents bids from exceeding CPC_cap.
* **Triggers:** Any bid write action.
* **Input:** Proposed bid, target/ad_group ID.
* **Tools:** DB
* **Outputs:** Allow/block bid, changelog entry.
* **Error Handling:** Clear block reason.

### 14. Coverage Watcher Agent

* **Role:** Monitors coverage report and alerts if campaigns are missing.
* **Triggers:** Scheduled job (daily after gap analysis).
* **Input:** `account_id`
* **Tools:** DB, Queue (am:alert)
* **Outputs:** Optional alert job.
* **Error Handling:** Configurable thresholds.

### 15. File Storage Agent (Internal Helper)

* **Role:** Handles S3 interactions.
* **Triggers:** Requests from other agents.
* **Input:** File data, account_id, label, s3_key.
* **Tools:** AWS S3 SDK, DB
* **Outputs:** File in S3, files record.
* **Error Handling:** S3 connectivity/access issues.

### 16. Changelog Agent (Internal Helper)

* **Role:** Centralized event logging.
* **Triggers:** Log requests from any agent.
* **Input:** account_id, actor, action, details_json.
* **Tools:** DB
* **Outputs:** changelog record.
* **Error Handling:** Highly resilient logging.

---
