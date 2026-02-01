import { Heart, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Property } from '@/types/property';

interface PropertyCardProps {
    /** The property data to display */
    property: Property;
}

/**
 * Individual property listing card with image, details, and hover effects.
 * Features lazy loading, favorite button, and image pagination dots.
 */
export function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link href={`/property/${property.id}`} className="group cursor-pointer block">
            <article>
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 mb-3">
                    <img
                        src={property.imageUrl}
                        alt={property.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Favorite Button */}
                    <button
                        type="button"
                        className="absolute top-3 right-3 text-white/70 hover:text-white hover:scale-110 transition-all z-10"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        aria-label={`Add ${property.title} to favorites`}
                    >
                        <Heart className="h-6 w-6 drop-shadow-md" fill="rgba(0,0,0,0.5)" />
                    </button>

                    {/* Pagination Dots (visible on hover) */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    </div>
                </div>

                {/* Property Details */}
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-stay-text-main">{property.location}</h3>
                    <div className="flex items-center gap-1 text-sm text-stay-text-main">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{property.rating.toFixed(2)}</span>
                    </div>
                </div>
                <p className="text-stay-text-secondary text-sm">{property.title}</p>
                <p className="text-stay-text-secondary text-sm">{property.dates}</p>
                <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-bold text-stay-text-main">${property.pricePerNight}</span>
                    <span className="text-stay-text-main text-sm">night</span>
                </div>
            </article>
        </Link>
    );
}
