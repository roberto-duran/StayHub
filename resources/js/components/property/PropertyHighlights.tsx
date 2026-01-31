import { Award, Leaf, MapPin } from 'lucide-react';
import type { PropertyHighlight } from '@/types/property';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Award,
    Leaf,
    MapPin,
};

interface PropertyHighlightsProps {
    highlights: PropertyHighlight[];
}

export function PropertyHighlights({ highlights }: PropertyHighlightsProps) {
    return (
        <div className="flex flex-col gap-6 border-b border-gray-200 py-8">
            {highlights.map((highlight, index) => {
                const IconComponent = iconMap[highlight.icon] || Award;
                return (
                    <div key={index} className="flex gap-4">
                        <IconComponent className="mt-1 h-6 w-6 text-stay-primary" />
                        <div>
                            <h3 className="font-bold text-gray-900">{highlight.title}</h3>
                            <p className="mt-0.5 text-sm text-gray-500">{highlight.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
