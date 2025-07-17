import { Toaster } from "react-hot-toast";

export const Toast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--box-shadow)",
        },
        success: {
          iconTheme: {
            primary: "var(--color-success)",
            secondary: "var(--color-surface)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--color-error)",
            secondary: "var(--color-surface)",
          },
        },
      }}
    />
  );
};
