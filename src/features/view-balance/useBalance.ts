import { useState, useEffect, useCallback } from 'react';
import { isAxiosError } from 'axios';
import { useAccountStore } from '../../store/account.store';
import { getAccountBalance } from '../../api/transferService';
import type { GetBalanceResponse } from '../../types/api.types';
import { showError } from '../../hooks/useToast';

export const useBalance = () => {
    const accountId = useAccountStore((state) => state.accountId);
    const [balanceData, setBalanceData] = useState<GetBalanceResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBalance = useCallback(async () => {
        if (!accountId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getAccountBalance(accountId);
            setBalanceData(data);
        } catch (err) {
            setError(`Failed to fetch account balance for account ID ${accountId}.`);
            let errorMessage = 'Unable to fetch balance. Please try again.';

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
    }, [accountId]);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    return { isLoading, error, balanceData, fetchBalance };
};