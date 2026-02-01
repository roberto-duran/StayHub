/**
 * Price information for a property.
 */
export interface PropertyPrice {
    amount: number;
    currency: string;
    cleaning_fee: number;
    service_fee: number;
}

/**
 * Property details (guests, bedrooms, etc.)
 */
export interface PropertyDetails {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    type: string;
    eco_certified: boolean;
}

/**
 * Property coordinates.
 */
export interface PropertyCoordinates {
    latitude: number;
    longitude: number;
}

/**
 * Property images.
 */
export interface PropertyImages {
    main: string;
    alt: string;
    gallery: string[] | null;
}

/**
 * Represents a vacation rental property listing (API format).
 */
export interface Property {
    /** Unique identifier for the property */
    id: string;
    /** Display title/name of the property */
    title: string;
    /** Full description text */
    description: string;
    /** Location description (city, region/country) */
    location: string;
    /** Price information */
    price: PropertyPrice;
    /** Average rating (0-5 scale) */
    rating: number;
    /** Number of reviews */
    reviews_count: number;
    /** Property details */
    details: PropertyDetails;
    /** Coordinates */
    coordinates: PropertyCoordinates;
    /** Images */
    images: PropertyImages;
    /** Date range for availability display */
    dates_lbl: string;
    /** Key highlights/features */
    highlights: PropertyHighlight[] | null;
    /** Host information (when loaded) */
    host?: Host;
    /** Amenities (when loaded) */
    amenities?: Amenity[];
    /** Reviews (when loaded) */
    reviews?: Review[];
}

/**
 * Legacy property format for backward compatibility with mock data.
 */
export interface LegacyProperty {
    id: string;
    title: string;
    location: string;
    imageUrl: string;
    imageAlt: string;
    pricePerNight: number;
    rating: number;
    dates: string;
}

/**
 * Extended property with full details for the detail page.
 * @deprecated Use Property interface with all relationships loaded
 */
export interface PropertyDetail extends LegacyProperty {
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
 * Property amenity with icon.
 */
export interface Amenity {
    id: string | number;
    name: string;
    icon: string;
}

/**
 * Guest review (API format).
 */
export interface Review {
    id: string | number;
    rating: number;
    comment: string;
    date: string;
    reviewer?: {
        id: string | number;
        name: string;
        avatar: string;
        is_superhost: boolean;
        joined_at: string;
    };
}

/**
 * Property host information (API format).
 */
export interface Host {
    id: string | number;
    name: string;
    avatar: string;
    is_superhost: boolean;
    joined_at: string;
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
    id: string | number;
    /** Display name of the category */
    name: string;
    /** URL slug for the category */
    slug: string;
    /** Lucide icon name for the category */
    icon: string;
}
