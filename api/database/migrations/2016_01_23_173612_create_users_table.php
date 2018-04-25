<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Database\WCBlueprint;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('users.table_names');

        Schema::create($config['users'], function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->integer('age');
            $table->enum('gender', ['male', 'female', 'not_indicated']);
            $table->boolean('email_subscribed')->default(true);

            $table->date('insurance_expiration')->nullable();
            $table->date('license_expiration')->nullable();
            $table->date('start_date')->nullable();

            $table->text('photo_url')->nullable();

            $table->string('password', 60);
            $table->rememberToken();
            $table->tinyInteger('uses_two_factor_auth')->default(0);
            $table->string('two_factor_reset_code', 100)->nullable();

            $table->integer('compensation_plan_id')->unsigned()->nullable();
            $table->integer('area_of_speciality_id')->unsigned()->nullable();
            $table->integer('source_id')->unsigned()->nullable();
            $table->integer('company_id')->unsigned()->nullable();
            $table->integer('current_team_id')->nullable();
            $table->integer('lead_id')->nullable();
            $table->integer('lead_status_id')->nullable();
            $table->integer('prospect_status_id')->nullable();
            $table->integer('rep_id')->nullable();

            $table->date('assigned_lead_date')->nullable();
            $table->date('assigned_rep_date')->nullable();

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->index(['email', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
