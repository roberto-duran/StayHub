import { Link } from '@inertiajs/react';
import { Heart, Star, X, Bed, Bath, Maximize, Building2, MapPin } from 'lucide-react';
import type { MapProperty } from '@/types/search';

interface PropertyDetailPanelProps {
    property: MapProperty;
    onClose: () => void;
    onFavorite?: () => void;
    isFavorite?: boolean;
}

export function PropertyDetailPanel({
    property,
    onClose,
    onFavorite,
    isFavorite = false,
}: PropertyDetailPanelProps) {
    return (
        <div className="flex h-full w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur-sm lg:max-w-lg">
            {/* Header Image */}
            <div className="relative h-64 flex-shrink-0 overflow-hidden lg:h-72">
                <img
                    src={property.imageUrl}
                    alt={property.imageAlt}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
                    aria-label="Close panel"
                >
                    <X className="h-5 w-5 text-gray-700" />
                </button>

                {/* Favorite Button */}
                <button
                    type="button"
                    onClick={onFavorite}
                    className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart
                        className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                    />
                </button>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-4 py-2 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-gray-900">€{property.pricePerNight}</span>
                    <span className="text-gray-600"> / night</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col overflow-y-auto p-6">
                {/* Title & Rating */}
                <div className="mb-4">
                    <h2 className="mb-2 text-xl font-bold text-gray-900 lg:text-2xl">{property.title}</h2>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-gray-900">{property.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{property.location}</span>
                        </div>
                    </div>
                </div>

                {/* Property Details Grid */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                        <Bed className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Bedrooms</p>
                            <p className="font-semibold text-gray-900">{property.bedrooms}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                        <Bath className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Bathrooms</p>
                            <p className="font-semibold text-gray-900">{property.bathrooms}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                        <Maximize className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Area</p>
                            <p className="font-semibold text-gray-900">{property.area} m²</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                        <Building2 className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Floor</p>
                            <p className="font-semibold text-gray-900">{property.floor}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <h3 className="mb-2 font-semibold text-gray-900">About this property</h3>
                    <p className="leading-relaxed text-gray-600">{property.description}</p>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                    <h3 className="mb-3 font-semibold text-gray-900">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity) => (
                            <span
                                key={amenity}
                                className="rounded-full bg-stay-background-off px-3 py-1.5 text-sm font-medium text-gray-700"
                            >
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA Button */}
                <Link
                    href={`/property/${property.id}`}
                    className="mt-4 block w-full rounded-2xl bg-stay-primary py-4 text-center font-semibold text-white transition-colors hover:bg-stay-primary/90"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
