import { Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import type { PropertyDetail } from '@/types/property';
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
import { getPropertyById } from '@/services/propertyService';

interface PropertyShowProps {
    propertyId: string;
}

export default function PropertyShow({ propertyId }: PropertyShowProps) {
    const property = getPropertyById(propertyId);

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
                    <ImageCarousel images={property.images} title={property.title} ecoCertified={property.ecoCertified} />
                </div>

                {/* Main Content */}
                <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
                    {/* Desktop Header & Gallery */}
                    <div className="hidden lg:block">
                        <PropertyHeader
                            title={property.title}
                            rating={property.rating}
                            reviewCount={property.reviewCount}
                            location={property.location}
                            isSuperhost={property.host.isSuperhost}
                        />
                        <ImageGallery
                            images={property.images}
                            title={property.title}
                            ecoCertified={property.ecoCertified}
                        />
                    </div>

                    {/* Mobile Title */}
                    <div className="mb-6 lg:hidden">
                        <h1 className="mb-2 text-2xl font-bold leading-tight text-gray-900">{property.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                            <div className="flex items-center gap-1 font-semibold text-gray-900">
                                <span className="text-stay-primary">★</span>
                                {property.rating}
                            </div>
                            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                            <a href="#" className="font-medium text-gray-600 underline">
                                {property.reviewCount} reviews
                            </a>
                            {property.host.isSuperhost && (
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
                            <HostInfo
                                host={property.host}
                                propertyType={property.propertyType}
                                maxGuests={property.maxGuests}
                                bedrooms={property.bedrooms}
                                beds={property.beds}
                                bathrooms={property.bathrooms}
                            />
                            <PropertyHighlights highlights={property.highlights} />
                            <Description description={property.description} />
                            <Amenities amenities={property.amenities} totalCount={32} />
                            <Reviews
                                reviews={property.reviews}
                                rating={property.rating}
                                totalCount={property.reviewCount}
                            />
                            <LocationMap
                                latitude={property.latitude}
                                longitude={property.longitude}
                                location={property.location}
                            />
                        </div>

                        {/* Right Column - Booking Widget (Desktop Only) */}
                        <div className="hidden lg:col-span-1 lg:block">
                            <BookingWidget
                                pricePerNight={property.pricePerNight}
                                rating={property.rating}
                                reviewCount={property.reviewCount}
                                cleaningFee={property.cleaningFee}
                                serviceFee={property.serviceFee}
                            />
                        </div>
                    </div>
                </main>

                {/* Footer (Desktop) */}
                <div className="hidden lg:block">
                    <Footer />
                </div>

                {/* Mobile Booking Bar */}
                <MobileBookingBar pricePerNight={property.pricePerNight} />
            </div>
        </>
    );
}
