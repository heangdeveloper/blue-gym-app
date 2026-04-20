<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('branchs')->insert([
            [
                'id' => 1,
                'name' => 'Blue Gym Fitness Club',
                'location' => "Street 2004",
                'phone' => "097 82 12 437",
                'status' => 'active',
            ],
        ]);
    }
}
