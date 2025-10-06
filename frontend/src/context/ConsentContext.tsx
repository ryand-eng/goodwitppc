import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { ConsentRecord, TConsentRecord } from "../../../shared/consentSchemas";

const STORAGE_KEY = "goodwitppc.consent";

type ConsentState = {
  record: TConsentRecord | null;
  recordConsent: (record: TConsentRecord) => void;
  revokeConsent: () => void;
};

const ConsentContext = createContext<ConsentState | undefined>(undefined);

export const ConsentProvider = ({ children }: { children: ReactNode }) => {
  const [record, setRecord] = useState<TConsentRecord | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = ConsentRecord.parse(JSON.parse(stored));
        setRecord(parsed);
      } catch (error) {
        console.warn("Invalid consent record in storage", error);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const recordConsent = (next: TConsentRecord) => {
    setRecord(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  const revokeConsent = () => {
    setRecord(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({
      record,
      recordConsent,
      revokeConsent
    }),
    [record]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

export const useConsent = () => {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
};
