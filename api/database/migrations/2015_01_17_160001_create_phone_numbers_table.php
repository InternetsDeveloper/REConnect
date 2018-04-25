<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhoneNumbersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('phone-numbers.table_names');

        Schema::Create($config['phonenumbers'], function (Blueprint $table){
            $table->increments('id');
            $table->bigInteger('phone_number');
            $table->tinyInteger('is_cell')->default(0);
            $table->tinyInteger('is_business')->default(0);
            $table->tinyInteger('is_home')->default(0);
            $table->tinyInteger('is_preferred')->default(0);

            $table->morphs('phonenumberable');

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
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
        $config = config('phone-numbers.table_names');
        Schema::drop($config['phonenumbers']);
//        Schema::drop('phonenumberable');
    }
}
