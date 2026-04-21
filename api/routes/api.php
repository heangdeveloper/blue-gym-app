<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\ClasseController;
use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\TrainerController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResources([
    'packages' => PackageController::class,
    'classes' => ClasseController::class,
    'branchs' => BranchController::class,
    'trainer' => TrainerController::class,
]);
