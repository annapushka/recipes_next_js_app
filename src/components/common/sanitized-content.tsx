'use client';

import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

export const SanitizedContent = ({ content }: { content: string }) => {
    const [cleanHTML, setCleanHTML] = useState<string>('');

    useEffect(() => {
        let isMounted = true;

        const sanitizeContent = async () => {
            try {
                const DOMPurifyModule = await import('dompurify');
                const DOMPurify = DOMPurifyModule.default;

                if (isMounted) {
                    const sanitized = DOMPurify.sanitize(content);
                    setCleanHTML(sanitized);
                }
            } catch (error) {
                console.error('Failed to sanitize content:', error);
                if (isMounted) {
                    setCleanHTML(content);
                }
            }
        };

        sanitizeContent();

        return () => {
            isMounted = false;
        };
    }, [content]);

    return <>{parse(cleanHTML)}</>;
};
