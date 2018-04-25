<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCampaignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('campaigns.table_names');

        Schema::create($config['campaigns'], function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('name', 100);
            $table->text('description')->nullable();

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->index(['name', 'deleted_at']);
        });

        Schema::create($config['campaignables'], function(Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('campaign_id');
            $table->morphs('campaignable');

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
        $config = config('campaigns.table_names');

        Schema::drop($config['campaigns']);
        Schema::drop($config['campaignables']);
    }
}
