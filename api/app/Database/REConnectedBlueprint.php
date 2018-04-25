<?php

namespace App\Database;

use Illuminate\Database\Schema\Blueprint;

class REConnectedBlueprint extends Blueprint
{
    /**
     * Add nullable or non-nullable creation and update timestamps to the table basesd on parameters passed.
     *
     * @return void
     */
    public function timestamps($nullable_created_at = true, $nullable_updated_at = true, 
    	$add_created_by = false, $add_updated_by = false)
    {
    	if ($nullable_created_at) 
	        $this->timestamp('created_at')->nullable();
	    else
	    	$this->timestamp('created_at')->useCurrent();

	    if ($nullable_updated_at)
	        $this->timestamp('updated_at')->nullable();
	    else
	    	$this->timestamp('updated_at')->useCurrent();

	    if ($add_created_by && $nullable_created_at)
	    	$this->integer('created_by')->unsigned()->nullable()->after('created_at');
	    elseif ($add_created_by && !$nullable_created_at) 
	    	$this->integer('created_by')->unsigned()->after('created_at');

        if ($add_updated_by && $nullable_updated_at)
            $this->integer('updated_by')->unsigned()->nullable()->after('updated_at');
        elseif ($add_updated_by && !$nullable_updated_at)
            $this->integer('updated_by')->unsigned()->after('updated_at');

        if ($add_created_by)
	    	$this->foreign('created_by')->references('id')->on('users');

        if ($add_updated_by)
            $this->foreign('updated_by')->references('id')->on('users');
    }

    /**
     * Add a "deleted at" timestamp for the table.
     *
     * return @void
     */
    public function softDeletes($add_deleted_by = false)
    {
    	parent::softDeletes();
    	if ($add_deleted_by) { 
	        $this->integer('deleted_by')->unsigned()->nullable()->after('deleted_at');
	        $this->foreign('deleted_by')->references('id')->on('users');
    	}
    }

    /**
     * Comments here
     *
     * return @void
     */
    public function dropTimestamps($remove_updated_by = false, $remove_created_by = false) {
		parent::dropTimestamps();
		if ($remove_updated_by) {
			$this->dropForeign('updated_by');
	        $this->dropColumn('updated_by');
	    }
	    if ($remove_created_by) {
    		$this->dropForeign('created_by');
            $this->dropColumn('created_by');
        }	
    }

     /**
     * Comments here
     *
     * return @void
     */
    public function dropSoftDeletes($remove_deleted_by = false)
    {
    	parent::dropSoftDeletes();
    	if ($remove_deleted_by) 
	    	$this->dropForeign('deleted_by');
		    $this->dropColumn('deleted_by');
    }
}
