import { Head } from '@inertiajs/react';
import { Building2, CheckCircle, XCircle, Eye } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Properties',
        href: '/admin/properties',
    },
];

export default function AdminProperties() {
    const properties = [
        { id: 1, name: 'Eco-Luxe Forest Cabin', owner: 'John Owner', location: 'Asheville, NC', status: 'Active', reported: false, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=100&h=100&fit=crop' },
        { id: 2, name: 'Modern Downtown Loft', owner: 'Jane Smith', location: 'New York, NY', status: 'Active', reported: true, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop' },
        { id: 3, name: 'Beachfront Villa', owner: 'Mike Johnson', location: 'Miami, FL', status: 'Pending Review', reported: false, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=100&h=100&fit=crop' },
        { id: 4, name: 'Mountain Retreat', owner: 'Sarah Wilson', location: 'Denver, CO', status: 'Active', reported: false, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100&h=100&fit=crop' },
        { id: 5, name: 'City Center Apartment', owner: 'Tom Brown', location: 'Chicago, IL', status: 'Suspended', reported: true, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Properties - Admin - StayHub" />

            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Properties</h1>
                    <p className="text-gray-500">Review and moderate platform properties</p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: 'Total Properties', value: '456', color: 'text-blue-600' },
                        { label: 'Active', value: '398', color: 'text-green-600' },
                        { label: 'Pending Review', value: '45', color: 'text-yellow-600' },
                        { label: 'Reported', value: '13', color: 'text-red-600' },
                    ].map((stat, index) => (
                        <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Properties Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Property
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Owner
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {properties.map((property) => (
                                <tr key={property.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={property.image} alt={property.name} className="h-12 w-12 rounded-lg object-cover" />
                                            <div>
                                                <span className="font-medium text-gray-900">{property.name}</span>
                                                {property.reported && (
                                                    <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                                                        Reported
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{property.owner}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{property.location}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                property.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : property.status === 'Pending Review'
                                                      ? 'bg-yellow-100 text-yellow-700'
                                                      : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {property.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100" title="View">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-100" title="Approve">
                                                <CheckCircle className="h-4 w-4" />
                                            </button>
                                            <button className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-100" title="Suspend">
                                                <XCircle className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
