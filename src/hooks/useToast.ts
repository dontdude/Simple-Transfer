import toast from 'react-hot-toast';

/**
 * Displays a success toast notification.
 * @param msg The message to display.
 */
export const showSuccess = (msg: string) => toast.success(msg);

/**
 * Displays an error toast notification.
 * @param msg The message to display.
 */
export const showError = (msg: string) => toast.error(msg);

/**
 * Displays a loading toast notification.
 * This should be dismissed manually via its ID.
 * @param msg The message to display.
 * @returns The ID of the toast, to be used with toast.dismiss(id).
 */
export const showLoading = (msg: string) => toast.loading(msg);