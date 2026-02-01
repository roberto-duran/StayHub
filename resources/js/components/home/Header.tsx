import { Link, usePage } from '@inertiajs/react';
import { Globe, Leaf, Menu, Search, User } from 'lucide-react';
import { dashboard, login } from '@/routes';
import type { SharedData } from '@/types';

/**
 * Sticky header component with logo, search pill, and user menu.
 * Matches the Airbnb-style design from the mock.
 */
export function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
                <Leaf className="h-9 w-9 text-stay-primary" />
                <h1 className="text-stay-primary text-2xl font-bold tracking-tight hidden md:block">
                    StayHub
                </h1>
            </Link>

            {/* Search Pill (Centered) - Desktop */}
            <div className="hidden md:flex flex-1 justify-center max-w-2xl px-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-soft hover:shadow-hover transition-shadow cursor-pointer py-2.5 pl-6 pr-2 divide-x divide-gray-300 w-full max-w-[500px]">
                    <button
                        type="button"
                        className="px-4 text-sm font-semibold text-stay-text-main truncate bg-transparent border-none outline-none text-left"
                    >
                        Anywhere
                    </button>
                    <button
                        type="button"
                        className="px-4 text-sm font-semibold text-stay-text-main truncate bg-transparent border-none outline-none text-left"
                    >
                        Any week
                    </button>
                    <button
                        type="button"
                        className="px-4 text-sm font-normal text-stay-text-secondary truncate bg-transparent border-none outline-none text-left flex-grow"
                    >
                        Add guests
                    </button>
                    <div className="bg-stay-primary p-2.5 rounded-full text-white flex items-center justify-center ml-2">
                        <Search className="h-4 w-4" strokeWidth={3} />
                    </div>
                </div>
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden flex flex-1 justify-end mr-4">
                <button
                    type="button"
                    className="bg-stay-primary p-2 rounded-full text-white flex items-center justify-center"
                    aria-label="Search"
                >
                    <Search className="h-5 w-5" />
                </button>
            </div>

            {/* User Menu */}
            <div className="flex items-center justify-end gap-2 flex-shrink-0">
                {auth.user?.role === 'owner' && (
                    <Link
                        href="/owner/dashboard"
                        className="hidden lg:block px-4 py-2 hover:bg-gray-100 rounded-full text-sm font-semibold transition-colors"
                    >
                        Owner Dashboard
                    </Link>
                )}
                {auth.user?.role === 'admin' && (
                    <Link
                        href="/admin/dashboard"
                        className="hidden lg:block px-4 py-2 hover:bg-gray-100 rounded-full text-sm font-semibold transition-colors text-purple-600"
                    >
                        Admin
                    </Link>
                )}
                {!auth.user && (
                    <button
                        type="button"
                        className="hidden lg:block px-4 py-2 hover:bg-gray-100 rounded-full text-sm font-semibold transition-colors"
                    >
                        Switch to hosting
                    </button>
                )}
                <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Select language"
                >
                    <Globe className="h-5 w-5 text-stay-text-main" />
                </button>
                {auth.user ? (
                    <Link
                        href={dashboard()}
                        className="flex items-center gap-2 border border-gray-200 rounded-full p-1 pl-3 hover:shadow-md transition-shadow ml-1 bg-white"
                    >
                        <Menu className="h-5 w-5 text-stay-text-main" />
                        <div className="bg-stay-primary rounded-full p-1 text-white">
                            <User className="h-6 w-6" />
                        </div>
                    </Link>
                ) : (
                    <Link
                        href={login()}
                        className="flex items-center gap-2 border border-gray-200 rounded-full p-1 pl-3 hover:shadow-md transition-shadow ml-1 bg-white"
                    >
                        <Menu className="h-5 w-5 text-stay-text-main" />
                        <div className="bg-gray-500 rounded-full p-1 text-white">
                            <User className="h-6 w-6" />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
