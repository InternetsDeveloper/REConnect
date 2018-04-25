<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('tasks.table_names');

        Schema::create($config['tasks'], function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('name', 100);
            $table->text('description');
            $table->timestamp('due_date');

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create($config['taskables'], function(Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('task_id');
            
            $table->morphs('taskable');

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
        $config = config('tasks.table_names');

        Schema::drop($config['tasks']);
        Schema::drop($config['taskables']);
    }
}
