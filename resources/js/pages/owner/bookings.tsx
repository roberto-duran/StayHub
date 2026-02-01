import { Head } from '@inertiajs/react';
import { CalendarCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Owner Dashboard',
        href: '/owner/dashboard',
    },
    {
        title: 'Bookings',
        href: '/owner/bookings',
    },
];

export default function OwnerBookings() {
    const bookings = [
        { id: 1, guest: 'Sarah Johnson', property: 'Eco-Luxe Forest Cabin', checkIn: '2026-02-15', checkOut: '2026-02-20', status: 'Confirmed', amount: 625 },
        { id: 2, guest: 'Michael Chen', property: 'Modern Downtown Loft', checkIn: '2026-02-18', checkOut: '2026-02-22', status: 'Pending', amount: 1140 },
        { id: 3, guest: 'Emma Wilson', property: 'Eco-Luxe Forest Cabin', checkIn: '2026-02-25', checkOut: '2026-02-28', status: 'Confirmed', amount: 375 },
        { id: 4, guest: 'James Brown', property: 'Beachfront Villa', checkIn: '2026-03-01', checkOut: '2026-03-07', status: 'Pending', amount: 1890 },
        { id: 5, guest: 'Lisa Anderson', property: 'Modern Downtown Loft', checkIn: '2026-03-10', checkOut: '2026-03-15', status: 'Confirmed', amount: 1425 },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bookings - Owner - StayHub" />

            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
                    <p className="text-gray-500">Manage guest bookings for your properties</p>
                </div>

                {/* Bookings Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Guest
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Property
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Dates
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                                                {booking.guest.split(' ').map((n) => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-gray-900">{booking.guest}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{booking.property}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                booking.status === 'Confirmed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">${booking.amount}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex gap-2">
                                            {booking.status === 'Pending' && (
                                                <>
                                                    <button className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200">
                                                        Confirm
                                                    </button>
                                                    <button className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200">
                                                        Decline
                                                    </button>
                                                </>
                                            )}
                                            {booking.status === 'Confirmed' && (
                                                <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200">
                                                    View Details
                                                </button>
                                            )}
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
