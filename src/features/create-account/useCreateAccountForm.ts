import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useAccountStore } from '../../store/account.store';
import { createAccount } from '../../api/transferService';
import { showSuccess, showError } from '../../hooks/useToast';

const initialState = {
    accountId: '',
    initialBalance: '',
};

export const useCreateAccountForm = () => {
    const setAccountIdInStore = useAccountStore((state) => state.setAccountId);
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = { accountId: '', initialBalance: '' };
        let isValid = true;

        if (!formData.accountId) {
            newErrors.accountId = 'Account ID is required.';
            isValid = false;
        }

        if (!formData.initialBalance) {
            newErrors.initialBalance = 'Initial balance is required.';
            isValid = false;
        } else if (isNaN(Number(formData.initialBalance)) || Number(formData.initialBalance) < 0) {
            newErrors.initialBalance = 'Balance must be a number greater than or equal to 0.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const payload = {
                account_id: Number(formData.accountId),
                initial_balance: formData.initialBalance,
            };

            const response = await createAccount(payload);
            showSuccess(`Account ${response.account_id} created successfully!`);
            setAccountIdInStore(response.account_id);
            setFormData(initialState);
        } catch (err) {
            let errorMessage = 'Failed to create account.';

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
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
    };
};