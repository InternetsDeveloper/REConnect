<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBrokeragesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('brokerages.table_names');

        Schema::create($config['brokerages'], function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('system_name', 100);
            $table->string('display_name', 100);
            $table->string('description', 100);

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->index(['system_name', 'deleted_at']);
        });

        Schema::create($config['brokerageables'], function(Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('brokerage_id');
            $table->morphs('brokerageable');

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
        $config = config('brokerages.table_names');

        Schema::drop($config['brokerageables']);
        Schema::drop($config['brokerages']);
    }
}

