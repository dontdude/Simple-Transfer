import { create } from 'zustand';
import type { AccountStore } from '../types/store.types';

export const useAccountStore = create<AccountStore>((set) => ({
    // Initial State
    accountId: null,

    // Actions
    setAccountId: (id: number) => set({ accountId: id }),
    clearAccount: () => set({ accountId: null }),
}));