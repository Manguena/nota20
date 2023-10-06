<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\Config;

class CreateConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('configs', function (Blueprint $table) {
            $table->id();
            $table->integer('superadmin')->default(2);
            $table->integer('admin')->default(2);
            $table->integer('standard')->default(5);
            $table->timestamps();
        });

       // Insert default data for user configuration in the database
        $config = new Config;

        $config->superadmin=2;
        $config->admin=2;
        $config->standard=5;
        $config->save();

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('configs');
    }
}
