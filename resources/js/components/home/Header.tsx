import { Link, usePage } from '@inertiajs/react';
import { Globe, Leaf, Menu, Search, User } from 'lucide-react';
import { dashboard, login } from '@/routes';
import type { SharedData } from '@/types';
import { SearchPill } from './search/SearchPill';

/**
 * Sticky header component with logo, search pill, and user menu.
 * Matches the Airbnb-style design from the mock.
 */
export function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="max-w-360 mx-auto px-6 h-20 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer shrink-0">
                <Leaf className="h-9 w-9 text-stay-primary" />
                <h1 className="text-stay-primary text-2xl font-bold tracking-tight hidden md:block">
                    StayHub
                </h1>
            </Link>

            {/* Search Pill (Centered) - Desktop */}
            <SearchPill />

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
            <div className="flex items-center justify-end gap-2 shrink-0">
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
