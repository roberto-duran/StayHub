import { Head } from '@inertiajs/react';
import { Building2, CalendarCheck, DollarSign, TrendingUp, Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Owner Dashboard',
        href: '/owner/dashboard',
    },
];

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ReactNode;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
    const changeColor = {
        positive: 'text-green-600',
        negative: 'text-red-600',
        neutral: 'text-gray-500',
    }[changeType];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
                    <p className={`mt-1 text-sm ${changeColor}`}>{change}</p>
                </div>
                <div className="rounded-full bg-stay-primary/10 p-3 text-stay-primary">{icon}</div>
            </div>
        </div>
    );
}

export default function OwnerDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Owner Dashboard - StayHub" />

            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
                        <p className="text-gray-500">Manage your properties and bookings</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-stay-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-stay-primary/90">
                        <Plus className="h-5 w-5" />
                        Add Property
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Properties"
                        value="3"
                        change="+1 this month"
                        changeType="positive"
                        icon={<Building2 className="h-6 w-6" />}
                    />
                    <StatCard
                        title="Active Bookings"
                        value="7"
                        change="2 pending confirmation"
                        changeType="neutral"
                        icon={<CalendarCheck className="h-6 w-6" />}
                    />
                    <StatCard
                        title="Monthly Revenue"
                        value="$4,250"
                        change="+12% from last month"
                        changeType="positive"
                        icon={<DollarSign className="h-6 w-6" />}
                    />
                    <StatCard
                        title="Occupancy Rate"
                        value="78%"
                        change="+5% from last month"
                        changeType="positive"
                        icon={<TrendingUp className="h-6 w-6" />}
                    />
                </div>

                {/* Recent Bookings */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[
                            { guest: 'Sarah Johnson', property: 'Eco-Luxe Forest Cabin', dates: 'Feb 15-20', status: 'Confirmed', amount: '$625' },
                            { guest: 'Michael Chen', property: 'Modern Downtown Loft', dates: 'Feb 18-22', status: 'Pending', amount: '$1,140' },
                            { guest: 'Emma Wilson', property: 'Eco-Luxe Forest Cabin', dates: 'Feb 25-28', status: 'Confirmed', amount: '$375' },
                        ].map((booking, index) => (
                            <div key={index} className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-600">
                                        {booking.guest.split(' ').map((n) => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{booking.guest}</p>
                                        <p className="text-sm text-gray-500">{booking.property}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">{booking.dates}</p>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                booking.status === 'Confirmed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {booking.status}
                                        </span>
                                        <span className="font-semibold text-gray-900">{booking.amount}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* My Properties */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">My Properties</h2>
                    </div>
                    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { name: 'Eco-Luxe Forest Cabin', location: 'Asheville, NC', rating: 4.96, bookings: 12, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop' },
                            { name: 'Modern Downtown Loft', location: 'New York, NY', rating: 4.85, bookings: 8, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop' },
                            { name: 'Beachfront Villa', location: 'Miami, FL', rating: 4.92, bookings: 15, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop' },
                        ].map((property, index) => (
                            <div key={index} className="overflow-hidden rounded-lg border border-gray-200">
                                <img src={property.image} alt={property.name} className="h-40 w-full object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900">{property.name}</h3>
                                    <p className="text-sm text-gray-500">{property.location}</p>
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-1 text-gray-600">
                                            <span className="text-stay-primary">★</span> {property.rating}
                                        </span>
                                        <span className="text-gray-500">{property.bookings} bookings</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
