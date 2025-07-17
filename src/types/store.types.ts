export interface AccountStore {
    accountId: number | null;
    setAccountId: (id: number) => void;
    clearAccount: () => void;
}