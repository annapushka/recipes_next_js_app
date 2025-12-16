'use client';

import { siteConfig } from '@/config/site.config';
import { usePathname } from 'next/navigation';

import { SanitizedContent } from './sanitized-content';

const PageContent = () => {
    const pathname = usePathname();
    const pageContent =
        siteConfig.pagesContent[
            pathname as keyof typeof siteConfig.pagesContent
        ];

    if (!pageContent) {
        return <div className='text-center py-8'>Страница не найдена</div>;
    }

    return (
        <div>
            <SanitizedContent content={pageContent.content} />
        </div>
    );
};

export default PageContent;
