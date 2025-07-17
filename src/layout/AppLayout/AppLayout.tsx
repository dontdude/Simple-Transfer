import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Toast } from "../../components/Toast/Toast";
import styles from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <Navbar />
      <main className={styles.contentWrapper}>
        <Outlet />
      </main>
      <Toast />
    </div>
  );
};
