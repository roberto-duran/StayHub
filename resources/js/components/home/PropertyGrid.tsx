import type { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
    /** List of properties to display in the grid */
    properties: Property[];
}

/**
 * Responsive grid layout for property cards.
 * 1 column on mobile, 2 on tablet, 3 on medium, 4 on large screens.
 */
export function PropertyGrid({ properties }: PropertyGridProps) {
    return (
        <main className="max-w-[1440px] mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </main>
    );
}
