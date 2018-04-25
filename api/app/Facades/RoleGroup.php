<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class RoleGroup extends Facade
{
	/**
     * @inheritdoc
	 */
	protected static function getFacadeAccessor()
	{
		return 'RoleGroup';
	}
}