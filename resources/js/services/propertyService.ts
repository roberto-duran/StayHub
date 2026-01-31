import type { PropertyDetail } from '@/types/property';

export const mockPropertyDetails: PropertyDetail[] = [
    {
        id: 1,
        title: 'Eco-Luxe Forest Cabin with Private Stream',
        location: 'Asheville, North Carolina, United States',
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
        imageAlt: 'Beautiful forest cabin exterior',
        pricePerNight: 125,
        rating: 4.96,
        dates: 'Oct 24-29',
        images: [
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        ],
        description:
            'Escape to this sustainable sanctuary nestled in the heart of the forest. Our Eco-Luxe Cabin offers a perfect blend of modern comfort and environmental responsibility. Built with reclaimed materials and powered by solar energy, you can enjoy a guilt-free luxury experience.\n\nWake up to the sound of the private stream running just feet from the deck. The floor-to-ceiling windows bring the outdoors in, while the radiant floor heating keeps you cozy during chilly nights.',
        reviewCount: 24,
        propertyType: 'Entire cabin',
        bedrooms: 2,
        bathrooms: 1,
        beds: 2,
        maxGuests: 4,
        amenities: [
            { id: 1, name: 'Fast Wifi (120 Mbps)', icon: 'Wifi', category: 'essentials', available: true },
            { id: 2, name: 'Free parking on premises', icon: 'Car', category: 'essentials', available: true },
            { id: 3, name: 'Fully equipped kitchen', icon: 'ChefHat', category: 'essentials', available: true },
            { id: 4, name: 'Private patio or balcony', icon: 'Trees', category: 'features', available: true },
            { id: 5, name: 'Dedicated workspace', icon: 'Briefcase', category: 'features', available: true },
            { id: 6, name: 'Central air conditioning', icon: 'Snowflake', category: 'features', available: true },
            { id: 7, name: 'EV charger', icon: 'BatteryCharging', category: 'features', available: true },
            { id: 8, name: 'Pool', icon: 'Waves', category: 'features', available: false },
        ],
        reviews: [
            {
                id: 1,
                author: 'Alex',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
                rating: 5,
                date: 'October 2023',
                comment:
                    'Absolutely stunning place! The focus on sustainability was inspiring, and the cabin itself was incredibly comfortable. Highly recommend!',
            },
            {
                id: 2,
                author: 'Jessica',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                rating: 5,
                date: 'September 2023',
                comment:
                    'A peaceful retreat. The stream sounds are so relaxing. The host, Sarah, was very responsive and provided great local tips.',
            },
        ],
        host: {
            id: 1,
            name: 'Sarah',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
            isSuperhost: true,
            responseTime: 'within an hour',
            yearsHosting: 4,
            verified: true,
        },
        latitude: 35.5951,
        longitude: -82.5515,
        highlights: [
            {
                icon: 'Award',
                title: 'Sarah is a Superhost',
                description: 'Superhosts are experienced, highly rated hosts.',
            },
            {
                icon: 'Leaf',
                title: 'Eco-Certified Property',
                description: 'This home meets high standards for energy efficiency and sustainability.',
            },
            {
                icon: 'MapPin',
                title: 'Great location',
                description: '100% of recent guests gave the location a 5-star rating.',
            },
        ],
        cleaningFee: 45,
        serviceFee: 93,
        ecoCertified: true,
    },
    {
        id: 2,
        title: 'Modern Loft with City Views',
        location: 'Manhattan, New York',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        imageAlt: 'Modern loft interior',
        pricePerNight: 285,
        rating: 4.92,
        dates: 'Mar 1-6',
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        ],
        description:
            'Stunning modern loft in the heart of Manhattan with panoramic city views. Floor-to-ceiling windows flood the space with natural light, while the open floor plan creates a sense of spaciousness.\n\nPerfect for business travelers or couples looking for a stylish urban retreat. Walking distance to subway, restaurants, and cultural attractions.',
        reviewCount: 128,
        propertyType: 'Entire apartment',
        bedrooms: 2,
        bathrooms: 1,
        beds: 2,
        maxGuests: 4,
        amenities: [
            { id: 1, name: 'Fast Wifi', icon: 'Wifi', category: 'essentials', available: true },
            { id: 2, name: 'Kitchen', icon: 'ChefHat', category: 'essentials', available: true },
            { id: 3, name: 'Air conditioning', icon: 'Snowflake', category: 'features', available: true },
            { id: 4, name: 'Washer', icon: 'Shirt', category: 'features', available: true },
            { id: 5, name: 'Gym access', icon: 'Dumbbell', category: 'features', available: true },
            { id: 6, name: 'Doorman', icon: 'User', category: 'safety', available: true },
        ],
        reviews: [
            {
                id: 1,
                author: 'Michael',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
                rating: 5,
                date: 'February 2024',
                comment: 'Incredible views and perfect location. The loft was exactly as pictured. Would definitely stay again!',
            },
        ],
        host: {
            id: 2,
            name: 'David',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
            isSuperhost: true,
            responseTime: 'within a few hours',
            yearsHosting: 6,
            verified: true,
        },
        latitude: 40.7589,
        longitude: -73.9851,
        highlights: [
            {
                icon: 'Award',
                title: 'David is a Superhost',
                description: 'Superhosts are experienced, highly rated hosts.',
            },
            {
                icon: 'MapPin',
                title: 'Great for remote work',
                description: 'Fast wifi and a dedicated workspace.',
            },
        ],
        cleaningFee: 75,
        serviceFee: 142,
        ecoCertified: false,
    },
];

export function getPropertyById(id: number): PropertyDetail | undefined {
    return mockPropertyDetails.find((property) => property.id === id);
}

export function getAllProperties(): PropertyDetail[] {
    return mockPropertyDetails;
}

export function calculateTotalPrice(pricePerNight: number, nights: number, cleaningFee: number, serviceFee: number) {
    const subtotal = pricePerNight * nights;
    const total = subtotal + cleaningFee + serviceFee;
    return { subtotal, cleaningFee, serviceFee, total, nights };
}
