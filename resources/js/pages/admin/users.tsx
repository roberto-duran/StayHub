import { Head, router, usePage } from '@inertiajs/react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Users',
        href: '/admin/users',
    },
];

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface AdminUsersProps {
    users: PaginatedUsers;
    filters: {
        search: string | null;
        role: string | null;
    };
}

export default function AdminUsers({ users, filters }: AdminUsersProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users', { search, role: roleFilter }, { preserveState: true });
    };

    const handleRoleChange = (userId: string, newRole: string) => {
        router.patch(`/admin/users/${userId}`, { role: newRole }, { preserveState: true });
    };

    const handleRoleFilter = (role: string) => {
        setRoleFilter(role);
        router.get('/admin/users', { search, role: role || undefined }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users - Admin - StayHub" />

            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
                    <p className="text-gray-500">View and manage all platform users</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-stay-primary focus:outline-none focus:ring-1 focus:ring-stay-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex gap-2">
                        {['', 'client', 'owner', 'admin'].map((role) => (
                            <button
                                key={role || 'all'}
                                type="button"
                                onClick={() => handleRoleFilter(role)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                    roleFilter === role
                                        ? 'bg-stay-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'All'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Joined
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                                                {user.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <select
                                            value={user.role || 'client'}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className={`rounded-lg border px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-stay-primary ${
                                                user.role === 'admin'
                                                    ? 'border-purple-200 bg-purple-50 text-purple-700'
                                                    : user.role === 'owner'
                                                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                                                      : 'border-gray-200 bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <option value="client">Client</option>
                                            <option value="owner">Owner</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium">{(users.current_page - 1) * users.per_page + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(users.current_page * users.per_page, users.total)}</span> of{' '}
                            <span className="font-medium">{users.total}</span> users
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                disabled={users.current_page === 1}
                                onClick={() => router.get('/admin/users', { ...filters, page: users.current_page - 1 })}
                                className="rounded-lg border border-gray-300 p-2 text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                disabled={users.current_page === users.last_page}
                                onClick={() => router.get('/admin/users', { ...filters, page: users.current_page + 1 })}
                                className="rounded-lg border border-gray-300 p-2 text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
