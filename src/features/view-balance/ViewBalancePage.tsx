import { useState, useEffect, useCallback } from "react";
import { useAccountStore } from "../../store/account.store";
import { getAccountBalance } from "../../api/transferService";
import type { GetBalanceResponse } from "../../types/api.types";
import { showError } from "../../hooks/useToast";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import { Button } from "../../components/Button/Button";
import { RequireAccount } from "../../providers/auth/RequireAccount"; // Import the guard
import { BalanceDisplay } from "./components/BalanceDisplay";
import styles from "./ViewBalancePage.module.css";

export const ViewBalancePage = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const [balanceData, setBalanceData] = useState<GetBalanceResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!accountId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await getAccountBalance(accountId);
      setBalanceData(data);
    } catch (err) {
      setError("Failed to fetch account balance.");
      showError("Unable to fetch balance. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const renderContent = () => {
    if (isLoading) {
      return <Spinner size="lg" />;
    }

    if (error) {
      return (
        <div className={styles.centeredMessage}>
          <p className="error-message">{error}</p>
          <Button onClick={fetchBalance} disabled={isLoading}>
            Retry
          </Button>
        </div>
      );
    }

    if (balanceData) {
      return (
        <Card>
          <BalanceDisplay
            accountId={balanceData.account_id}
            balance={balanceData.balance}
          />
        </Card>
      );
    }

    return null;
  };

  return (
    <RequireAccount>
      <div className="container">
        <header className={styles.header}>
          <h1>Account Balance</h1>
        </header>
        <div className={styles.contentArea}>{renderContent()}</div>
      </div>
    </RequireAccount>
  );
};
