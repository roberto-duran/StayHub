import {
    Wifi,
    Car,
    ChefHat,
    Trees,
    Briefcase,
    Snowflake,
    BatteryCharging,
    Waves,
    Shirt,
    Dumbbell,
    User,
    Flower,
    TreePine,
} from 'lucide-react';
import type { Amenity } from '@/types/property';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Wifi,
    Car,
    ChefHat,
    Trees,
    Briefcase,
    Snowflake,
    BatteryCharging,
    Waves,
    Shirt,
    Dumbbell,
    User,
    Flower,
    TreePine,
};

interface AmenitiesProps {
    amenities: Amenity[];
    totalCount?: number;
}

export function Amenities({ amenities, totalCount = 32 }: AmenitiesProps) {
    const displayAmenities = amenities.slice(0, 8);

    return (
        <div className="border-b border-gray-200 py-8">
            <h2 className="mb-6 text-xl font-bold">What this place offers</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                {displayAmenities.map((amenity) => {
                    const IconComponent = iconMap[amenity.icon] || Wifi;
                    return (
                        <div
                            key={amenity.id}
                            className={`flex items-center gap-3 ${
                                amenity.available ? 'text-gray-600' : 'text-gray-400 line-through decoration-gray-400'
                            }`}
                        >
                            <IconComponent className="h-6 w-6 text-gray-400" />
                            <span>{amenity.name}</span>
                        </div>
                    );
                })}
            </div>
            {totalCount > 8 && (
                <button
                    type="button"
                    className="mt-6 rounded-xl border border-gray-900 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                    Show all {totalCount} amenities
                </button>
            )}
        </div>
    );
}
