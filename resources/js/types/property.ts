/**
 * Represents a vacation rental property listing.
 */
export interface Property {
    /** Unique identifier for the property */
    id: number;
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
