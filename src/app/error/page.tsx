'use client';
import { useSearchParams } from 'next/navigation';

const ErrorPage = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || 'Что-то пошло не так...';
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <p className='text-xl text-gray-700'>{message}</p>
        </div>
    );
};

export default ErrorPage;
