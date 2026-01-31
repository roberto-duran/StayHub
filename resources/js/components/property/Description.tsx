import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface DescriptionProps {
    description: string;
}

export function Description({ description }: DescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const paragraphs = description.split('\n\n');
    const shouldTruncate = description.length > 300;

    return (
        <div className="border-b border-gray-200 py-8">
            <h2 className="mb-4 text-xl font-bold">About this space</h2>
            <div className="prose prose-gray max-w-none text-gray-600">
                {isExpanded || !shouldTruncate ? (
                    paragraphs.map((paragraph, index) => (
                        <p key={index} className="mb-4">
                            {paragraph}
                        </p>
                    ))
                ) : (
                    <p className="mb-4">{paragraphs[0]}</p>
                )}
                {shouldTruncate && (
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1 font-bold text-gray-900 underline transition-colors hover:text-stay-primary"
                    >
                        {isExpanded ? 'Show less' : 'Show more'}
                        <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                )}
            </div>
        </div>
    );
}
