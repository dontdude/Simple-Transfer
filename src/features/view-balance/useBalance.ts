import { useState, useEffect, useCallback } from 'react';
import { handleApiError } from '../../utils/handleApiError';
import { useAccountStore } from '../../store/account.store';
import { getAccountBalance } from '../../api/transferService';
import type { GetBalanceResponse } from '../../types/api.types';

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
            handleApiError(err, 'Unable to fetch balance. Please try again.');
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