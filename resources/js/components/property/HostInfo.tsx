import { ShieldCheck } from 'lucide-react';
import type { Host } from '@/types/property';

interface HostInfoProps {
    host: Host;
    propertyType: string;
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
}

export function HostInfo({ host, propertyType, maxGuests, bedrooms, beds, bathrooms }: HostInfoProps) {
    return (
        <div className="flex items-center justify-between border-b border-gray-200 pb-8">
            <div>
                <h2 className="mb-1 text-xl font-bold">{propertyType} hosted by {host.name}</h2>
                <p className="text-gray-500">
                    {maxGuests} guests · {bedrooms} bedrooms · {beds} beds · {bathrooms} bath
                </p>
            </div>
            <div className="relative">
                <img
                    src={host.avatar}
                    alt={`Host ${host.name}`}
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
                />
                {host.verified && (
                    <div className="absolute -right-1 bottom-0 rounded-full border-2 border-white bg-stay-primary p-1 text-white shadow-sm">
                        <ShieldCheck className="h-3 w-3" />
                    </div>
                )}
            </div>
        </div>
    );
}
