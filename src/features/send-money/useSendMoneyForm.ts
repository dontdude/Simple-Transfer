import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useAccountStore } from '../../store/account.store';
import { sendMoney } from '../../api/transferService';
import type { TransferResponse } from '../../types/api.types';
import { showSuccess, showError } from '../../hooks/useToast';

const initialState = {
    destinationAccountId: '',
    amount: '',
};

export const useSendMoneyForm = () => {
    const sourceAccountId = useAccountStore((state) => state.accountId);
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [lastTransaction, setLastTransaction] = useState<TransferResponse | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (lastTransaction) setLastTransaction(null);
    };

    const validateForm = () => {
        const newErrors = { ...initialState };
        let isValid = true;

        if (!formData.destinationAccountId) {
            newErrors.destinationAccountId = 'Destination account ID is required.';
            isValid = false;
        } else if (Number(formData.destinationAccountId) === sourceAccountId) {
            newErrors.destinationAccountId = 'Cannot send money to the same account.';
            isValid = false;
        }

        if (!formData.amount) {
            newErrors.amount = 'Amount is required.';
            isValid = false;
        } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be a number greater than 0.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm() || !sourceAccountId) return;

        setIsLoading(true);
        setLastTransaction(null);
        try {
            const payload = {
                source_account_id: sourceAccountId,
                destination_account_id: Number(formData.destinationAccountId),
                amount: formData.amount,
            };

            const response = await sendMoney(payload);
            showSuccess(`Transaction successful! Sent ${formData.amount} to account #${formData.destinationAccountId}.`);
            setLastTransaction(response || payload);
            setFormData(initialState);
        } catch (err) {
            let errorMessage = 'Transaction failed. Please check details and try again.';

            if (isAxiosError(err) && err.response?.data) {
                const responseData = err.response.data;
                errorMessage = typeof responseData === 'string'
                    ? responseData
                    : responseData.message || errorMessage;
            } else {
                errorMessage = 'An unexpected network error occurred. Please check your connection.';
            }

            showError(errorMessage);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sourceAccountId,
        formData,
        errors,
        isLoading,
        lastTransaction,
        handleChange,
        handleSubmit,
    };
};