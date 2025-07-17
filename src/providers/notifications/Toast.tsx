import { Toaster } from "react-hot-toast";

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // Default options
        duration: 5000,
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--box-shadow)",
        },
        // Success-specific options
        success: {
          iconTheme: {
            primary: "var(--color-success)",
            secondary: "var(--color-surface)",
          },
        },
        // Error-specific options
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
