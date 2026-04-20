<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->string("name");
            $table->string("phone");
            $table->text("photo")->nullable();
            $table->enum("gender", ["m", "f"])->default("m");
            $table->date("joining_date");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.ne
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
