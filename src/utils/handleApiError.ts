import { isAxiosError } from "axios";
import { showError } from "../hooks/useToast";

/**
 * Handles API errors consistently.
 *
 * @param err - The error object from try/catch
 * @param fallbackMessage - Default message if no specific error is found
 */
export const handleApiError = (
    err: unknown,
    fallbackMessage: string = "An unexpected error occurred."
) => {
    let errorMessage = fallbackMessage;

    if (isAxiosError(err) && err.response?.data) {
        const responseData = err.response.data;

        errorMessage =
            typeof responseData === "string"
                ? responseData
                : responseData.message || fallbackMessage;
    } else {
        errorMessage =
            "An unexpected network error occurred. Please check your connection.";
    }

    showError(errorMessage);
    console.error(err);
};
