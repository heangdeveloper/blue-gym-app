<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categorie;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categorie::create([
            'name' => 'Drink',
        ]);
        Categorie::create([
            'name' => 'Supplement',
        ]);
        Categorie::create([
            'name' => 'Food',
        ]);
        Categorie::create([
            'name' => 'Equipment',
        ]);
    }
}
