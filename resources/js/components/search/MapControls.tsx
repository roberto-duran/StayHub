import { Pencil, Plus, Minus } from 'lucide-react';

interface MapControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onEdit?: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onEdit }: MapControlsProps) {
    return (
        <div className="flex flex-col gap-2">
            {onEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-colors hover:bg-gray-50"
                    aria-label="Edit map"
                >
                    <Pencil className="h-4 w-4 text-gray-600" />
                </button>
            )}
            <button
                type="button"
                onClick={onZoomIn}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-colors hover:bg-gray-50"
                aria-label="Zoom in"
            >
                <Plus className="h-4 w-4 text-gray-600" />
            </button>
            <button
                type="button"
                onClick={onZoomOut}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-colors hover:bg-gray-50"
                aria-label="Zoom out"
            >
                <Minus className="h-4 w-4 text-gray-600" />
            </button>
        </div>
    );
}
