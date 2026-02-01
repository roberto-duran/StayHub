import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Building2, CalendarCheck, DollarSign, Folder, LayoutGrid, Users, AlertTriangle, Home } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';

const ownerNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/owner/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Properties',
        href: '/owner/properties',
        icon: Building2,
    },
    {
        title: 'Bookings',
        href: '/owner/bookings',
        icon: CalendarCheck,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Properties',
        href: '/admin/properties',
        icon: Building2,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Back to Site',
        href: '/',
        icon: Home,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role;

    const navItems = userRole === 'admin' ? adminNavItems : ownerNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={userRole === 'admin' ? '/admin/dashboard' : '/owner/dashboard'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
