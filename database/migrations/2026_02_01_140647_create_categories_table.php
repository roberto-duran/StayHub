<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('icon');
            $table->timestamps();
        });

        DB::table('categories')->insert([
            ['name' => 'Treehouses', 'slug' => 'treehouses', 'icon' => 'TreePine', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cabins', 'slug' => 'cabins', 'icon' => 'House', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Beachfront', 'slug' => 'beachfront', 'icon' => 'Waves', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Off-grid', 'slug' => 'off-grid', 'icon' => 'Zap', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Vineyards', 'slug' => 'vineyards', 'icon' => 'Wine', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Tiny Homes', 'slug' => 'tiny-homes', 'icon' => 'Home', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Amazing pools', 'slug' => 'amazing-pools', 'icon' => 'Droplets', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Lakefront', 'slug' => 'lakefront', 'icon' => 'Sailboat', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'National parks', 'slug' => 'national-parks', 'icon' => 'Mountain', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
