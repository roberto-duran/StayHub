import type { MapProperty, SearchFilters, MapViewport } from '@/types/search';

export const defaultFilters: SearchFilters = {
    location: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
    propertyTypes: [],
    minArea: null,
    maxArea: null,
    minFloor: null,
    maxFloor: null,
};

export const defaultViewport: MapViewport = {
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 12,
};

export const mapProperties: MapProperty[] = [
    {
        id: 1,
        title: 'Modern Loft with City Views',
        location: 'Manhattan, New York',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        imageAlt: 'Modern loft apartment with floor-to-ceiling windows',
        pricePerNight: 285,
        rating: 4.92,
        dates: 'Mar 1-6',
        latitude: 40.7589,
        longitude: -73.9851,
        bedrooms: 2,
        bathrooms: 1,
        area: 85,
        floor: 12,
        propertyType: 'apartment',
        amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Washer'],
        description: 'Stunning modern loft in the heart of Manhattan with panoramic city views.',
    },
    {
        id: 2,
        title: 'Cozy Brooklyn Brownstone',
        location: 'Brooklyn, New York',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        imageAlt: 'Classic Brooklyn brownstone exterior',
        pricePerNight: 195,
        rating: 4.87,
        dates: 'Mar 3-8',
        latitude: 40.6782,
        longitude: -73.9442,
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        floor: 2,
        propertyType: 'house',
        amenities: ['WiFi', 'Kitchen', 'Garden', 'Pet friendly'],
        description: 'Charming brownstone with original details and modern amenities.',
    },
    {
        id: 3,
        title: 'Luxury Penthouse Suite',
        location: 'Upper East Side, NY',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        imageAlt: 'Luxurious penthouse interior',
        pricePerNight: 530,
        rating: 4.98,
        dates: 'Mar 5-10',
        latitude: 40.7736,
        longitude: -73.9566,
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        floor: 25,
        propertyType: 'apartment',
        amenities: ['WiFi', 'Pool', 'Gym', 'Concierge', 'Terrace'],
        description: 'Exclusive penthouse with private terrace and stunning views.',
    },
    {
        id: 4,
        title: 'Artsy Studio in SoHo',
        location: 'SoHo, New York',
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        imageAlt: 'Artistic studio apartment',
        pricePerNight: 150,
        rating: 4.75,
        dates: 'Mar 2-7',
        latitude: 40.7233,
        longitude: -74.0030,
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        floor: 4,
        propertyType: 'studio',
        amenities: ['WiFi', 'Kitchen', 'Art supplies'],
        description: 'Creative studio space in the heart of SoHo art district.',
    },
    {
        id: 5,
        title: 'Hudson River View Condo',
        location: 'Hell\'s Kitchen, NY',
        imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        imageAlt: 'Condo with river views',
        pricePerNight: 320,
        rating: 4.89,
        dates: 'Mar 4-9',
        latitude: 40.7623,
        longitude: -73.9971,
        bedrooms: 2,
        bathrooms: 2,
        area: 95,
        floor: 18,
        propertyType: 'condo',
        amenities: ['WiFi', 'Kitchen', 'Gym', 'Doorman'],
        description: 'Modern condo with stunning Hudson River views and building amenities.',
    },
    {
        id: 6,
        title: 'Charming Village Apartment',
        location: 'Greenwich Village, NY',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        imageAlt: 'Cozy village apartment',
        pricePerNight: 175,
        rating: 4.82,
        dates: 'Mar 6-11',
        latitude: 40.7336,
        longitude: -74.0027,
        bedrooms: 1,
        bathrooms: 1,
        area: 55,
        floor: 3,
        propertyType: 'apartment',
        amenities: ['WiFi', 'Kitchen', 'Fireplace'],
        description: 'Classic Village apartment with exposed brick and cozy atmosphere.',
    },
    {
        id: 7,
        title: 'Midtown Executive Suite',
        location: 'Midtown, New York',
        imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
        imageAlt: 'Executive suite interior',
        pricePerNight: 410,
        rating: 4.94,
        dates: 'Mar 7-12',
        latitude: 40.7549,
        longitude: -73.9840,
        bedrooms: 2,
        bathrooms: 2,
        area: 110,
        floor: 32,
        propertyType: 'apartment',
        amenities: ['WiFi', 'Kitchen', 'Office space', 'Gym', 'Pool'],
        description: 'Sophisticated executive suite perfect for business travelers.',
    },
    {
        id: 8,
        title: 'Williamsburg Artist Loft',
        location: 'Williamsburg, Brooklyn',
        imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        imageAlt: 'Industrial artist loft',
        pricePerNight: 225,
        rating: 4.79,
        dates: 'Mar 8-13',
        latitude: 40.7081,
        longitude: -73.9571,
        bedrooms: 2,
        bathrooms: 1,
        area: 100,
        floor: 5,
        propertyType: 'apartment',
        amenities: ['WiFi', 'Kitchen', 'Rooftop access', 'Bike storage'],
        description: 'Spacious industrial loft with creative vibes in trendy Williamsburg.',
    },
];

export function filterProperties(
    properties: MapProperty[],
    filters: SearchFilters
): MapProperty[] {
    return properties.filter((property) => {
        if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
        }

        if (property.pricePerNight < filters.minPrice || property.pricePerNight > filters.maxPrice) {
            return false;
        }

        if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.propertyType)) {
            return false;
        }

        if (filters.minArea !== null && property.area < filters.minArea) {
            return false;
        }

        if (filters.maxArea !== null && property.area > filters.maxArea) {
            return false;
        }

        if (filters.minFloor !== null && property.floor < filters.minFloor) {
            return false;
        }

        if (filters.maxFloor !== null && property.floor > filters.maxFloor) {
            return false;
        }

        return true;
    });
}

export function getPropertyById(id: number): MapProperty | undefined {
    return mapProperties.find((property) => property.id === id);
}
