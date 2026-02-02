import { Compass, MapPin, Building2, Landmark, Waves, TowerControl as Tower, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationPanelProps {
    value: string;
    onChange: (value: string) => void;
    onSelect: (value: string) => void;
}

const suggestions = [
    {
        id: 'nearby',
        label: 'Nearby',
        description: "Find what's around you",
        icon: Compass,
        color: 'bg-blue-50 text-blue-600',
    },
    {
        id: 'bogota',
        label: 'Bogotá, Colombia',
        description: 'For sights like Plaza de Bolivar',
        icon: Building2,
        color: 'bg-rose-50 text-rose-600',
    },
    {
        id: 'cartagena',
        label: 'Cartagena, Colombia',
        description: 'Popular beach destination',
        icon: Landmark,
        color: 'bg-green-50 text-green-600',
    },
    {
        id: 'madrid',
        label: 'Madrid, Spain',
        description: 'For its bustling nightlife',
        icon: Landmark,
        color: 'bg-red-50 text-red-600',
    },
    {
        id: 'cali',
        label: 'Cali, Colombia',
        description: 'Because your wishlist has stays in Cali',
        icon: Music,
        color: 'bg-orange-50 text-orange-600',
    },
    {
        id: 'santa-marta',
        label: 'Santa Marta, Colombia',
        description: 'For sights like Tayrona National Natural Park',
        icon: Waves,
        color: 'bg-stone-50 text-stone-600',
    },
    {
        id: 'paris',
        label: 'Paris, France',
        description: 'For its stunning architecture',
        icon: Landmark,
        color: 'bg-indigo-50 text-indigo-600',
    },
];

export function LocationPanel({ value, onChange, onSelect }: LocationPanelProps) {
    return (
        <div className="p-4 w-full md:w-112.5">
            <h3 className="text-sm font-bold text-stay-text-main mb-4 px-4">Suggested destinations</h3>
            <div className="max-h-100 overflow-y-auto">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.id}
                        onClick={() => onSelect(suggestion.label)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-100 transition-colors text-left rounded-xl group"
                    >
                        <div className={cn("p-3 rounded-xl transition-colors", suggestion.color)}>
                            <suggestion.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-semibold text-stay-text-main group-hover:text-black transition-colors">
                                {suggestion.label}
                            </div>
                            <div className="text-sm text-stay-text-secondary">
                                {suggestion.description}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
