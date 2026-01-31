import type { Property } from './property';

export interface MapProperty extends Property {
    latitude: number;
    longitude: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    floor: number;
    propertyType: 'apartment' | 'house' | 'villa' | 'condo' | 'studio';
    amenities: string[];
    description: string;
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
    propertyIds: number[];
}
