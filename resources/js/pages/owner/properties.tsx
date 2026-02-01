import { Head } from '@inertiajs/react';
import { Plus, Building2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Owner Dashboard',
        href: '/owner/dashboard',
    },
    {
        title: 'Properties',
        href: '/owner/properties',
    },
];

export default function OwnerProperties() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Properties - Owner - StayHub" />

            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
                        <p className="text-gray-500">Manage your listed properties</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-stay-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-stay-primary/90">
                        <Plus className="h-5 w-5" />
                        Add Property
                    </button>
                </div>

                {/* Properties Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { name: 'Eco-Luxe Forest Cabin', location: 'Asheville, NC', status: 'Active', rating: 4.96, bookings: 12, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop' },
                        { name: 'Modern Downtown Loft', location: 'New York, NY', status: 'Active', rating: 4.85, bookings: 8, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop' },
                        { name: 'Beachfront Villa', location: 'Miami, FL', status: 'Pending Review', rating: null, bookings: 0, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop' },
                    ].map((property, index) => (
                        <div key={index} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="relative">
                                <img src={property.image} alt={property.name} className="h-48 w-full object-cover" />
                                <span
                                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                                        property.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                >
                                    {property.status}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900">{property.name}</h3>
                                <p className="text-sm text-gray-500">{property.location}</p>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    {property.rating ? (
                                        <span className="flex items-center gap-1 text-gray-600">
                                            <span className="text-stay-primary">★</span> {property.rating}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">No reviews yet</span>
                                    )}
                                    <span className="text-gray-500">{property.bookings} bookings</span>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                                        Edit
                                    </button>
                                    <button className="flex-1 rounded-lg bg-stay-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-stay-primary/90">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
