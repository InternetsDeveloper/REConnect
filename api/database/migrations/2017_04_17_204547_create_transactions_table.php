<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('transactions.table_names');

        Schema::create($config['transactions'], function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('name', 100);
            $table->enum('status',['open','closed']);

            $table->integer('user_id')->unsigned();

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->index(['user_id', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $config = config('transactions.table_names');

        Schema::drop($config['transactions']);
    }
}
