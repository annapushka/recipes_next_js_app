import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/UI/layout/header';
import { Providers } from '@/providers/provider';
import { siteConfig } from '@/config/site.config';
import { layoutConfig } from '@/config/layout.config';
import { auth } from '@/auth/auth';
import ClientAuthProvider from '@/providers/client-auth-provider';
import Title from '@/components/UI/layout/title';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Providers>
                    <ClientAuthProvider session={session}>
                        <Header />
                        <Title />
                        <main
                            className='flex flex-col w-full justify-start items-center'
                            style={{
                                height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`,
                            }}
                        >
                            {children}
                        </main>
                        <footer
                            className={`flex h-[${layoutConfig.footerHeight}] justify-center`}
                        >
                            <p className='text-sm text-gray-500 items-center'>
                                © {new Date().getFullYear()} {siteConfig.title}
                            </p>
                        </footer>
                    </ClientAuthProvider>
                </Providers>
            </body>
        </html>
    );
}
