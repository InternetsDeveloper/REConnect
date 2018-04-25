<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSearchUserFiltersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('search-user-filters.table_names');

        //Main Table
        Schema::create($config['search_user_filters'], function(Blueprint $table) {

            $table->increments('id')->unsigned();
            $table->string('name', 100)->unique();
            $table->integer('user_id')->unsigned()->nullable();


            $table->boolean('gender_male')->nullable();
            $table->boolean('gender_female')->nullable();
            $table->boolean('gender_not_indicated')->nullable();
            $table->integer('min_age')->unsigned()->nullable();
            $table->integer('max_age')->unsigned()->nullable();

            $table->date('min_insurance_expiration_date')->nullable();
            $table->date('max_insurance_expiration_date')->nullable();
            $table->date('min_license_expiration_date')->nullable();
            $table->date('max_license_expiration_date')->nullable();


            $table->date('min_start_date')->nullable();
            $table->date('max_start_date')->nullable();


            $table->boolean('email_subscribed')->nullable();

            $table->boolean('campaign_status_has_been_on')->nullable();
            $table->boolean('campaign_status_is_on')->nullable();
            $table->boolean('campaign_status_has_not_been_on')->nullable();


            $table->date('min_close_date')->nullable();
            $table->date('max_close_date')->nullable();

            $table->date('min_assigned_date')->nullable();
            $table->date('max_assigned_date')->nullable();

            $table->boolean('is_lead')->nullable();

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();
        });

        //User (Assigned To) Table
        Schema::create('search_user_filter_assigned_to_users', function(Blueprint $table)
        {
            $table->integer('search_user_filter_id')->unsigned();
            $table->foreign('search_user_filter_id','sufatu_suf_id_foreign')->references('id')
                ->on('search_user_filters')->onDelete('cascade');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id','sufatu_user_id_foreign')->references('id')
                ->on('users')->onDelete('cascade');

            $table->timestamps();
        });

        //User (Business Dev Rep) Table
        Schema::create('search_user_filter_rep_users', function(Blueprint $table)
        {
            $table->integer('search_user_filter_id')->unsigned();
            $table->foreign('search_user_filter_id','sufru_suf_id_foreign')->references('id')
                ->on('search_user_filters')->onDelete('cascade');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id','sufru_user_id_foreign')->references('id')
                ->on('users')->onDelete('cascade');

            $table->timestamps();
        });

        //User (Created By Users ) Table
        Schema::create('search_user_filter_created_by_users', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('search_user_filter_id')->unsigned();
            $table->foreign('search_user_filter_id','sufcbu_suf_id_foreign')->references('id')
                ->on('search_user_filters')->onDelete('cascade');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id','sufcbu_user_id_foreign')->references('id')
                ->on('users')->onDelete('cascade');

            $table->timestamps();
        });

        //Polymorphic Rel Table
        Schema::create($config['search_user_filterables'], function (Blueprint $table) use ($config)
        {
            $table->increments('id')->unsigned();
            $table->integer('search_user_filter_id');

            $table->morphs('search_user_filterable','search_user_filterable_index');

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
        $config = config('search-user-filters.table_names');

        Schema::disableForeignKeyConstraints();

        Schema::drop('search_user_filter_created_by_users');
        Schema::drop('search_user_filter_assigned_to_users');
        Schema::drop('search_user_filter_rep_users');
        Schema::drop($config['search_user_filters']);
        Schema::drop($config['search_user_filterables']);
    }
}
