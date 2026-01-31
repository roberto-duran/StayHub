import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import {
    FilterPills,
    InactiveFilterPill,
    LocationSearch,
    MapControls,
    PropertyDetailPanel,
    MapView,
} from '@/components/search';
import { Header } from '@/components/home';
import { mapProperties, filterProperties, defaultFilters } from '@/services/searchService';
import type { MapProperty, SearchFilters } from '@/types/search';

interface SearchProps {
    // Future: add mapboxToken for real map integration
}

export default function Search(_props: SearchProps) {
    const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
    const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(null);
    const [favorites, setFavorites] = useState<Set<number>>(new Set());
    const [zoom, setZoom] = useState(11);

    const filteredProperties = useMemo(() => filterProperties(mapProperties, filters), [filters]);

    const activeFilterPills = useMemo(() => {
        const pills = [];

        if (filters.propertyTypes.length > 0) {
            pills.push({
                id: 'type',
                label: 'Type',
                value: filters.propertyTypes.join(', '),
                isActive: true,
            });
        }

        if (filters.minPrice > 0 || filters.maxPrice < 1000) {
            pills.push({
                id: 'price',
                label: 'Price',
                value: `€${filters.minPrice}-${filters.maxPrice}`,
                isActive: true,
            });
        }

        if (filters.minArea !== null || filters.maxArea !== null) {
            const areaValue =
                filters.minArea !== null && filters.maxArea !== null
                    ? `${filters.minArea}-${filters.maxArea} m²`
                    : filters.minArea !== null
                      ? `${filters.minArea}+ m²`
                      : `Up to ${filters.maxArea} m²`;
            pills.push({
                id: 'area',
                label: 'Area',
                value: areaValue,
                isActive: true,
            });
        }

        if (filters.minFloor !== null || filters.maxFloor !== null) {
            const floorValue =
                filters.minFloor !== null && filters.maxFloor !== null
                    ? `${filters.minFloor}-${filters.maxFloor}`
                    : filters.minFloor !== null
                      ? `${filters.minFloor}+`
                      : `Up to ${filters.maxFloor}`;
            pills.push({
                id: 'floor',
                label: 'Floor',
                value: floorValue,
                isActive: true,
            });
        }

        return pills;
    }, [filters]);

    const handleRemoveFilter = (filterId: string) => {
        setFilters((prev) => {
            const updated = { ...prev };
            switch (filterId) {
                case 'type':
                    updated.propertyTypes = [];
                    break;
                case 'price':
                    updated.minPrice = 0;
                    updated.maxPrice = 1000;
                    break;
                case 'area':
                    updated.minArea = null;
                    updated.maxArea = null;
                    break;
                case 'floor':
                    updated.minFloor = null;
                    updated.maxFloor = null;
                    break;
            }
            return updated;
        });
    };

    const handleClearAllFilters = () => {
        setFilters(defaultFilters);
    };

    const handleToggleFavorite = (propertyId: number) => {
        setFavorites((prev) => {
            const updated = new Set(prev);
            if (updated.has(propertyId)) {
                updated.delete(propertyId);
            } else {
                updated.add(propertyId);
            }
            return updated;
        });
    };

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 20));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 1));

    const handleAddTypeFilter = () => {
        setFilters((prev) => ({
            ...prev,
            propertyTypes: ['apartment'],
        }));
    };

    const handleAddPriceFilter = () => {
        setFilters((prev) => ({
            ...prev,
            minPrice: 150,
            maxPrice: 530,
        }));
    };

    const handleAddAreaFilter = () => {
        setFilters((prev) => ({
            ...prev,
            minArea: 50,
            maxArea: 150,
        }));
    };

    const handleAddFloorFilter = () => {
        setFilters((prev) => ({
            ...prev,
            minFloor: 3,
            maxFloor: 20,
        }));
    };

    return (
        <>
            <Head title="Search Properties - StayHub" />

            <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
                {/* Header */}
                <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
                    <Header />
                </header>

                {/* Main Content */}
                <main className="relative flex-1 overflow-hidden">
                    {/* Map Background */}
                    <div className="absolute inset-0">
                        <MapView
                            properties={filteredProperties}
                            selectedProperty={selectedProperty}
                            onPropertySelect={setSelectedProperty}
                        />
                    </div>

                    {/* Filters Overlay (Top Left) */}
                    <div className="absolute top-6 left-6 z-10 flex max-w-xl flex-col gap-4">
                        {/* Location Search */}
                        <div className="w-64">
                            <LocationSearch
                                value={filters.location}
                                onChange={(location) => setFilters((prev) => ({ ...prev, location }))}
                            />
                        </div>

                        {/* Active Filter Pills */}
                        <FilterPills
                            filters={activeFilterPills}
                            onRemove={handleRemoveFilter}
                            onClearAll={handleClearAllFilters}
                        />

                        {/* Inactive Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {!filters.propertyTypes.length && (
                                <InactiveFilterPill label="Type" onClick={handleAddTypeFilter} />
                            )}
                            {filters.minPrice === 0 && filters.maxPrice === 1000 && (
                                <InactiveFilterPill label="Price" onClick={handleAddPriceFilter} />
                            )}
                            {filters.minArea === null && filters.maxArea === null && (
                                <InactiveFilterPill label="Area" onClick={handleAddAreaFilter} />
                            )}
                            {filters.minFloor === null && filters.maxFloor === null && (
                                <InactiveFilterPill label="Floor" onClick={handleAddFloorFilter} />
                            )}
                        </div>
                    </div>

                    {/* Map Controls (Bottom Left) */}
                    <div className="absolute bottom-6 left-6 z-10">
                        <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onEdit={() => {}} />
                    </div>

                    {/* Property Detail Panel (Right Side) */}
                    {selectedProperty && (
                        <div className="absolute top-6 right-6 bottom-6 z-10 w-full max-w-md lg:max-w-lg">
                            <PropertyDetailPanel
                                property={selectedProperty}
                                onClose={() => setSelectedProperty(null)}
                                onFavorite={() => handleToggleFavorite(selectedProperty.id)}
                                isFavorite={favorites.has(selectedProperty.id)}
                            />
                        </div>
                    )}

                    {/* Property Count Badge */}
                    <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 transform">
                        <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-lg">
                            {filteredProperties.length} properties found
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
