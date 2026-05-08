<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SystemSetting;

class SystemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SystemSetting::create([
            'open_time' => '08:00:00',
            'close_time' => '22:00:00',
            'timezone' => 'Asia/Phnom_Penh',
        ]);
    }
}
