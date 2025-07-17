import { useState } from "react";
import { useAccountStore } from "../../store/account.store";
import { sendMoney } from "../../api/transferService";
import type { TransferResponse } from "../../types/api.types";
import { showSuccess, showError } from "../../hooks/useToast";
import { formatCurrency } from "../../utils/formatters";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import { RequireAccount } from "../../providers/auth/RequireAccount";
import styles from "./SendMoneyPage.module.css";

const initialState = {
  destinationAccountId: "",
  amount: "",
};

export const SendMoneyPage = () => {
  const sourceAccountId = useAccountStore((state) => state.accountId);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [lastTransaction, setLastTransaction] =
    useState<TransferResponse | null>(null);

  const validateForm = () => {
    const newErrors = { ...initialState };
    let isValid = true;

    if (!formData.destinationAccountId) {
      newErrors.destinationAccountId = "Destination account ID is required.";
      isValid = false;
    } else if (Number(formData.destinationAccountId) === sourceAccountId) {
      newErrors.destinationAccountId = "Cannot send money to the same account.";
      isValid = false;
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required.";
      isValid = false;
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a number greater than 0.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (lastTransaction) setLastTransaction(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm() || !sourceAccountId) return;

    setIsLoading(true);
    setLastTransaction(null);
    try {
      const payload = {
        source_account_id: sourceAccountId,
        destination_account_id: Number(formData.destinationAccountId),
        amount: formData.amount,
      };

      const response = await sendMoney(payload);
      showSuccess("Transaction successful!");
      setLastTransaction(response);
      setFormData(initialState);
    } catch (err) {
      showError("Transaction failed. Please check details and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
            {errors.destinationAccountId && (
              <p className="error-message">{errors.destinationAccountId}</p>
            )}

            <Input
              label="Amount to Send"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g., 50.00"
              required
              error={!!errors.amount}
            />
            {errors.amount && <p className="error-message">{errors.amount}</p>}

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
