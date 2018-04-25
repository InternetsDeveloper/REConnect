<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMarketTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $config = config('markets.table_names');

        Schema::create($config['markets'], function(Blueprint $table)
        {
            $table->increments('id')->unsigned();
            $table->string('system_name', 100);
            $table->string('display_name', 100);
            $table->text('description')->nullable();

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->index(['system_name', 'deleted_at']);
        });

        Schema::create($config['marketables'], function (Blueprint $table) use ($config)
        {
            $table->increments('id')->unsigned();
            $table->integer('market_id');

            $table->morphs('marketable');

            $table->unsignedInteger('created_by')->default(1);
            $table->unsignedInteger('updated_by')->default(1);
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $config = config('markets.table_names');

        Schema::drop($config['markets']);
        Schema::drop($config['marketables']);

    }
}
