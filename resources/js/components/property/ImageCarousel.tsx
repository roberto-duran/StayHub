import { useState } from 'react';
import { ArrowLeft, Share2, Heart, Leaf } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ImageCarouselProps {
    images: string[];
    title: string;
    ecoCertified?: boolean;
}

export function ImageCarousel({ images, title, ecoCertified = false }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollLeft = container.scrollLeft;
        const width = container.clientWidth;
        const newIndex = Math.round(scrollLeft / width);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };

    return (
        <div className="relative aspect-4/3 w-full bg-gray-200">
            {/* Carousel */}
            <div
                className="hide-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
                onScroll={handleScroll}
            >
                {images.map((image, index) => (
                    <div key={index} className="relative h-full min-w-full snap-center">
                        <img src={image} alt={`${title} - Image ${index + 1}`} className="h-full w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent"></div>
                    </div>
                ))}
            </div>

            {/* Navigation Overlay */}
            <div className="absolute top-0 left-0 z-10 flex w-full items-center justify-between p-5">
                <Link
                    href="/"
                    className="rounded-full bg-white/90 p-2 text-gray-700 shadow-sm backdrop-blur-md transition-all hover:bg-white"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="flex gap-3">
                    <button
                        type="button"
                        className="rounded-full bg-white/90 p-2 text-gray-700 shadow-sm backdrop-blur-md transition-all hover:bg-white"
                    >
                        <Share2 className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        className="group/heart rounded-full bg-white/90 p-2 text-gray-700 shadow-sm backdrop-blur-md transition-all hover:bg-white"
                    >
                        <Heart className="h-5 w-5 transition-colors group-hover/heart:text-red-500" />
                    </button>
                </div>
            </div>

            {/* Eco Badge */}
            {ecoCertified && (
                <div className="absolute top-16 left-5 z-10 flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-stay-primary shadow-sm backdrop-blur-sm">
                    <Leaf className="h-4 w-4" />
                    Eco-Certified
                </div>
            )}

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform gap-2">
                {images.slice(0, 5).map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full shadow-sm ${
                            index === currentIndex ? 'bg-white' : 'bg-white/60 backdrop-blur-sm'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
