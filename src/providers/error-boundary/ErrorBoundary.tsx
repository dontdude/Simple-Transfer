import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { Button } from "../../components/Button/Button";
import styles from "./ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container} role="alert">
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            We're sorry for the inconvenience. Please return to the homepage to
            continue.
          </p>
          <Button onClick={this.handleGoHome}>Go to Homepage</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
