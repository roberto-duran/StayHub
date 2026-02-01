<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = [
            ['name' => 'Wifi', 'icon' => 'Wifi', 'category' => 'essentials'],
            ['name' => 'Kitchen', 'icon' => 'ChefHat', 'category' => 'essentials'],
            ['name' => 'Free parking', 'icon' => 'Car', 'category' => 'essentials'],
            ['name' => 'Pool', 'icon' => 'Waves', 'category' => 'features'],
            ['name' => 'Hot tub', 'icon' => 'Droplets', 'category' => 'features'],
            ['name' => 'Air conditioning', 'icon' => 'Snowflake', 'category' => 'features'],
            ['name' => 'Gym', 'icon' => 'Dumbbell', 'category' => 'features'],
            ['name' => 'EV charger', 'icon' => 'BatteryCharging', 'category' => 'features'],
            ['name' => 'Washer', 'icon' => 'Shirt', 'category' => 'features'],
            ['name' => 'Dryer', 'icon' => 'Shirt', 'category' => 'features'],
            ['name' => 'Smoke alarm', 'icon' => 'Bell', 'category' => 'safety'],
            ['name' => 'First aid kit', 'icon' => 'Briefcase', 'category' => 'safety'],
        ];

        foreach ($amenities as $amenity) {
            Amenity::create($amenity);
        }
    }
}
