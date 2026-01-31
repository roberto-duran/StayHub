interface PriceMarkerProps {
    price: number;
    isSelected?: boolean;
    onClick?: () => void;
}

export function PriceMarker({ price, isSelected = false, onClick }: PriceMarkerProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold shadow-md transition-all hover:scale-105 ${
                isSelected ? 'bg-stay-background-dark text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
            }`}
        >
            €{price} / night
        </button>
    );
}

interface ClusterMarkerProps {
    count: number;
    onClick?: () => void;
}

export function ClusterMarker({ count, onClick }: ClusterMarkerProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stay-primary text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-stay-primary/90"
        >
            {count}
        </button>
    );
}
