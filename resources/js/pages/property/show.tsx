import { Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import type { Property, Amenity, Review, Host } from '@/types/property';
import {
    ImageGallery,
    ImageCarousel,
    PropertyHeader,
    HostInfo,
    PropertyHighlights,
    Description,
    Amenities,
    Reviews,
    BookingWidget,
    LocationMap,
    MobileBookingBar,
} from '@/components/property';
import { Header, Footer } from '@/components/home';

interface ResourceData<T> {
    data: T;
}

interface PropertyShowProps {
    property: ResourceData<Property>;
}

/**
 * Transform API amenity format to component format
 */
function transformAmenities(amenities?: Property['amenities']): Amenity[] {
    if (!amenities) return [];
    return amenities.map((a) => ({
        id: a.id,
        name: a.name,
        icon: a.icon,
    }));
}

/**
 * Transform API review format to component format
 */
function transformReviews(reviews?: Property['reviews']): Review[] {
    if (!reviews) return [];
    return reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
        reviewer: r.reviewer,
    }));
}

/**
 * Transform API host format to component format
 */
function transformHost(host?: Property['host']): Host | null {
    if (!host) return null;
    return {
        id: host.id,
        name: host.name,
        avatar: host.avatar,
        is_superhost: host.is_superhost,
        joined_at: host.joined_at,
    };
}

export default function PropertyShow({ property: propertyResource }: PropertyShowProps) {
    const property = propertyResource?.data;
    
    if (!property) {
        return (
            <>
                <Head title="Property Not Found - StayHub" />
                <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
                    <AlertCircle className="mb-4 h-16 w-16 text-gray-400" />
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">Property Not Found</h1>
                    <p className="mb-6 text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
                    <Link
                        href="/"
                        className="rounded-lg bg-stay-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-stay-primary/90"
                    >
                        Back to Home
                    </Link>
                </div>
            </>
        );
    }

    const host = transformHost(property.host);
    const amenities = transformAmenities(property.amenities);
    const reviews = transformReviews(property.reviews);
    
    const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';
    const rawImages = property.images.gallery ?? [property.images.main];
    const images = rawImages.filter((img): img is string => Boolean(img));
    const safeImages = images.length > 0 ? images : [PLACEHOLDER_IMAGE];

    return (
        <>
            <Head title={`${property.title} - StayHub`} />

            <div className="flex min-h-screen flex-col bg-gray-50">
                {/* Unified Header */}
                <header className="sticky top-0 z-20 hidden border-b border-gray-200 bg-white lg:block">
                    <Header />
                </header>

                {/* Mobile Image Carousel */}
                <div className="lg:hidden">
                    <ImageCarousel images={safeImages} title={property.title} ecoCertified={property.details.eco_certified} />
                </div>

                {/* Main Content */}
                <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
                    {/* Desktop Header & Gallery */}
                    <div className="hidden lg:block">
                        <PropertyHeader
                            title={property.title}
                            rating={Number(property.rating)}
                            reviewCount={property.reviews_count}
                            location={property.location}
                            isSuperhost={host?.is_superhost ?? false}
                        />
                        <ImageGallery
                            images={safeImages}
                            title={property.title}
                            ecoCertified={property.details.eco_certified}
                        />
                    </div>

                    {/* Mobile Title */}
                    <div className="mb-6 lg:hidden">
                        <h1 className="mb-2 text-2xl font-bold leading-tight text-gray-900">{property.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                            <div className="flex items-center gap-1 font-semibold text-gray-900">
                                <span className="text-stay-primary">★</span>
                                {Number(property.rating).toFixed(2)}
                            </div>
                            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                            <a href="#" className="font-medium text-gray-600 underline">
                                {property.reviews_count} reviews
                            </a>
                            {host?.is_superhost && (
                                <>
                                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                    <span className="text-gray-500">Superhost</span>
                                </>
                            )}
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                            <span>📍</span>
                            {property.location}
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Left Column - Content */}
                        <div className="lg:col-span-2">
                            {host && (
                                <HostInfo
                                    host={{
                                        id: host.id,
                                        name: host.name,
                                        avatar: host.avatar,
                                        isSuperhost: host.is_superhost,
                                        responseTime: 'within an hour',
                                        yearsHosting: 2,
                                        verified: true,
                                    }}
                                    propertyType={property.details.type}
                                    maxGuests={property.details.guests}
                                    bedrooms={property.details.bedrooms}
                                    beds={property.details.beds}
                                    bathrooms={property.details.bathrooms}
                                />
                            )}
                            {property.highlights && <PropertyHighlights highlights={property.highlights} />}
                            {property.description && <Description description={property.description} />}
                            <Amenities
                                amenities={amenities.map((a) => ({ ...a, category: 'essentials' as const, available: true }))}
                                totalCount={amenities.length}
                            />
                            <Reviews
                                reviews={reviews.map((r) => ({
                                    id: r.id,
                                    author: r.reviewer?.name ?? 'Guest',
                                    avatar: r.reviewer?.avatar ?? '',
                                    rating: r.rating,
                                    date: r.date,
                                    comment: r.comment,
                                }))}
                                rating={Number(property.rating)}
                                totalCount={property.reviews_count}
                            />
                            <LocationMap
                                latitude={property.coordinates.latitude}
                                longitude={property.coordinates.longitude}
                                location={property.location}
                            />
                        </div>

                        {/* Right Column - Booking Widget (Desktop Only) */}
                        <div className="hidden lg:col-span-1 lg:block">
                            <BookingWidget
                                pricePerNight={property.price.amount}
                                rating={Number(property.rating)}
                                reviewCount={property.reviews_count}
                                cleaningFee={property.price.cleaning_fee}
                                serviceFee={property.price.service_fee}
                            />
                        </div>
                    </div>
                </main>

                {/* Footer (Desktop) */}
                <div className="hidden lg:block">
                    <Footer />
                </div>

                {/* Mobile Booking Bar */}
                <MobileBookingBar pricePerNight={property.price.amount} />
            </div>
        </>
    );
}
