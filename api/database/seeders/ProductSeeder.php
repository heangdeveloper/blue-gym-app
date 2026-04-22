<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::insert([
            [
                'category_id' => 1,
                'name' => 'Water 500ml',
                'description' => 'Small drinking water bottle',
                'cost_price' => 0.20,
                'sell_price' => 0.50,
                'stock_qty' => 100,
                'image' => 'water.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 1,
                'name' => 'Water 1.5L',
                'description' => 'Large drinking water bottle',
                'cost_price' => 0.50,
                'sell_price' => 1.00,
                'stock_qty' => 80,
                'image' => 'water_large.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'name' => 'Banana',
                'description' => 'Energy fruit for gym',
                'cost_price' => 0.10,
                'sell_price' => 0.30,
                'stock_qty' => 200,
                'image' => 'banana.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'name' => 'Whey Protein Scoop',
                'description' => 'Protein supplement',
                'cost_price' => 1.50,
                'sell_price' => 3.00,
                'stock_qty' => 50,
                'image' => 'whey.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
