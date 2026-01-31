import { Link } from '@inertiajs/react';
import { Map } from 'lucide-react';

/**
 * Floating "Show map" button fixed at the bottom of the viewport.
 * Links to the search/map page.
 */
export function FloatingMapButton() {
    return (
        <div className="fixed bottom-12 left-1/2 z-40 -translate-x-1/2">
            <Link
                href="/search"
                className="flex items-center gap-2 rounded-full bg-stay-background-dark px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
            >
                <Map className="h-5 w-5" />
                Show map
            </Link>
        </div>
    );
}
