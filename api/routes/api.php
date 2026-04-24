<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\ClasseController;
use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\TrainerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\WalkinController;
use App\Http\Controllers\Api\AuthController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResources([
        'packages' => PackageController::class,
        'classes' => ClasseController::class,
        'branchs' => BranchController::class,
        'trainer' => TrainerController::class,
        'categories' => CategoryController::class,
        'products' => ProductController::class,
        'walkins' => WalkinController::class,
    ]);
});

