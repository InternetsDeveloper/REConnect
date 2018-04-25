<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDepartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('departments.table_names');

        Schema::create($config['departments'], function (Blueprint $table) use ($config) {
            $table->increments('id')->unsigned();
            $table->string('system_name', 100)->unique();
            $table->string('display_name', 100)->unique();
            $table->text('description')->nullable();

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->index(['system_name', 'deleted_at']);
        });

        Schema::create($config['departmentables'], function (Blueprint $table) use ($config)
        {
            $table->increments('id')->unsigned();
            $table->integer('department_id');

            $table->morphs('departmentable');

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
        $config = config('departments.table_names');

        Schema::Drop($config['departments']);
        Schema::Drop($config['departmentables']);
    }
}
