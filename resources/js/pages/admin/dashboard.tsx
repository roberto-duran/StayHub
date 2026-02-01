import { Head } from '@inertiajs/react';
import { Users, Building2, CalendarCheck, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
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
                <div className="rounded-full bg-blue-100 p-3 text-blue-600">{icon}</div>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard - StayHub" />

            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500">Platform overview and management</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Users"
                        value="1,234"
                        change="+52 this week"
                        changeType="positive"
                        icon={<Users className="h-6 w-6" />}
                    />
                    <StatCard
                        title="Total Properties"
                        value="456"
                        change="+12 this week"
                        changeType="positive"
                        icon={<Building2 className="h-6 w-6" />}
                    />
                    <StatCard
                        title="Active Bookings"
                        value="89"
                        change="23 pending"
                        changeType="neutral"
                        icon={<CalendarCheck className="h-6 w-6" />}
                    />
                    <StatCard
                        title="Reports"
                        value="5"
                        change="3 require attention"
                        changeType="negative"
                        icon={<AlertTriangle className="h-6 w-6" />}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Revenue Chart Placeholder */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Platform Revenue</h2>
                            <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                            <div className="text-center">
                                <Activity className="mx-auto mb-2 h-12 w-12" />
                                <p>Revenue chart placeholder</p>
                                <p className="text-sm">$125,430 this month</p>
                            </div>
                        </div>
                    </div>

                    {/* User Growth Chart Placeholder */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
                            <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                            <div className="text-center">
                                <Activity className="mx-auto mb-2 h-12 w-12" />
                                <p>User growth chart placeholder</p>
                                <p className="text-sm">+18% this month</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Activity */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[
                                { action: 'New user registered', user: 'john@example.com', time: '2 min ago', type: 'user' },
                                { action: 'Property listed', user: 'Beach House in Miami', time: '15 min ago', type: 'property' },
                                { action: 'Booking completed', user: 'Order #12345', time: '1 hour ago', type: 'booking' },
                                { action: 'Report submitted', user: 'Property #789', time: '2 hours ago', type: 'report' },
                                { action: 'Owner verified', user: 'jane@example.com', time: '3 hours ago', type: 'user' },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center justify-between px-6 py-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-2 w-2 rounded-full ${
                                                activity.type === 'user'
                                                    ? 'bg-blue-500'
                                                    : activity.type === 'property'
                                                      ? 'bg-green-500'
                                                      : activity.type === 'booking'
                                                        ? 'bg-purple-500'
                                                        : 'bg-orange-500'
                                            }`}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                            <p className="text-xs text-gray-500">{activity.user}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                        </div>
                        <div className="space-y-2 p-4">
                            <a
                                href="/admin/users"
                                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                <Users className="h-5 w-5" />
                                <span>Manage Users</span>
                            </a>
                            <a
                                href="/admin/properties"
                                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                <Building2 className="h-5 w-5" />
                                <span>Review Properties</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                <AlertTriangle className="h-5 w-5" />
                                <span>View Reports</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
