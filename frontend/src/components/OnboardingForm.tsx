import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useFieldArray, useForm } from "react-hook-form";
import { Access, KPIs, OnboardingPayload, TOnboardingPayload } from "../../../shared/onboardingSchemas";
import { useConsent } from "../context/ConsentContext";
import { useIntake } from "../context/IntakeContext";
import "./OnboardingForm.css";

type OnboardingFormValues = TOnboardingPayload;

export const OnboardingForm = () => {
  const { record } = useConsent();
  const { setPayload } = useIntake();
  const navigate = useNavigate();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(OnboardingPayload),
    defaultValues: {
      contact: {
        company: "",
        contactName: "",
        email: record?.accountEmail ?? "",
        timezone: "",
        spendRange: "lt_10k"
      },
      access: {
        sellerId: "",
        adsProfileId: "",
        region: "US",
        brandRegistry: false,
        accessGranted: false
      },
      kpis: {
        targetAcos: 0,
        tacosGuard: 0,
        cvrTarget: 0,
        avgPrice: 1,
        primaryFocus: "ACOS"
      },
      products: [
        {
          brand: "",
          asin: "",
          sku: "",
          isHero: true
        }
      ],
      assets: {
        logoUrl: "",
        imageUrls: [],
        aPlusPdfUrl: ""
      },
      legal: {
        acceptsPrivacy: false,
        acceptsTerms: false,
        acceptsDPA: false,
        dataDeletionContact: record?.accountEmail ?? "",
        policyVersion: "2025-03"
      }
    }
  });

  const products = useFieldArray({ control: form.control, name: "products" });

  const onSubmit = (values: OnboardingFormValues) => {
    const normalized: TOnboardingPayload = {
      ...values,
      assets: {
        ...values.assets,
        imageUrls:
          values.assets.imageUrls && values.assets.imageUrls.length > 0
            ? values.assets.imageUrls
            : undefined
      },
      legal: {
        ...values.legal,
        acceptsDPA: values.legal.acceptsDPA ?? false
      }
    };
    setPayload(normalized);
    navigate({ to: "/intake/review" });
  };

  return (
    <form className="onboarding" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <section>
        <h2>Contact</h2>
        <div className="onboarding__grid">
          <label>
            Company
            <input type="text" {...form.register("contact.company")} required />
          </label>
          <label>
            Contact name
            <input type="text" {...form.register("contact.contactName")} required />
          </label>
          <label>
            Email
            <input type="email" {...form.register("contact.email")} required />
          </label>
          <label>
            Timezone
            <input type="text" {...form.register("contact.timezone")} required />
          </label>
          <label>
            Monthly spend range
            <select {...form.register("contact.spendRange")}>
              <option value="lt_10k">Under $10k</option>
              <option value="10to50k">$10k–$50k</option>
              <option value="gt_50k">Above $50k</option>
            </select>
          </label>
        </div>
      </section>

      <section>
        <h2>Access credentials</h2>
        <div className="onboarding__grid">
          <label>
            Seller ID
            <input type="text" {...form.register("access.sellerId")} required />
          </label>
          <label>
            Amazon Ads profile ID
            <input type="text" {...form.register("access.adsProfileId")} required />
          </label>
          <label>
            Region
            <select {...form.register("access.region")}>
              {Access.shape.region.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="onboarding__checkbox">
            <input type="checkbox" {...form.register("access.brandRegistry")} />
            Brand Registry administrator confirmed
          </label>
          <label className="onboarding__checkbox">
            <input type="checkbox" {...form.register("access.accessGranted", { required: true })} />
            Access invitation to security@goodwitppc.example sent
          </label>
        </div>
      </section>

      <section>
        <h2>Performance guardrails</h2>
        <div className="onboarding__grid">
          <label>
            Target ACOS (%)
            <input type="number" step="0.1" {...form.register("kpis.targetAcos", { valueAsNumber: true })} />
          </label>
          <label>
            TACOS guard (%)
            <input type="number" step="0.1" {...form.register("kpis.tacosGuard", { valueAsNumber: true })} />
          </label>
          <label>
            CVR target (%)
            <input type="number" step="0.1" {...form.register("kpis.cvrTarget", { valueAsNumber: true })} />
          </label>
          <label>
            Average unit price ($)
            <input type="number" step="0.01" {...form.register("kpis.avgPrice", { valueAsNumber: true })} />
          </label>
          <label>
            Primary focus
            <select {...form.register("kpis.primaryFocus")}>
              {KPIs.shape.primaryFocus.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section>
        <h2>Products</h2>
        <div className="onboarding__list">
          {products.fields.map((field, index) => (
            <div key={field.id} className="onboarding__card">
              <div className="onboarding__grid">
                <label>
                  Brand
                  <input type="text" {...form.register(`products.${index}.brand` as const)} required />
                </label>
                <label>
                  ASIN
                  <input type="text" {...form.register(`products.${index}.asin` as const)} required />
                </label>
                <label>
                  SKU (optional)
                  <input type="text" {...form.register(`products.${index}.sku` as const)} />
                </label>
                <label className="onboarding__checkbox">
                  <input type="checkbox" {...form.register(`products.${index}.isHero` as const)} />
                  Hero product
                </label>
              </div>
              {products.fields.length > 1 && (
                <button
                  type="button"
                  className="onboarding__remove"
                  onClick={() => products.remove(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="onboarding__add"
          onClick={() =>
            products.append({ brand: "", asin: "", sku: "", isHero: false })
          }
        >
          Add product
        </button>
      </section>

      <section>
        <h2>Assets</h2>
        <div className="onboarding__grid">
          <label>
            Logo URL
            <input type="url" {...form.register("assets.logoUrl")} required />
          </label>
          <label>
            Image URLs (comma separated)
            <input
              type="text"
              {...form.register("assets.imageUrls" as const, {
                setValueAs: (value: unknown) => {
                  if (Array.isArray(value)) {
                    return value;
                  }
                  if (typeof value !== "string") {
                    return [];
                  }
                  return value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean);
                }
              })}
              placeholder="https://..."
            />
          </label>
          <label>
            A+ Content PDF URL (optional)
            <input type="url" {...form.register("assets.aPlusPdfUrl")} />
          </label>
        </div>
      </section>

      <section>
        <h2>Legal</h2>
        <div className="onboarding__grid">
          <label className="onboarding__checkbox">
            <input type="checkbox" {...form.register("legal.acceptsPrivacy", { required: true })} />
            Privacy policy accepted
          </label>
          <label className="onboarding__checkbox">
            <input type="checkbox" {...form.register("legal.acceptsTerms", { required: true })} />
            Terms of service accepted
          </label>
          <label className="onboarding__checkbox">
            <input type="checkbox" {...form.register("legal.acceptsDPA")} />
            DPA required
          </label>
          <label>
            Data deletion contact email
            <input type="email" {...form.register("legal.dataDeletionContact")} required />
          </label>
          <label>
            Policy version
            <input type="text" {...form.register("legal.policyVersion")} required />
          </label>
        </div>
      </section>

      {form.formState.errors.root && (
        <p className="onboarding__error">{form.formState.errors.root.message}</p>
      )}

      <div className="onboarding__actions">
        <button type="submit">Review submission</button>
      </div>
    </form>
  );
};
