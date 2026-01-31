import { Star } from 'lucide-react';
import type { Review } from '@/types/property';

interface ReviewsProps {
    reviews: Review[];
    rating: number;
    totalCount: number;
}

export function Reviews({ reviews, rating, totalCount }: ReviewsProps) {
    const displayReviews = reviews.slice(0, 2);

    return (
        <div className="pt-8">
            <div className="mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 fill-stay-primary text-stay-primary" />
                <h2 className="text-2xl font-bold">
                    {rating} · {totalCount} reviews
                </h2>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {displayReviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>

            {totalCount > 2 && (
                <button
                    type="button"
                    className="rounded-xl border border-gray-900 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                    Show all {totalCount} reviews
                </button>
            )}
        </div>
    );
}

interface ReviewItemProps {
    review: Review;
}

function ReviewItem({ review }: ReviewItemProps) {
    return (
        <div>
            <div className="mb-3 flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <img src={review.avatar} alt={review.author} className="h-full w-full object-cover" />
                </div>
                <div>
                    <h4 className="text-sm font-bold">{review.author}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">{review.comment}</p>
        </div>
    );
}
