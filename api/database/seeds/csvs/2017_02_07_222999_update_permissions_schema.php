<?php 

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatePermissionsSchema extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $config = config('laravel-permission.table_names');

        Schema::table($config['permissions'], function (Blueprint $table) {
            $table->integer('module_id')->unsigned();
            $table->string('system_name')->unique();
            $table->string('display_name')->unique();
            $table->longText('description');

            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->unsignedInteger('deleted_by')->nullable()->default(NULL);

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('module_id')
                ->references('id')
                ->on('modules')
                ->onDelete('cascade');
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->integer('rolegroup_id')->unsigned();
            $table->string('display_name')->unique();
            $table->longText('description')->nullable();

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
        $config = config('laravel-permission.table_names');

        Schema::table($config['permissions'], function (Blueprint $table) {
//            $table->dropColumn('description');
//            $table->dropForeign('module_id');
//            $table->dropForeign('created_by');
//            $table->dropForeign('updated_by');
//            $table->dropForeign('deleted_by');

        });

        Schema::drop($config['permissions']);

        Schema::table('roles', function (Blueprint $table) {
//            $table->dropForeign('created_by');
//            $table->dropForeign('updated_by');
//            $table->dropForeign('deleted_by');
//            $table->dropColumn('display_name');
//            $table->dropColumn('description');
        });

        Schema::drop($config['roles']);
    }
}
