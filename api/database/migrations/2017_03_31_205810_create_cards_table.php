<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('cards.table_names');
        Schema::create($config['cards'], function (Blueprint $table){
            $table->increments('id');
            $table->integer('stripe_id');
            $table->string('card_brand');
            $table->string('card_last_four');
            $table->integer('address_id');

            $table->morphs('cardable');

            $table->tinyInteger('is_primary');
            $table->tinyInteger('is_visa');
            $table->tinyInteger('is_mastercard');
            $table->tinyInteger('is_discover');
            $table->tinyInteger('is_americanexpress');
            $table->tinyInteger('is_dinersclub');
            $table->tinyInteger('is_jbc');
            $table->string('vat_id');
            $table->string('extra_billing_information');

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $config = config('cards.table_names');
        Schema::drop($config['cards']);
    }
}
