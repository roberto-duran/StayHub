import { Star, ChevronDown, Gem } from 'lucide-react';
import { calculateTotalPrice } from '@/services/propertyService';

interface BookingWidgetProps {
    pricePerNight: number;
    rating: number;
    reviewCount: number;
    cleaningFee: number;
    serviceFee: number;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
}

export function BookingWidget({
    pricePerNight,
    rating,
    reviewCount,
    cleaningFee,
    serviceFee,
    checkIn = '10/24/2023',
    checkOut = '10/29/2023',
    guests = 2,
}: BookingWidgetProps) {
    const nights = 5;
    const { subtotal, total } = calculateTotalPrice(pricePerNight, nights, cleaningFee, serviceFee);

    return (
        <div className="sticky top-28 w-full">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                {/* Price and Rating */}
                <div className="mb-6 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">${pricePerNight}</span>
                        <span className="text-sm text-gray-500">/ night</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                        <Star className="h-4 w-4 fill-stay-primary text-stay-primary" />
                        <span className="text-gray-900">{rating}</span>
                        <span className="cursor-pointer underline decoration-gray-400 hover:text-stay-primary">
                            · {reviewCount} reviews
                        </span>
                    </div>
                </div>

                {/* Date and Guest Selector */}
                <div className="mb-4 overflow-hidden rounded-xl border border-gray-400">
                    <div className="flex border-b border-gray-400">
                        <div className="relative flex-1 cursor-pointer border-r border-gray-400 p-3 transition-colors hover:bg-gray-50">
                            <label className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                Check-in
                            </label>
                            <div className="text-sm text-gray-900">{checkIn}</div>
                        </div>
                        <div className="relative flex-1 cursor-pointer p-3 transition-colors hover:bg-gray-50">
                            <label className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                Checkout
                            </label>
                            <div className="text-sm text-gray-900">{checkOut}</div>
                        </div>
                    </div>
                    <div className="relative flex cursor-pointer items-center justify-between p-3 transition-colors hover:bg-gray-50">
                        <div>
                            <label className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                Guests
                            </label>
                            <div className="text-sm text-gray-900">{guests} guests</div>
                        </div>
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                </div>

                {/* Reserve Button */}
                <button
                    type="button"
                    className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-stay-primary py-3.5 font-bold text-white shadow-lg shadow-stay-primary/30 transition-all hover:bg-stay-primary/90 active:scale-95"
                >
                    Reserve
                </button>
                <p className="mb-6 text-center text-sm text-gray-500">You won't be charged yet</p>

                {/* Price Breakdown */}
                <div className="flex flex-col gap-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span className="cursor-help underline decoration-gray-300 decoration-dotted">
                            ${pricePerNight} x {nights} nights
                        </span>
                        <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="cursor-help underline decoration-gray-300 decoration-dotted">Cleaning fee</span>
                        <span>${cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="cursor-help underline decoration-gray-300 decoration-dotted">Service fee</span>
                        <span>${serviceFee}</span>
                    </div>
                </div>

                <div className="my-4 border-t border-gray-200"></div>

                <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>

            {/* Rare Find Badge */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <Gem className="mt-0.5 h-5 w-5 text-gray-400" />
                <div className="text-xs text-gray-500">
                    <span className="font-bold text-gray-900">Rare find.</span> This place is usually booked.
                </div>
            </div>
        </div>
    );
}
