import { Star, BadgeCheck, Share2, Heart } from 'lucide-react';

interface PropertyHeaderProps {
    title: string;
    rating: number;
    reviewCount: number;
    location: string;
    isSuperhost?: boolean;
}

export function PropertyHeader({ title, rating, reviewCount, location, isSuperhost = false }: PropertyHeaderProps) {
    return (
        <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1 font-medium text-gray-900">
                        <Star className="h-4 w-4 fill-stay-primary text-stay-primary" />
                        {rating}
                        <span className="mx-1 cursor-pointer font-normal text-gray-500 underline hover:text-stay-primary">
                            · {reviewCount} reviews
                        </span>
                    </div>
                    <span className="hidden sm:inline">·</span>
                    {isSuperhost && (
                        <>
                            <span className="flex items-center gap-1 font-medium text-stay-primary">
                                <BadgeCheck className="h-4 w-4" />
                                Superhost
                            </span>
                            <span className="hidden sm:inline">·</span>
                        </>
                    )}
                    <span className="cursor-pointer underline hover:text-stay-primary">{location}</span>
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium underline decoration-transparent transition-colors hover:bg-gray-100 hover:decoration-current"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium underline decoration-transparent transition-colors hover:bg-gray-100 hover:decoration-current"
                    >
                        <Heart className="h-4 w-4" />
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
