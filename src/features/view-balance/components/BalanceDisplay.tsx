import { formatCurrency } from "../../../utils/formatters";
import styles from "../ViewBalancePage.module.css";

interface BalanceDisplayProps {
  accountId: number;
  balance: string;
}

export const BalanceDisplay = ({ accountId, balance }: BalanceDisplayProps) => {
  return (
    <>
      <div className={styles.balanceRow}>
        <span className={styles.balanceLabel}>Account ID</span>
        <span className={styles.balanceValue}>{accountId}</span>
      </div>
      <div className={styles.balanceRow}>
        <span className={styles.balanceLabel}>Current Balance</span>
        <span className={`${styles.balanceValue} ${styles.balanceAmount}`}>
          {formatCurrency(balance)}
        </span>
      </div>
    </>
  );
};
