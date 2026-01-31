import { Search } from 'lucide-react';

interface LocationSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function LocationSearch({ value, onChange, placeholder = 'Search location...' }: LocationSearchProps) {
    return (
        <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-full border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm shadow-sm transition-all focus:border-stay-primary focus:ring-2 focus:ring-stay-primary/20 focus:outline-none"
            />
        </div>
    );
}
