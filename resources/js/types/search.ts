import type { Property } from './property';

/**
 * Map property for search results (uses new API format)
 */
export interface MapProperty {
    id: string;
    title: string;
    location: string;
    price: {
        amount: number;
        currency: string;
        cleaning_fee: number;
        service_fee: number;
    };
    rating: number;
    reviews_count: number;
    details: {
        guests: number;
        bedrooms: number;
        beds: number;
        bathrooms: number;
        type: string;
        eco_certified: boolean;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
    images: {
        main: string;
        alt: string;
        gallery: string[] | null;
    };
    dates_lbl: string;
    highlights: Array<{ icon: string; title: string; description: string }> | null;
    host?: {
        id: string | number;
        name: string;
        avatar: string;
        is_superhost: boolean;
        joined_at: string;
    };
    amenities?: Array<{ id: string | number; name: string; icon: string }>;
    description?: string;
}

export interface SearchFilters {
    location: string;
    checkIn: string | null;
    checkOut: string | null;
    guests: number;
    minPrice: number;
    maxPrice: number;
    propertyTypes: string[];
    minArea: number | null;
    maxArea: number | null;
    minFloor: number | null;
    maxFloor: number | null;
}

export interface MapBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}

export interface MapViewport {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface PropertyCluster {
    id: string;
    latitude: number;
    longitude: number;
    count: number;
    propertyIds: string[];
}
