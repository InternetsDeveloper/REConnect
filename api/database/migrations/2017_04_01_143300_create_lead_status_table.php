<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeadStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('lead-status.table_names');

        Schema::create($config['lead-status'], function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('system_name')->unique();
            $table->string('display_name')->unique();
            $table->text('description')->nullable();

//            $table->integer('user_id')->unsigned();

//            $table->foreign('user_id')
//                ->references('id')
//                ->on($config['users'])
//                ->onDelete('cascade');

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->index(['system_name', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $config = config('lead-status.table_names');

        Schema::drop($config['lead-status']);
    }
}
