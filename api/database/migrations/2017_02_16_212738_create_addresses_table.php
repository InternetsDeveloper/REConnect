<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateAddressesTable
 */
class CreateAddressesTable extends Migration
{
    /**
     * Table names
     */
    private $table_addresses;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->table_addresses = config('lecturize.addresses.table', 'addresses');
    }

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->table_addresses, function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('street',    60);
			$table->string('city',      60);
			$table->string('state',     60);
			$table->string('post_code', 10);

			$table->integer('country_id')->unsigned()->index();

            $table->string('note')->nullable();

            $table->float('lat', 10, 6)->nullable();
            $table->float('lng', 10, 6)->nullable();

            $table->morphs('addressable');

			foreach( config('lecturize.addresses.flags', ['mailing', 'property', 'business']) as $flag ) {
				$table->boolean('is_'. $flag)->default(false)->index();
			}

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
        Schema::drop($this->table_addresses);
    }
}