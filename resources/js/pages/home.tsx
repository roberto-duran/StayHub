import { Head } from '@inertiajs/react';
import {
    CategoryBar,
    FloatingMapButton,
    Footer,
    Header,
    PropertyGrid,
} from '@/components/home';
import type { Property, Category } from '@/types/property';

interface ResourceCollection<T> {
    data: T[];
}

interface HomePageProps {
    properties: ResourceCollection<Property>;
    categories: ResourceCollection<Category>;
}

/**
 * StayHub HomePage - Airbnb-style property listings page.
 * Features sticky header with search, category filters, property grid, and footer.
 */
export default function HomePage({ properties, categories }: HomePageProps) {
    return (
        <>
            <Head title="Eco-Luxe Vacation Rentals" />

            {/* Sticky Header */}
            <header className="fixed top-0 w-full z-50 bg-stay-background-light border-b border-[#e7f4f0] shadow-sm transition-all duration-300">
                <Header />
                <CategoryBar categories={categories.data} />
            </header>

            {/* Main Content Spacer for Fixed Header */}
            <div className="h-44 md:h-48 w-full" />

            {/* Property Listings Grid */}
            <PropertyGrid properties={properties.data} />

            {/* Floating Map Button */}
            <FloatingMapButton />

            {/* Footer */}
            <Footer />
        </>
    );
}
