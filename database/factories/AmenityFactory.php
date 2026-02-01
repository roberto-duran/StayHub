<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Amenity>
 */
class AmenityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
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

        return fake()->randomElement($amenities);
    }
}
