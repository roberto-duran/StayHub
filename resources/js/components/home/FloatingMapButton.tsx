import { Map } from 'lucide-react';

/**
 * Floating "Show map" button fixed at the bottom of the viewport.
 * Displays on top of content with a dark background.
 */
export function FloatingMapButton() {
    return (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40">
            <button
                type="button"
                className="bg-stay-background-dark text-white hover:scale-105 transition-transform rounded-full px-6 py-3.5 flex items-center gap-2 shadow-xl hover:shadow-2xl font-semibold text-sm"
            >
                <Map className="h-5 w-5" />
                Show map
            </button>
        </div>
    );
}
