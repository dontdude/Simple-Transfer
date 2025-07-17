import { useCreateAccountForm } from "./useCreateAccountForm";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import { FormError } from "../../components/FormError/FormError";
import styles from "./CreateAccountPage.module.css";

export const CreateAccountPage = () => {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useCreateAccountForm();

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
          <FormError message={errors.accountId} />

          <Input
            label="Initial Balance ($)"
            name="initialBalance"
            type="number"
            value={formData.initialBalance}
            onChange={handleChange}
            placeholder="e.g., 1000.00"
            required
            error={!!errors.initialBalance}
          />
          <FormError message={errors.initialBalance} />

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
