import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    initialIndex?: number;
}

export function LightboxModal({ images, isOpen, onClose, initialIndex = 0 }: LightboxModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    if (!isOpen) {
        return null;
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
        if (e.key === 'ArrowLeft') {
            goToPrevious();
        }
        if (e.key === 'ArrowRight') {
            goToNext();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
        >
            {/* Close Button */}
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close gallery"
            >
                <X className="h-6 w-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-medium text-white">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Previous Button */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                }}
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Previous image"
            >
                <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Main Image */}
            <div className="flex h-full max-h-[80vh] w-full max-w-5xl items-center justify-center px-16" onClick={(e) => e.stopPropagation()}>
                <img
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Next Button */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                }}
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Next image"
            >
                <ChevronRight className="h-8 w-8" />
            </button>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(index);
                        }}
                        className={`h-16 w-16 overflow-hidden rounded-lg transition-all ${
                            index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-75'
                        }`}
                    >
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
