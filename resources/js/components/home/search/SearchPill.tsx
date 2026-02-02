import * as React from 'react';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LocationPanel } from './LocationPanel';
import { DateRangePanel } from './DateRangePanel';
import { GuestsPanel } from './GuestsPanel';
import { useIsMobile } from '@/hooks/use-mobile';

type PanelType = 'where' | 'when' | 'who' | null;

export function SearchPill() {
    const isMobile = useIsMobile();
    const [activePanel, setActivePanel] = React.useState<PanelType>(null);
    const [location, setLocation] = React.useState('');
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
    const [guests, setGuests] = React.useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    });
    const [isTravelingWithPets, setIsTravelingWithPets] = React.useState(false);

    // Auto-advance logic
    const handleLocationSelect = (value: string) => {
        setLocation(value);
        setActivePanel('when');
    };

    const handleDateSelect = () => {
        if (dateRange?.from && dateRange?.to) {
            setActivePanel('who');
        }
    };

    const totalGuests = guests.adults + guests.children;
    const guestLabel = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests';

    const handleSearch = () => {
        const params: Record<string, any> = {
            location,
            check_in: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
            check_out: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
            adults: guests.adults || undefined,
            children: guests.children || undefined,
            infants: guests.infants || undefined,
            pets: guests.pets || undefined,
            with_pets: isTravelingWithPets ? 1 : undefined,
        };

        // Remove undefined params
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        router.visit('/search', { data: params });
        setActivePanel(null);
    };

    const getPanelDisplay = (type: PanelType) => {
        switch (type) {
            case 'where':
                return location || 'Search destinations';
            case 'when':
                if (dateRange?.from && dateRange?.to) {
                    return `${format(dateRange.from, 'MMM d')} – ${format(dateRange.to, 'MMM d')}`;
                }
                return 'Add dates';
            case 'who':
                return guestLabel;
            default:
                return '';
        }
    };

    return (
        <div className="flex-1 max-w-2xl px-4 hidden md:flex justify-center">
            <div className={cn(
                "flex items-center bg-white border border-gray-200 rounded-full shadow-soft transition-all w-full max-w-212.5",
                activePanel ? "bg-gray-100 border-gray-100" : "hover:shadow-hover"
            )}>
                {/* Where */}
                <Popover open={activePanel === 'where'} onOpenChange={(open) => setActivePanel(open ? 'where' : null)}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className={cn(
                                "flex flex-col grow px-8 py-3.5 rounded-full transition-all text-left group",
                                activePanel === 'where' ? "bg-white shadow-xl" : "hover:bg-gray-200/60"
                            )}
                        >
                            <span className="text-xs font-bold text-stay-text-main tracking-tight uppercase">Where</span>
                            <span className={cn(
                                "text-sm truncate font-normal",
                                location ? "text-stay-text-main font-medium" : "text-stay-text-secondary"
                            )}>
                                {location || 'Search destinations'}
                            </span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-112.5 p-0 rounded-4xl mt-3 border-none shadow-2xl overflow-hidden" sideOffset={12}>
                        <LocationPanel
                            value={location}
                            onChange={(val) => setLocation(val)}
                            onSelect={handleLocationSelect}
                        />
                    </PopoverContent>
                </Popover>

                <div className="w-px h-8 bg-gray-200 self-center" />

                {/* When */}
                <Popover open={activePanel === 'when'} onOpenChange={(open) => setActivePanel(open ? 'when' : null)}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className={cn(
                                "flex flex-col grow px-8 py-3.5 rounded-full transition-all text-left",
                                activePanel === 'when' ? "bg-white shadow-xl" : "hover:bg-gray-200/60"
                            )}
                        >
                            <span className="text-xs font-bold text-stay-text-main tracking-tight uppercase">When</span>
                            <span className={cn(
                                "text-sm truncate font-normal",
                                dateRange?.from ? "text-stay-text-main font-medium" : "text-stay-text-secondary"
                            )}>
                                {dateRange?.from && dateRange?.to
                                    ? `${format(dateRange.from, 'MMM d')} – ${format(dateRange.to, 'MMM d')}`
                                    : 'Add dates'}
                            </span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent 
                        align="center" 
                        className="w-212.5 p-0 rounded-4xl mt-3 border-none shadow-2xl overflow-hidden" 
                        sideOffset={12}
                    >
                        <DateRangePanel
                            range={dateRange}
                            onRangeChange={setDateRange}
                            onDone={() => setActivePanel('who')}
                            onClear={() => setDateRange(undefined)}
                        />
                    </PopoverContent>
                </Popover>

                <div className="w-px h-8 bg-gray-200 self-center" />

                {/* Who */}
                <Popover open={activePanel === 'who'} onOpenChange={(open) => setActivePanel(open ? 'who' : null)}>
                    <PopoverTrigger asChild>
                        <div className={cn(
                            "flex items-center grow pl-8 pr-2 py-2 rounded-full transition-all text-left",
                            activePanel === 'who' ? "bg-white shadow-xl" : "hover:bg-gray-200/60"
                        )}>
                            <button
                                type="button"
                                className="flex flex-col grow text-left"
                            >
                                <span className="text-xs font-bold text-stay-text-main tracking-tight uppercase">Who</span>
                                <span className={cn(
                                    "text-sm truncate font-normal",
                                    totalGuests > 0 ? "text-stay-text-main font-medium" : "text-stay-text-secondary"
                                )}>
                                    {guestLabel}
                                </span>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSearch();
                                }}
                                className="bg-stay-primary p-4 rounded-full text-white flex items-center justify-center ml-2 hover:bg-opacity-90 transition-colors shadow-sm gap-2"
                            >
                                <Search className="h-4 w-4" strokeWidth={4} />
                                <span className="text-sm font-bold pr-1">Search</span>
                            </button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-112.5 p-0 rounded-4xl mt-3 border-none shadow-2xl overflow-hidden" sideOffset={12}>
                        <GuestsPanel
                            guests={guests}
                            onGuestsChange={setGuests}
                            isTravelingWithPets={isTravelingWithPets}
                            onTravelingWithPetsChange={setIsTravelingWithPets}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
