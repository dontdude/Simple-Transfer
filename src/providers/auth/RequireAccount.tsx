import React from "react";
import { Link } from "react-router-dom";
import { useAccountStore } from "../../store/account.store";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import styles from "./RequireAccount.module.css";

interface RequireAccountProps {
  children: React.ReactNode;
}

export const RequireAccount = ({ children }: RequireAccountProps) => {
  const accountId = useAccountStore((state) => state.accountId);

  if (!accountId) {
    return (
      <div className="container">
        <Card>
          <div className={styles.promptContainer}>
            <p>Please create an account to access this page.</p>
            <Link to="/">
              <Button>Create an Account</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
