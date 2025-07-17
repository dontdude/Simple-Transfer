import { useState } from "react";
import { Link } from "react-router-dom";
import { useAccountStore } from "../../../store/account.store";
import { Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { FormError } from "../../../components/FormError/FormError";
import styles from "./AccountPrompt.module.css";

export const AccountPrompt = () => {
  const setAccountId = useAccountStore((state) => state.setAccountId);
  const [existingId, setExistingId] = useState("");
  const [error, setError] = useState("");

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Number(existingId);
    if (isNaN(id) || id <= 0) {
      setError("Please enter a valid, positive account ID.");
      return;
    }
    setError("");
    setAccountId(id);
  };

  return (
    <div className="container">
      <Card>
        <div className={styles.promptContainer}>
          {/* Option 1: Enter an existing account ID */}
          <div className={styles.option}>
            <h2>Have an Account?</h2>
            <p>Enter your existing account ID to continue.</p>
            <form onSubmit={handleManualSubmit} className={styles.form}>
              <Input
                label="Account ID"
                name="existingId"
                type="number"
                value={existingId}
                onChange={(e) => setExistingId(e.target.value)}
                placeholder="e.g., 12345"
                error={!!error}
              />
              <FormError message={error} />
              <Button type="submit">Use This Account</Button>
            </form>
          </div>

          <div className={styles.orSeparator}>OR</div>

          {/* Option 2: Create a new account */}
          <div className={styles.option}>
            <h2>New Here?</h2>
            <p>Create a new account to get started.</p>
            <Link to="/">
              <Button>Create a New Account</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
