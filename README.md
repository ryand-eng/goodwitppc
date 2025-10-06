# Goodwit PPC Secure Intake Portal

This repository provides a security-forward intake experience for Amazon PPC clients. It delivers a landing page emphasizing privacy and consent, a multi-step onboarding form validated with Zod, and supporting schemas for sharing consent, landing content, and intake payload definitions across services.

## Frontend

The `frontend/` directory is a Vite + React workspace that contains:

- Landing page with consent gate and compliance summaries
- Intake workflow spanning start, review, and success routes
- Shared context for consent records and onboarding payload drafts
- React Hook Form + Zod validation covering every field and consent toggle
- Vitest tests that enforce legal acceptance before progressing

### Available scripts

```bash
cd frontend
npm install
npm run dev      # start the development server on http://localhost:5173
npm run build    # type-check and build production assets
npm run preview  # preview the production build
npm run test     # run unit tests with Vitest
```

## Shared schemas

The `shared/` directory hosts the Zod schemas for landing page content, consent records, and onboarding payloads. These modules can be imported by both frontend and backend services to guarantee consistent validation.

## Security posture

- Consent records are persisted client-side with local hashing for IP anonymization.
- Intake submission is staged in context for review before a simulated secure submission.
- Policy links, subprocessors, and data retention statements are surfaced throughout the experience to maintain transparency.
