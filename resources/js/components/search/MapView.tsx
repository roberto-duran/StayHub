import type { MapProperty } from '@/types/search';
import { PriceMarker, ClusterMarker } from './MapMarkers';

interface MapViewProps {
    properties: MapProperty[];
    selectedProperty: MapProperty | null;
    onPropertySelect: (property: MapProperty) => void;
}

export function MapView({ properties, selectedProperty, onPropertySelect }: MapViewProps) {
    return (
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            {/* Decorative Map Lines */}
            <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                {/* Roads */}
                <path d="M0,150 Q200,100 400,200 T800,150" stroke="#059669" strokeWidth="3" fill="none" />
                <path d="M0,300 Q150,350 300,300 T600,350 T800,300" stroke="#059669" strokeWidth="2" fill="none" />
                <path d="M0,450 Q250,400 500,450 T800,400" stroke="#059669" strokeWidth="2" fill="none" />
                <path d="M100,0 Q150,200 100,400 T150,600" stroke="#059669" strokeWidth="2" fill="none" />
                <path d="M300,0 Q350,150 300,300 T350,600" stroke="#059669" strokeWidth="2" fill="none" />
                <path d="M500,0 Q450,200 500,400 T450,600" stroke="#059669" strokeWidth="2" fill="none" />
                <path d="M700,0 Q750,150 700,300 T750,600" stroke="#059669" strokeWidth="2" fill="none" />

                {/* Parks/Areas */}
                <ellipse cx="200" cy="250" rx="60" ry="40" fill="#059669" fillOpacity="0.1" />
                <ellipse cx="600" cy="350" rx="80" ry="50" fill="#059669" fillOpacity="0.1" />
                <ellipse cx="400" cy="150" rx="50" ry="35" fill="#059669" fillOpacity="0.1" />
            </svg>

            {/* Property Markers positioned pseudo-randomly */}
            <div className="absolute inset-0">
                {properties.map((property, index) => {
                    const positions = [
                        { top: '15%', left: '20%' },
                        { top: '25%', left: '45%' },
                        { top: '20%', left: '70%' },
                        { top: '45%', left: '15%' },
                        { top: '50%', left: '55%' },
                        { top: '40%', left: '80%' },
                        { top: '70%', left: '30%' },
                        { top: '65%', left: '65%' },
                    ];
                    const pos = positions[index % positions.length];

                    return (
                        <div
                            key={property.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2 transform"
                            style={{ top: pos.top, left: pos.left }}
                        >
                            <PriceMarker
                                price={property.pricePerNight}
                                isSelected={selectedProperty?.id === property.id}
                                onClick={() => onPropertySelect(property)}
                            />
                        </div>
                    );
                })}

                {/* Cluster example */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 transform" style={{ top: '35%', left: '35%' }}>
                    <ClusterMarker count={2} />
                </div>
            </div>

            {/* Map attribution placeholder */}
            <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs text-gray-500">
                Interactive map • Powered by StayHub
            </div>
        </div>
    );
}
