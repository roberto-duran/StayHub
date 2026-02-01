/**
 * Represents a vacation rental property listing.
 */
export interface Property {
    /** Unique identifier for the property */
    id: string;
    /** Display title/name of the property */
    title: string;
    /** Location description (city, region/country) */
    location: string;
    /** URL to the property's main image */
    imageUrl: string;
    /** Alt text for the image for accessibility */
    imageAlt: string;
    /** Price per night in USD */
    pricePerNight: number;
    /** Average rating (0-5 scale) */
    rating: number;
    /** Date range for availability display */
    dates: string;
}

/**
 * Extended property with full details for the detail page.
 */
export interface PropertyDetail extends Property {
    /** All property images */
    images: string[];
    /** Full description text */
    description: string;
    /** Number of reviews */
    reviewCount: number;
    /** Property type (cabin, apartment, villa, etc.) */
    propertyType: string;
    /** Number of bedrooms */
    bedrooms: number;
    /** Number of bathrooms */
    bathrooms: number;
    /** Number of beds */
    beds: number;
    /** Maximum guest capacity */
    maxGuests: number;
    /** List of amenities */
    amenities: Amenity[];
    /** Guest reviews */
    reviews: Review[];
    /** Host information */
    host: Host;
    /** Property latitude */
    latitude: number;
    /** Property longitude */
    longitude: number;
    /** Key highlights/features */
    highlights: PropertyHighlight[];
    /** Cleaning fee */
    cleaningFee: number;
    /** Service fee */
    serviceFee: number;
    /** Whether property is eco-certified */
    ecoCertified: boolean;
}

/**
 * Property amenity with icon and category.
 */
export interface Amenity {
    id: string | number;
    name: string;
    icon: string;
    category: 'essentials' | 'features' | 'safety' | 'location';
    available: boolean;
}

/**
 * Guest review.
 */
export interface Review {
    id: string | number;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
}

/**
 * Property host information.
 */
export interface Host {
    id: string | number;
    name: string;
    avatar: string;
    isSuperhost: boolean;
    responseTime: string;
    yearsHosting: number;
    verified: boolean;
}

/**
 * Property highlight/feature.
 */
export interface PropertyHighlight {
    icon: string;
    title: string;
    description: string;
}

/**
 * Represents a category filter for property listings.
 */
export interface Category {
    /** Unique identifier for the category */
    id: string;
    /** Display name of the category */
    name: string;
    /** Lucide icon name for the category */
    icon: string;
}
