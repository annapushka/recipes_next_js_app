'use client';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Logo = () => {
    return (
        <Image src='/logo.png' alt='Кухня' width={26} height={26} priority />
    );
};

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Рецепты' },
        { href: '/ingredients', label: 'Ингредиенты' },
        { href: '/about', label: 'О нас' },
    ];
    return (
        <Navbar>
            <NavbarBrand>
                <Link href='/' className='flex gap-1'>
                    <Logo />
                    <p className='font-bold text-inherit'>Кухня мира</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className='hidden sm:flex gap-4' justify='center'>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <NavbarItem key={item.href}>
                            <Link
                                href={item.href}
                                className={`px-3 py-1 ${
                                    isActive
                                        ? 'text-blue-500'
                                        : 'text-foreground'
                                } 
                                hover:text-blue-300 
                                hover:border 
                                hover:border-blue-300 
                                hover:rounded-md 
                                transition-colors 
                                transition-border 
                                duration-200`}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    );
                })}
            </NavbarContent>
            <NavbarContent justify='end'>
                <NavbarItem className='hidden lg:flex'>
                    <Link href='#'>Логин</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color='primary' href='#' variant='flat'>
                        Регистрация
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
