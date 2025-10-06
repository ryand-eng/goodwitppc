import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useConsent } from "../context/ConsentContext";
import { landingContent } from "../content/landingContent";
import "./ConsentGate.css";

const consentSchema = z.object({
  email: z.string().email(),
  accepted: z.array(z.boolean()).superRefine((values, ctx) => {
    if (values.some((value) => !value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "All statements must be accepted",
        path: ["accepted"]
      });
    }
  })
});

type ConsentFormValues = z.infer<typeof consentSchema>;

const policyVersion = "2025-03";

export const ConsentGate = () => {
  const navigate = useNavigate();
  const { record, recordConsent } = useConsent();
  const statements = landingContent.consentGate.statements;

  const form = useForm<ConsentFormValues>({
    resolver: zodResolver(consentSchema),
    defaultValues: {
      email: record?.accountEmail ?? "",
      accepted: statements.map(() => false)
    }
  });

  const onSubmit = (values: ConsentFormValues) => {
    const ipSource =
      typeof window !== "undefined" ? window.btoa(navigator.userAgent).slice(0, 32) : "unknown";
    const nextRecord = {
      accountEmail: values.email,
      acceptedStatements: statements,
      acceptedAt: new Date(),
      ipHash: ipSource,
      version: policyVersion
    } as const;
    recordConsent(nextRecord);
    navigate({ to: "/intake/start" });
  };

  const allAccepted = (form.watch("accepted") ?? []).every(Boolean);

  return (
    <form className="consent" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <h2>Consent</h2>
      <label className="consent__label">
        Contact Email
        <input
          type="email"
          {...form.register("email")}
          className="consent__input"
          placeholder="you@example.com"
          required
        />
      </label>
      {form.formState.errors.email && (
        <p className="consent__error">{form.formState.errors.email.message}</p>
      )}

      <fieldset className="consent__statements">
        <legend>Required statements</legend>
        {statements.map((statement, index) => (
          <label key={statement} className="consent__checkbox">
            <input
              type="checkbox"
              {...form.register(`accepted.${index}` as const)}
            />
            <span>{statement}</span>
          </label>
        ))}
        {form.formState.errors.accepted && (
          <p className="consent__error">{form.formState.errors.accepted.message}</p>
        )}
      </fieldset>
      <button type="submit" className="consent__submit" disabled={!allAccepted}>
        {landingContent.consentGate.proceedCta}
      </button>
    </form>
  );
};
