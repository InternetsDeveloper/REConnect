<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoleGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('role-groups.table_names');

        Schema::create($config['rolegroups'], function(Blueprint $table) {
            $table->increments('id');
            $table->string('system_name');
            $table->string('display_name');
            $table->string('description')->nullable();

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->index(['system_name', 'deleted_at']);
        });

        Schema::create($config['rolegroupables'], function(Blueprint $table) {
            $table->increments('id');
            $table->integer('role_group_id')->unsigned();

            $table->morphs('rolegroupable');

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
        $config = config('role-groups.table_names');

        Schema::drop($config['rolegroups']);
        Schema::drop($config['rolegroupables']);
    }
}
