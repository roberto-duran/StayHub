<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\Property;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 Hosts
        $hosts = User::factory(10)->create([
            'role' => 'owner',
            'is_superhost' => true,
            'response_time' => 'within an hour',
            'years_hosting' => 3,
            'is_verified' => true,
        ]);

        $amenities = Amenity::all();

        foreach ($hosts as $host) {
            // Create 5 properties per host
            $properties = Property::factory(5)->create([
                'host_id' => $host->id,
            ]);

            foreach ($properties as $property) {
                // Attach random amenities
                $property->amenities()->attach(
                    $amenities->random(rand(3, 8))->pluck('id')->toArray()
                );

                 // Create 3-10 reviews per property
                 Review::factory(rand(3, 10))->create([
                     'property_id' => $property->id,
                 ]);
            }
        }
    }
}
