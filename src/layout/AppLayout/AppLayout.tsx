import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../Navbar/Navbar";
import styles from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <Navbar />
      <main className={styles.contentWrapper}>
        <Outlet />
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "var(--color-text-primary)",
            color: "var(--color-surface)",
          },
        }}
      />
    </div>
  );
};
