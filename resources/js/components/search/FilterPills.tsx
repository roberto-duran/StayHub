import { X } from 'lucide-react';

interface FilterPill {
    id: string;
    label: string;
    value: string;
    isActive: boolean;
}

interface FilterPillsProps {
    filters: FilterPill[];
    onRemove: (id: string) => void;
    onClearAll: () => void;
}

export function FilterPills({ filters, onRemove, onClearAll }: FilterPillsProps) {
    const activeFilters = filters.filter((f) => f.isActive);

    if (activeFilters.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    onClick={() => onRemove(filter.id)}
                    className="flex items-center gap-2 rounded-full bg-stay-background-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                >
                    <span>
                        {filter.label}: {filter.value}
                    </span>
                    <X className="h-4 w-4" />
                </button>
            ))}

            {activeFilters.length > 1 && (
                <button
                    type="button"
                    onClick={onClearAll}
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                    Clear all
                </button>
            )}
        </div>
    );
}

interface InactiveFilterPillProps {
    label: string;
    onClick: () => void;
}

export function InactiveFilterPill({ label, onClick }: InactiveFilterPillProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
            {label}
        </button>
    );
}
