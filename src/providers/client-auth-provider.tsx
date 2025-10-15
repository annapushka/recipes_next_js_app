'use client';

import AppLoader from '@/hoc/app-loader';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface Props {
    session: Session | null;
    children: React.ReactNode;
}

export default function ClientAuthProvider({ session, children }: Props) {
    return (
        <SessionProvider session={session}>
            <AppLoader>{children}</AppLoader>
        </SessionProvider>
    );
}
