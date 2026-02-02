import { GuestCounter } from '@/components/ui/guest-counter';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface GuestsPanelProps {
    guests: {
        adults: number;
        children: number;
        infants: number;
        pets: number;
    };
    onGuestsChange: (guests: any) => void;
    isTravelingWithPets: boolean;
    onTravelingWithPetsChange: (value: boolean) => void;
}

export function GuestsPanel({
    guests,
    onGuestsChange,
    isTravelingWithPets,
    onTravelingWithPetsChange,
}: GuestsPanelProps) {
    const handleUpdateChange = (key: string, value: number) => {
        onGuestsChange({
            ...guests,
            [key]: value,
        });
    };

    return (
        <div className="p-4 w-full md:w-112.5">
            <div className="divide-y divide-gray-100 mb-6">
                <GuestCounter
                    label="Adults"
                    description="Ages 13 or above"
                    value={guests.adults}
                    onChange={(val) => handleUpdateChange('adults', val)}
                    min={1}
                />
                <GuestCounter
                    label="Children"
                    description="Ages 2 – 12"
                    value={guests.children}
                    onChange={(val) => handleUpdateChange('children', val)}
                />
                <GuestCounter
                    label="Infants"
                    description="Under 2"
                    value={guests.infants}
                    onChange={(val) => handleUpdateChange('infants', val)}
                />
            </div>

            {/* Traveling with pets section from user image */}
            <div className="pt-6 border-t border-gray-100 px-2 pb-2">
                <div className="flex items-start gap-4 cursor-pointer" onClick={() => onTravelingWithPetsChange(!isTravelingWithPets)}>
                    <div className="pt-1">
                        <Checkbox
                            id="traveling-pets"
                            checked={isTravelingWithPets}
                            onCheckedChange={() => {}} // Controlled by outer div click for better UX
                            className="h-6 w-6 rounded-md border-stay-text-secondary"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label
                            htmlFor="traveling-pets"
                            className="text-lg font-medium tracking-tight text-[#2d3748] cursor-pointer"
                        >
                            I am traveling with pets
                        </Label>
                        <p className="text-sm text-stay-text-secondary font-normal">
                            If checked, only properties that allow pets will be shown
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
