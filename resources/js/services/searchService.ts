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
    latitude: 34.1333,
    longitude: -116.3131,
    zoom: 10,
};

export const mapProperties: MapProperty[] = [
    {
        id: '0194d3c4-9c02-7a56-8e5a-736021480112',
        title: 'Solar-powered retreat',
        location: 'Joshua Tree, California',
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=800&fit=crop',
        imageAlt: 'Luxurious wooden cabin with pool in Joshua Tree desert landscape',
        pricePerNight: 245,
        rating: 4.98,
        dates: 'Oct 22 – 27',
        latitude: 34.1333,
        longitude: -116.3131,
        bedrooms: 2,
        bathrooms: 1,
        area: 120,
        floor: 1,
        propertyType: 'house',
        amenities: ['Solar Energy', 'Wifi', 'Kitchen', 'Pool'],
        description: 'Escape to this solar-powered sanctuary nestled in the heart of Joshua Tree.',
    },
    {
        id: '0194d3c4-9c02-7f28-b0a7-20268578165b',
        title: 'Bamboo Eco-Villa',
        location: 'Bali, Indonesia',
        imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=800&fit=crop',
        imageAlt: 'Bamboo eco-villa surrounded by tropical jungle in Bali',
        pricePerNight: 125,
        rating: 4.85,
        dates: 'Nov 5 – 12',
        latitude: -8.4095,
        longitude: 115.1889,
        bedrooms: 1,
        bathrooms: 1,
        area: 85,
        floor: 1,
        propertyType: 'villa',
        amenities: ['WiFi', 'Kitchen', 'Outdoor Tub', 'Garden'],
        description: 'Immerse yourself in nature at this unique bamboo eco-villa.',
    },
    {
        id: '0194d3c4-9c02-7933-9f87-6e47f4f601b0',
        title: 'Jungle Sanctuary',
        location: 'Tulum, Mexico',
        imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=800&fit=crop',
        imageAlt: 'Modern jungle sanctuary structure in Tulum Mexico',
        pricePerNight: 310,
        rating: 5.0,
        dates: 'Dec 10 – 17',
        latitude: 20.2114,
        longitude: -87.4654,
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        floor: 1,
        propertyType: 'house',
        amenities: ['WiFi', 'Pool', 'Terrace', 'AC'],
        description: 'Modern jungle sanctuary structure in Tulum Mexico.',
    },
    {
        id: '0194d3c4-9c02-7d2d-a2f1-6e47f4f601b1',
        title: 'Forest bathing retreat',
        location: 'Portland, Oregon',
        imageUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=800&fit=crop',
        imageAlt: 'Cozy cabin in the woods of Portland Oregon',
        pricePerNight: 180,
        rating: 4.92,
        dates: 'Nov 15 – 20',
        latitude: 45.5152,
        longitude: -122.6784,
        bedrooms: 2,
        bathrooms: 1,
        area: 95,
        floor: 1,
        propertyType: 'cabin',
        amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Garden'],
        description: 'Cozy cabin in the woods of Portland Oregon.',
    },
    {
        id: '0194d3c4-9c02-7e2e-b3f2-6e47f4f601b2',
        title: 'Off-grid beach house',
        location: 'Maui, Hawaii',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop',
        imageAlt: 'Beach house with ocean view in Maui Hawaii',
        pricePerNight: 450,
        rating: 4.99,
        dates: 'Jan 5 – 12',
        latitude: 20.7984,
        longitude: -156.3319,
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        floor: 1,
        propertyType: 'house',
        amenities: ['WiFi', 'Beachfront', 'Private Pool', 'Kitchen'],
        description: 'Stunning off-grid beach house with breathtaking ocean views.',
    },
    {
        id: '0194d3c4-9c02-7f2f-c4f3-6e47f4f601b3',
        title: 'Zero-emission chalet',
        location: 'Aspen, Colorado',
        imageUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=800&fit=crop',
        imageAlt: 'Snow covered modern cabin in Aspen Colorado',
        pricePerNight: 620,
        rating: 4.88,
        dates: 'Dec 20 – 27',
        latitude: 39.1911,
        longitude: -106.8175,
        bedrooms: 4,
        bathrooms: 3,
        area: 250,
        floor: 2,
        propertyType: 'cabin',
        amenities: ['WiFi', 'Fireplace', 'Ski-in/Ski-out', 'Hot Tub'],
        description: 'Luxurious zero-emission chalet perfect for ski enthusiasts.',
    },
    {
        id: '0194d3c4-9c02-8030-d5f4-6e47f4f601b4',
        title: 'Glamping under stars',
        location: 'Sedona, Arizona',
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=800&fit=crop',
        imageAlt: 'Red rock landscape view from a glamping tent in Sedona Arizona',
        pricePerNight: 215,
        rating: 4.95,
        dates: 'Nov 2 – 7',
        latitude: 34.8697,
        longitude: -111.7601,
        bedrooms: 1,
        bathrooms: 0.5,
        area: 30,
        floor: 1,
        propertyType: 'tent',
        amenities: ['Stargazing', 'Fire Pit', 'Outdoor Shower'],
        description: 'Unique glamping experience under the beautiful Sedona stars.',
    },
    {
        id: '0194d3c4-9c02-8131-e6f5-6e47f4f601b5',
        title: 'Sustainable tiny home',
        location: 'Vancouver, Canada',
        imageUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=800&fit=crop',
        imageAlt: 'Lakeside cabin with mountain view in Vancouver Canada',
        pricePerNight: 145,
        rating: 4.9,
        dates: 'Oct 28 – Nov 4',
        latitude: 49.2827,
        longitude: -123.1207,
        bedrooms: 1,
        bathrooms: 1,
        area: 40,
        floor: 1,
        propertyType: 'house',
        amenities: ['WiFi', 'Kitchen', 'Lake View', 'Mountain View'],
        description: 'Eco-friendly tiny home with stunning lake and mountain views.',
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

export function getPropertyById(id: string): MapProperty | undefined {
    return mapProperties.find((property) => property.id === id);
}
