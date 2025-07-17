import { useBalance } from "./useBalance";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import { Button } from "../../components/Button/Button";
import { RequireAccount } from "../../providers/auth/RequireAccount";
import { BalanceDisplay } from "./components/BalanceDisplay";
import styles from "./ViewBalancePage.module.css";

export const ViewBalancePage = () => {
  const { isLoading, error, balanceData, fetchBalance } = useBalance();

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
          {!isLoading && balanceData && (
            <Button onClick={fetchBalance} disabled={isLoading}>
              Refresh
            </Button>
          )}
        </header>
        <div className={styles.contentArea}>{renderContent()}</div>
      </div>
    </RequireAccount>
  );
};
