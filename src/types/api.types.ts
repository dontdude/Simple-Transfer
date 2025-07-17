export interface CreateAccountPayload {
    account_id: number;
    initial_balance: string;
}

export interface CreateAccountResponse {
    account_id: number;
    initial_balance: string;
}

export interface GetBalanceResponse {
    account_id: number;
    balance: string;
}

export interface TransferPayload {
    source_account_id: number;
    destination_account_id: number;
    amount: string;
}

export interface TransferResponse {
    source_account_id: number;
    destination_account_id: number;
    amount: string;
}