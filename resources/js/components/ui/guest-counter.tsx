import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuestCounterProps {
    label: string;
    description?: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    disabled?: boolean;
}

export function GuestCounter({
    label,
    description,
    value,
    onChange,
    min = 0,
    max = 16,
    disabled = false,
}: GuestCounterProps) {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex flex-col">
                <span className="text-base font-medium text-stay-text-main">{label}</span>
                {description && <span className="text-sm text-stay-text-secondary">{description}</span>}
            </div>
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-gray-300 disabled:opacity-30"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={value <= min || disabled}
                    type="button"
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-4 text-center text-stay-text-main tabular-nums font-normal">
                    {value}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-gray-300 disabled:opacity-30"
                    onClick={() => onChange(Math.min(max, value + 1))}
                    disabled={value >= max || disabled}
                    type="button"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
