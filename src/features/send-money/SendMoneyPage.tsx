import { useSendMoneyForm } from "./useSendMoneyForm";
import { formatCurrency } from "../../utils/formatters";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import { RequireAccount } from "../../providers/auth/RequireAccount";
import { FormError } from "../../components/FormError/FormError";
import styles from "./SendMoneyPage.module.css";

export const SendMoneyPage = () => {
  const {
    sourceAccountId,
    formData,
    errors,
    isLoading,
    lastTransaction,
    handleChange,
    handleSubmit,
  } = useSendMoneyForm();

  return (
    <RequireAccount>
      <div className="container">
        <header className={styles.header}>
          <h1>Send Money</h1>
          <p>
            Your Account ID:{" "}
            <span className={styles.sourceAccount}>{sourceAccountId}</span>
          </p>
        </header>

        <Card>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="Destination Account ID"
              name="destinationAccountId"
              type="number"
              value={formData.destinationAccountId}
              onChange={handleChange}
              placeholder="e.g., 67890"
              required
              error={!!errors.destinationAccountId}
            />
            <FormError message={errors.destinationAccountId} />

            <Input
              label="Amount to Send ($)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g., 50.00"
              required
              error={!!errors.amount}
            />
            <FormError message={errors.amount} />

            <div className={styles.formActions}>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" /> : "Send Money"}
              </Button>
            </div>
          </form>
        </Card>

        {lastTransaction && (
          <div className={styles.summaryContainer}>
            <h2 className={styles.summaryTitle}>Transaction Successful</h2>
            <Card>
              <div className={styles.summaryRow}>
                <span>From Account:</span>
                <span>{lastTransaction.source_account_id}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>To Account:</span>
                <span>{lastTransaction.destination_account_id}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Amount Sent:</span>
                <span className={styles.summaryAmount}>
                  {formatCurrency(lastTransaction.amount)}
                </span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </RequireAccount>
  );
};
