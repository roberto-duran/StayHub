import * as React from 'react';
import { addDays, format, isSameMonth, startOfMonth, addMonths } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePanelProps {
    range: DateRange | undefined;
    onRangeChange: (range: DateRange | undefined) => void;
    onDone: () => void;
    onClear: () => void;
}

export function DateRangePanel({ range, onRangeChange, onDone, onClear }: DateRangePanelProps) {
    const [tab, setTab] = React.useState<'calendar' | 'flexible'>('calendar');
    const [flexibility, setFlexibility] = React.useState('exact');
    const [duration, setDuration] = React.useState('1 night');
    const [selectedMonths, setSelectedMonths] = React.useState<Date[]>([]);

    const flexibilityOptions = [
        { label: 'Exact dates', value: 'exact' },
        { label: '± 1 day', value: '1' },
        { label: '± 2 days', value: '2' },
        { label: '± 3 days', value: '3' },
        { label: '± 7 days', value: '7' },
    ];

    const durationOptions = [
        '1 night', '2-3 nights', '4-5 nights', '1 week', '2 weeks', '1 month'
    ];

    const monthsToSelect = React.useMemo(() => {
        const months = [];
        let current = startOfMonth(new Date());
        for (let i = 0; i < 12; i++) {
            months.push(current);
            current = addMonths(current, 1);
        }
        return months;
    }, []);

    const toggleMonth = (month: Date) => {
        setSelectedMonths(prev => 
            prev.some(m => isSameMonth(m, month))
                ? prev.filter(m => !isSameMonth(m, month))
                : [...prev, month]
        );
    };

    return (
        <div className="w-full md:min-w-212.5 flex flex-col bg-white">
            {/* Top Tabs (Image 3) */}
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setTab('calendar')}
                    className={cn(
                        "flex-1 py-4 text-sm font-semibold transition-all border-b-2",
                        tab === 'calendar' ? "border-stay-primary text-stay-text-main" : "border-transparent text-stay-text-secondary hover:text-stay-text-main"
                    )}
                >
                    Calendar
                </button>
                <button
                    onClick={() => setTab('flexible')}
                    className={cn(
                        "flex-1 py-4 text-sm font-semibold transition-all border-b-2",
                        tab === 'flexible' ? "border-stay-primary text-stay-text-main" : "border-transparent text-stay-text-secondary hover:text-stay-text-main"
                    )}
                >
                    Flexible dates
                </button>
            </div>

            <div className="px-8 py-6">
                {tab === 'calendar' ? (
                    <div className="flex flex-col gap-6">
                        {/* Range Header (Image 3) */}
                        <div className="flex items-center gap-4 text-2xl font-bold text-stay-text-main mb-2">
                            <span className={cn(!range?.from && "text-gray-300")}>
                                {range?.from ? format(range.from, 'EEE, MMM d') : 'Add date'}
                            </span>
                            <ChevronRight className="h-6 w-6 text-gray-400" />
                            <span className={cn(
                                !range?.to && "underline underline-offset-8 decoration-stay-primary decoration-4",
                                !range?.to && range?.from ? "text-stay-text-main" : (!range?.to && "text-gray-300")
                            )}>
                                {range?.to ? format(range.to, 'EEE, MMM d') : (range?.from ? format(range.from, 'EEE, MMM d') : 'Add date')}
                            </span>
                        </div>

                        {/* Calendar */}
                        <div className="flex justify-center relative" onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={range?.from}
                                selected={range}
                                onSelect={(newRange) => {
                                    if (newRange) {
                                        onRangeChange(newRange);
                                    }
                                }}
                                numberOfMonths={2}
                                className="p-0 border-none pointer-events-auto"
                                classNames={{
                                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-12 sm:space-y-0 relative",
                                    month: "flex flex-col w-full gap-4 relative",
                                    nav: "flex items-center justify-between absolute w-full top-1 z-20 px-8 pointer-events-none",
                                    button_previous: "pointer-events-auto h-10 w-10 flex items-center justify-center border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors",
                                    button_next: "pointer-events-auto h-10 w-10 flex items-center justify-center border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors",
                                    head_cell: "text-gray-500 font-normal text-sm w-10 py-2",
                                    cell: "p-0",
                                    day: "h-10 w-10 p-0 font-normal text-sm hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors",
                                    day_today: "bg-transparent font-bold",
                                    day_selected: "bg-stay-primary text-white hover:bg-stay-primary hover:text-white rounded-full",
                                    day_range_middle: "bg-blue-50 text-stay-text-main rounded-none",
                                    day_range_start: "bg-stay-primary text-white rounded-l-full",
                                    day_range_end: "bg-stay-primary text-white rounded-r-full",
                                    day_outside: "text-gray-300 opacity-50",
                                }}
                            />
                        </div>

                        {/* Flexibility Options */}
                        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-gray-100">
                            {flexibilityOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setFlexibility(option.value)}
                                    className={cn(
                                        "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                                        flexibility === option.value
                                            ? "border-black bg-gray-50 text-black"
                                            : "border-gray-200 text-stay-text-secondary hover:border-black hover:text-black"
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 py-4">
                        {/* Flexible Tab (Image 4) */}
                        <div className="flex flex-col items-center gap-6">
                            <h3 className="text-xl font-bold text-[#1a202c]">How long do you want to stay?</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {durationOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setDuration(opt)}
                                        className={cn(
                                            "px-6 py-2 rounded-full border font-medium transition-all text-sm",
                                            duration === opt
                                                ? "border-stay-primary bg-blue-50 text-stay-primary ring-1 ring-stay-primary"
                                                : "border-gray-300 text-stay-text-main hover:border-stay-text-main"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Checkbox id="weekend" className="h-6 w-6 border-gray-300 data-[state=checked]:bg-stay-primary data-[state=checked]:border-stay-primary" />
                                <Label htmlFor="weekend" className="text-base font-medium text-stay-text-main">Must include weekend</Label>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6 pt-4 border-t border-gray-100">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-[#1a202c]">When do you want to travel?</h3>
                                <p className="text-sm text-stay-text-secondary mt-1">You can select more than one month.</p>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full">
                                {monthsToSelect.map((month) => {
                                    const isSelected = selectedMonths.some(m => isSameMonth(m, month));
                                    return (
                                        <button
                                            key={month.toISOString()}
                                            onClick={() => toggleMonth(month)}
                                            className={cn(
                                                "flex flex-col items-center justify-center p-4 rounded-xl border transition-all h-28 w-full",
                                                isSelected
                                                    ? "border-stay-primary bg-blue-50 ring-1 ring-stay-primary scale-[1.02]"
                                                    : "border-gray-200 hover:border-stay-text-main"
                                            )}
                                        >
                                            <CalendarIcon className={cn("h-6 w-6 mb-2", isSelected ? "text-stay-primary" : "text-gray-500")} />
                                            <span className="text-xs font-bold uppercase tracking-wider text-stay-text-main">
                                                {format(month, 'MMMM')}
                                            </span>
                                            <span className="text-[10px] text-stay-text-secondary font-medium mt-1">
                                                {format(month, 'yyyy')}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions (Image 3) */}
            <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between">
                <button
                    onClick={onClear}
                    className="text-sm font-bold text-stay-text-main underline hover:text-black"
                >
                    Clear
                </button>
                <Button
                    onClick={onDone}
                    className="bg-stay-primary hover:bg-opacity-90 text-white px-10 py-6 rounded-full text-base font-bold shadow-md"
                >
                    Done
                </Button>
            </div>
        </div>
    );
}
