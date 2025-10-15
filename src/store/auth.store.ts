import { Session } from 'next-auth';
import { create } from 'zustand';

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

interface AuthState {
    isAuth: boolean;
    statuse: SessionStatus;
    session: Session | null;
    setAuthState: (statuse: SessionStatus, session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    statuse: 'unauthenticated',
    session: null,
    setAuthState: (statuse: SessionStatus, session: Session | null) => {
        console.log({ statuse, session });
        set({
            isAuth: statuse === 'authenticated',
            session,
            statuse,
        });
    },
}));
