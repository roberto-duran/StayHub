import type { Category, Property } from '@/types/property';

/**
 * Mock featured properties data with Unsplash images.
 * Images are eco-luxury vacation rentals matching the StayHub theme.
 */
export const featuredProperties: Property[] = [
    {
        id: '0194d3c4-9c02-7a56-8e5a-736021480112',
        title: 'Solar-powered retreat',
        location: 'Joshua Tree, California',
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=800&fit=crop',
        imageAlt: 'Luxurious wooden cabin with pool in Joshua Tree desert landscape',
        pricePerNight: 245,
        rating: 4.98,
        dates: 'Oct 22 – 27',
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
    },
];

/**
 * Property categories with Lucide icon names.
 */
export const propertyCategories: Category[] = [
    { id: 'treehouses', name: 'Treehouses', icon: 'TreePine' },
    { id: 'cabins', name: 'Cabins', icon: 'House' },
    { id: 'beachfront', name: 'Beachfront', icon: 'Waves' },
    { id: 'off-grid', name: 'Off-grid', icon: 'Zap' },
    { id: 'vineyards', name: 'Vineyards', icon: 'Wine' },
    { id: 'tiny-homes', name: 'Tiny Homes', icon: 'Home' },
    { id: 'amazing-pools', name: 'Amazing pools', icon: 'Droplets' },
    { id: 'lakefront', name: 'Lakefront', icon: 'Sailboat' },
    { id: 'national-parks', name: 'National parks', icon: 'Mountain' },
];

/**
 * Get featured properties for the homepage.
 */
export function getFeaturedProperties(): Property[] {
    return featuredProperties;
}

/**
 * Get property categories for filtering.
 */
export function getPropertyCategories(): Category[] {
    return propertyCategories;
}
