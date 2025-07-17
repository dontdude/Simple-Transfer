import api from './axiosInstance';
import type {
    CreateAccountPayload,
    CreateAccountResponse,
    GetBalanceResponse,
    TransferPayload,
    TransferResponse,
} from '../types/api.types';

export const createAccount = async (
    payload: CreateAccountPayload
): Promise<CreateAccountResponse> => {
    const response = await api.post<CreateAccountResponse>('/accounts', payload);
    return response.data;
};

export const getAccountBalance = async (
    accountId: number
): Promise<GetBalanceResponse> => {
    const response = await api.get<GetBalanceResponse>(`/accounts/${accountId}`);
    return response.data;
};

export const sendMoney = async (
    payload: TransferPayload
): Promise<TransferResponse> => {
    const response = await api.post<TransferResponse>('/transactions', payload);
    return response.data;
};