import { Link } from '@inertiajs/react';
import { Leaf, User } from 'lucide-react';

export function SearchHeader() {
    return (
        <header className="flex items-center justify-between bg-white px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stay-primary">
                    <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">StayHub</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
                <Link href="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                    Explore
                </Link>
                <Link href="/search" className="text-sm font-medium text-stay-primary">
                    Search
                </Link>
                <a href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                    Favorites
                </a>
                <a href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                    Messages
                </a>
            </nav>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
            >
                <User className="h-5 w-5 text-gray-600" />
            </button>
        </header>
    );
}
