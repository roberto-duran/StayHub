interface MobileBookingBarProps {
    pricePerNight: number;
    dates?: string;
}

export function MobileBookingBar({ pricePerNight, dates = 'Jan 12 – 17' }: MobileBookingBarProps) {
    return (
        <div className="fixed right-0 bottom-0 left-0 z-20 border-t border-gray-200 bg-white p-4 pb-6 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] lg:hidden">
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">€{pricePerNight}</span>
                        <span className="text-sm text-gray-500">/ night</span>
                    </div>
                    <span className="cursor-pointer text-xs font-semibold text-stay-primary underline">{dates}</span>
                </div>
                <button
                    type="button"
                    className="max-w-50 flex-1 rounded-xl bg-stay-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-stay-primary/30 transition-all hover:bg-stay-primary/90 active:scale-95"
                >
                    Reserve
                </button>
            </div>
        </div>
    );
}
