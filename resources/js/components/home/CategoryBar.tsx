import { useState } from 'react';
import {
    Droplets,
    Home,
    House,
    Mountain,
    Sailboat,
    SlidersHorizontal,
    TreePine,
    Waves,
    Wine,
    Zap,
} from 'lucide-react';
import type { Category } from '@/types/property';
import { cn } from '@/lib/utils';

/**
 * Map of icon names to Lucide components.
 */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    TreePine,
    House,
    Waves,
    Zap,
    Wine,
    Home,
    Droplets,
    Sailboat,
    Mountain,
};

interface CategoryBarProps {
    /** List of categories to display */
    categories: Category[];
    /** Currently active category slug */
    activeCategory?: string;
    /** Callback when a category is selected */
    onCategoryChange?: (categorySlug: string) => void;
}

/**
 * Horizontal scrollable category filter bar.
 * Shows category icons and labels with active state styling.
 */
export function CategoryBar({
    categories,
    activeCategory,
    onCategoryChange,
}: CategoryBarProps) {
    const [active, setActive] = useState(activeCategory ?? categories[0]?.slug);

    const handleCategoryClick = (categorySlug: string) => {
        setActive(categorySlug);
        onCategoryChange?.(categorySlug);
    };

    return (
        <div className="max-w-[1440px] mx-auto px-6 pt-4 pb-2">
            <div className="flex gap-8 overflow-x-auto hide-scrollbar items-center pb-2">
                {categories.map((category) => {
                    const IconComponent = iconMap[category.icon] ?? TreePine;
                    const isActive = active === category.slug;

                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategoryClick(category.slug)}
                            className={cn(
                                'group flex flex-col items-center gap-2 min-w-[64px] cursor-pointer border-b-2 pb-2 transition-all',
                                isActive
                                    ? 'border-stay-primary opacity-100'
                                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-200'
                            )}
                        >
                            <IconComponent
                                className={cn(
                                    'h-6 w-6 group-hover:scale-110 transition-transform',
                                    isActive ? 'text-stay-primary' : 'text-stay-text-main'
                                )}
                            />
                            <span
                                className={cn(
                                    'text-xs whitespace-nowrap text-stay-text-main',
                                    isActive ? 'font-semibold' : 'font-medium'
                                )}
                            >
                                {category.name}
                            </span>
                        </button>
                    );
                })}

                {/* Filter Button */}
                <div className="ml-auto flex items-center pl-4">
                    <button
                        type="button"
                        className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium hover:border-black transition-colors"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
