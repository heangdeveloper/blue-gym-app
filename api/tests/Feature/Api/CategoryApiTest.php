<?php

use App\Models\Categorie;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

// ========================= Index =========================
test('authenticated user can list categorys', function () {
    Categorie::factory()->count(3)->create();

    $response = $this->actingAs($this->user, 'sanctum')->getJson('/api/categories');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => ["id", "name", "status", "created_at", "updated_at"],
            ],
            'links',
            'meta',
        ]);
});

test('Category list is paginated', function () {
    Categorie::factory()->count(15)->create();

    $response = $this->actingAs($this->user, 'sanctum')
        ->getJson('/api/categories');

    $response->assertStatus(200)
        ->assertJsonCount(10, 'data');
});

test('unauthenticated user cannot list categorys', function () {
    $response = $this->getJson('/api/categories');

    $response->assertStatus(401);
});

// ========================= Store =========================
test('authenticated user can create a category', function () {
    $response = $this->actingAs($this->user, 'sanctum')
        ->postJson('/api/categories', [
            'name' => 'API Created Categorie',
            'status' => 'active',
        ]);

    $response->assertStatus(201)
        ->assertJson([
            'data' => [
                'name' => 'API Created Categorie',
                'status' => 'active',
            ],
        ]);
});

test('store validates required fields via api', function () {
    $response = $this->actingAs($this->user, 'sanctum')
        ->postJson('/api/categories',[]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'status']);
});

// ========================= Show =========================
test('authenticated user can view a single categorie', function () {
    $categorie = Categorie::factory()->create();

    $response = $this->actingAs($this->user, 'sanctum')
        ->getJson("/api/categories/{$categorie->id}");

    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $categorie->id,
                'name' => $categorie->name,
                'status' => $categorie->status,
            ],
        ]);
});

test('show returns 404 for non-existent categorie', function () {
    $response = $this->actingAs($this->user, 'sanctum')
        ->getJson('/api/categories/9999');

    $response->assertStatus(404);
});

test('unauthenticated user cannot view a post', function () {
    $categorie = Categorie::factory()->create();

    $response = $this->getJson("/api/categories/{$categorie->id}");

    $response->assertStatus(401);
});

// ========================= Update =========================
test('unauthenticated user cannot update a post', function () {
    $categorie = Categorie::factory()->create();

    $response = $this->putJson("/api/categories/{$categorie->id}", [
        'name' => 'API Updated Categorie',
        'status' => 'active',
    ]);

    $response->assertStatus(401);
});

// ========================= Destroy =========================
test('unauthenticated user cannot delete a categorie', function () {
    $categorie = Categorie::factory()->create();

    $response = $this->deleteJson("/api/categories/{$categorie->id}");

    $response->assertStatus(401);
});



























