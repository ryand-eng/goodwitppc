import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { TOnboardingPayload } from "../../../shared/onboardingSchemas";

interface IntakeState {
  payload: TOnboardingPayload | null;
  setPayload: (payload: TOnboardingPayload) => void;
  clear: () => void;
}

const IntakeContext = createContext<IntakeState | undefined>(undefined);

export const IntakeProvider = ({ children }: { children: ReactNode }) => {
  const [payload, setPayloadState] = useState<TOnboardingPayload | null>(null);

  const setPayload = (next: TOnboardingPayload) => setPayloadState(next);
  const clear = () => setPayloadState(null);

  const value = useMemo(
    () => ({
      payload,
      setPayload,
      clear
    }),
    [payload]
  );

  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>;
};

export const useIntake = () => {
  const ctx = useContext(IntakeContext);
  if (!ctx) {
    throw new Error("useIntake must be used within IntakeProvider");
  }
  return ctx;
};
