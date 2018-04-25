<?php

return [
	'models' => [
		\App\Models\Market::class,
        \App\Models\Language::class,
        \App\Models\Users\LeadStatus::class,
        \App\Models\Users\Source::class,
        \App\Models\Users\ProspectStatus::class,
        \App\Models\Users\Department::class,
        \App\Models\Users\Brokerage::class,
        \App\Models\Users\AreaOfSpeciality::class,
        \App\Models\Users\Roles\RoleGroup::class,
        \App\Models\Users\Roles\Role::class,
        \App\Models\Permissions\Permission::class,
        \App\Models\CompensationPlans\CompensationPlan::class
	],

	'minutes' => '60'
];