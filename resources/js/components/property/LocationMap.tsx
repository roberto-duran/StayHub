interface LocationMapProps {
    latitude: number;
    longitude: number;
    location: string;
    description?: string;
}

export function LocationMap({ location, description = 'Quiet location, close to local attractions.' }: LocationMapProps) {
    return (
        <div className="py-8">
            <h2 className="mb-4 text-xl font-bold">Where you'll be</h2>
            <div className="relative mb-3 h-64 w-full overflow-hidden rounded-2xl shadow-sm">
                {/* Placeholder Map */}
                <div className="h-full w-full bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50">
                    <svg className="h-full w-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                        <path d="M0,100 Q100,50 200,100 T400,100" stroke="#059669" strokeWidth="2" fill="none" />
                        <path d="M0,150 Q100,200 200,150 T400,150" stroke="#059669" strokeWidth="2" fill="none" />
                        <path d="M0,200 Q100,150 200,200 T400,200" stroke="#059669" strokeWidth="2" fill="none" />
                        <ellipse cx="200" cy="150" rx="40" ry="25" fill="#059669" fillOpacity="0.1" />
                    </svg>
                </div>
                <div className="absolute inset-0 bg-black/5"></div>
                
                {/* Animated Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="relative">
                        <div className="absolute top-0 left-0 h-12 w-12 animate-ping rounded-full bg-stay-primary/30"></div>
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-stay-primary/20">
                            <div className="h-4 w-4 rounded-full border-2 border-white bg-stay-primary shadow-md"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-sm font-bold text-gray-900">{location}</h3>
                <p className="mt-1 max-w-md text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
}
