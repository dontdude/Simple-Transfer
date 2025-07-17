import { useState } from "react";
import { useAccountStore } from "../../store/account.store";
import { createAccount } from "../../api/transferService";
import { showSuccess, showError } from "../../hooks/useToast";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import styles from "./CreateAccountPage.module.css";

export const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    accountId: "",
    initialBalance: "",
  });
  const [errors, setErrors] = useState({ accountId: "", initialBalance: "" });
  const [isLoading, setIsLoading] = useState(false);

  const setAccountIdInStore = useAccountStore((state) => state.setAccountId);

  const validateForm = () => {
    const newErrors = { accountId: "", initialBalance: "" };
    let isValid = true;

    if (!formData.accountId) {
      newErrors.accountId = "Account ID is required.";
      isValid = false;
    }

    if (!formData.initialBalance) {
      newErrors.initialBalance = "Initial balance is required.";
      isValid = false;
    } else if (
      isNaN(Number(formData.initialBalance)) ||
      Number(formData.initialBalance) < 0
    ) {
      newErrors.initialBalance =
        "Balance must be a number greater than or equal to 0.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        account_id: Number(formData.accountId),
        initial_balance: formData.initialBalance,
      };

      const response = await createAccount(payload);
      showSuccess(`Account ${response.account_id} created successfully!`);
      setAccountIdInStore(response.account_id); // Save to Zustand store

      setFormData({ accountId: "", initialBalance: "" });
    } catch (err) {
      showError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className={styles.header}>
        <h1>Create a New Account</h1>
        <p>Enter an account ID and an initial balance to get started.</p>
      </header>

      <Card>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Account ID"
            name="accountId"
            type="number"
            value={formData.accountId}
            onChange={handleChange}
            placeholder="e.g., 12345"
            required
            error={!!errors.accountId}
          />
          {errors.accountId && (
            <p className="error-message">{errors.accountId}</p>
          )}

          <Input
            label="Initial Balance"
            name="initialBalance"
            type="number"
            value={formData.initialBalance}
            onChange={handleChange}
            placeholder="e.g., 1000.00"
            required
            error={!!errors.initialBalance}
          />
          {errors.initialBalance && (
            <p className="error-message">{errors.initialBalance}</p>
          )}

          <div className={styles.formActions}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : "Create Account"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
