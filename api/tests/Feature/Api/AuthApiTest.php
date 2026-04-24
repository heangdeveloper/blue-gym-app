<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

pest()->use(RefreshDatabase::class);

test('a user can login via the api', function () {
    $user = User::factory()->create([
        "password" => bcrypt("password"),
    ]);

    $response = $this->postJson("/api/login", [
        "username" => $user->username,
        "password" => "password"
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'message',
            'user' => ['id', 'name', 'username'],
            'token',
        ]);
});

test('login fails with incorrect credentials', function () {
    $user = User::factory()->create([
        'password' => bcrypt('password'),
    ]);

    $response = $this->postJson('/api/login', [
        'username' => $user->username,
        'password' => 'wrong-password',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['username']);
});

test('login validates required fields', function () {
    $response = $this->postJson('/api/login', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['username', 'password']);
});

test('a user can logout via the api', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token');

    $response = $this->withToken($token->plainTextToken)
        ->postJson('/api/logout');

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Logged out successfully.',
        ]);
});

test('logout requires authentication', function () {
    $response = $this->postJson('/api/logout');

    $response->assertStatus(401);
});
