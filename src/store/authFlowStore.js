// src/store/authFlowStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthFlowStore = create(
    persist(
        (set, get) => ({
            justSignedUp: false,
            emailForVerification: '',
            lastVerificationEmailSentAt: null,
            emailForReset: '',
            setJustSignedUp: (value) => set({ justSignedUp: value }),
            setEmailForVerification: (email) => set({ emailForVerification: email }),
            setLastVerificationEmailSentAt: (timestamp) => set({ lastVerificationEmailSentAt: timestamp }),
            setEmailForReset: (email) => set({ emailForReset: email }),
            _hasHydrated: false,
            setHasHydrated: () => set({ _hasHydrated: true }),
        }),
        {
            name: 'authFlow',
            onRehydrateStorage: () => () => {
                useAuthFlowStore.getState().setHasHydrated()
            },
        }
    )
)

