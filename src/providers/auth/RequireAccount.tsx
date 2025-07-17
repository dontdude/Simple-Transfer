import React from "react";
import { useAccountStore } from "../../store/account.store";
import { AccountPrompt } from "./components/AccountPrompt";

interface RequireAccountProps {
  children: React.ReactNode;
}

export const RequireAccount = ({ children }: RequireAccountProps) => {
  const accountId = useAccountStore((state) => state.accountId);

  if (!accountId) {
    return <AccountPrompt />;
  }

  return <>{children}</>;
};
