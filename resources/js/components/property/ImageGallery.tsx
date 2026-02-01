import { useState } from 'react';
import { LayoutGrid, Leaf } from 'lucide-react';
import { LightboxModal } from '@/components/property/LightboxModal';

interface ImageGalleryProps {
    images: string[];
    title: string;
    ecoCertified?: boolean;
}

export function ImageGallery({ images, title, ecoCertified = false }: ImageGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="relative mb-10 grid h-75 grid-cols-1 grid-rows-2 gap-3 overflow-hidden rounded-2xl md:h-120 md:grid-cols-4">
                {/* Main Image */}
                <div
                    className="relative col-span-1 row-span-2 cursor-pointer overflow-hidden md:col-span-2"
                    onClick={() => openLightbox(0)}
                >
                    <img
                        src={images[0]}
                        alt={`${title} - Main view`}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {ecoCertified && (
                        <div className="absolute top-4 left-4 flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-stay-primary shadow-sm backdrop-blur-sm">
                            <Leaf className="h-4 w-4" />
                            Eco-Certified
                        </div>
                    )}
                </div>

                {/* Secondary Images */}
                {images.slice(1, 5).map((image, index) => (
                    <div
                        key={index}
                        className="relative hidden cursor-pointer overflow-hidden md:block"
                        onClick={() => openLightbox(index + 1)}
                    >
                        <img
                            src={image}
                            alt={`${title} - View ${index + 2}`}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {index === 3 && (
                            <button
                                type="button"
                                className="absolute right-4 bottom-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-md transition-colors hover:bg-gray-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openLightbox(0);
                                }}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Show all photos
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <LightboxModal
                images={images}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                initialIndex={lightboxIndex}
            />
        </>
    );
}
