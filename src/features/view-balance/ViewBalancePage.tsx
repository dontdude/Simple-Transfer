import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAccountStore } from "../../store/account.store";
import { getAccountBalance } from "../../api/transferService";
import type { GetBalanceResponse } from "../../types/api.types";
import { showError } from "../../hooks/useToast";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import { Button } from "../../components/Button/Button";
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

    if (!accountId) {
      return (
        <div className={styles.centeredMessage}>
          <p>Please create an account first to view your balance.</p>
          <Link to="/">
            <Button>Create Account</Button>
          </Link>
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
    <div className="container">
      <header className={styles.header}>
        <h1>Account Balance</h1>
      </header>
      <div className={styles.contentArea}>{renderContent()}</div>
    </div>
  );
};
