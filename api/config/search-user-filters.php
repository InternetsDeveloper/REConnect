<?php

return [
    'table_names' => [
        'search_user_filters' => 'search_user_filters',
        'search_user_filterables' => 'search_user_filterables'
    ],
    'search_user_filters' => [
        [
            'filter_owner_user' => [
                'email' => 'rpowers@worthclark.com'
            ],
            'search_user_filter' => [
                'name' => 'Filter Number One',
                'min_age' => 0 ,
                'max_age' => 32,
                'gender_male' => 0,
                'gender_female' => 1,
                'gender_not_indicated' => 1,
                'area_of_speciality_id' => null,
                'min_insurance_expiration_date' => null,
                'max_insurance_expiration_date' => null,
                'min_license_expiration_date' => null,
                'max_license_expiration_date' => null,
                'min_start_date' => null,
                'max_start_date' => null,
                'email_subscribed' => null,
                'campaign_status_has_been_on' => null,
                'campaign_status_is_on' => null,
                'campaign_status_has_not_been_on' => null,
                'min_close_date' => null,
                'max_close_date' => null,
                'is_lead' => null,
                'min_assigned_date' => null,
                'max_assigned_date'=> null
            ],
            'companies' => [
                ['system_name' => 'andy_on_hand']
            ],
            'area_of_specialities' => [
                ['system_name' => 'sales']
            ],
            'created_by_users' => [
                ['email' => 'bryan@worthclark.com']
            ],
            'departments' => [
                ['system_name' => 'marketing']
            ],
            'sources' => [
                ['system_name' => 'web'],
                ['system_name' => 'newspaper']
            ],
            'campaigns' => [
                ['id' => '3'],
                ['id' => '6']
            ],
            'languages' => [
                ['system_name' => 'en'],
                ['system_name' => 'es']
            ],
            'compensation_plans' => [
                ['system_name' => 'gold_plan'],
                ['system_name' => 'silver_plan']
            ],
            'brokerages' => [
                ['system_name' => 'worth_clark']
            ],
            'markets' => [
                ['system_name' => 'st_louis'],
                ['system_name' => 'kansas_city']
            ],
            'prospect_statuses' => [
                ['system_name' => 'waiting']
            ],
            'lead_statuses' => [
                ['system_name' => 'active'],
                ['system_name' => 'working']
            ],
            'rolegroups' => [
                ['system_name' => 'buyer'],
                ['system_name' => 'seller'],
                ['system_name' => 'tenant'],
                ['system_name' => 'landlord']
            ],
            'transactions' => [
                ['name' => 'Purchase'],
                ['name' => 'Sale']
            ],
            'assigned_to_users' => [
                ['email' => 'bryan@worthclark.com']
            ],
            'rep_users' => [
                ['email' => 'bryan@worthclark.com'],
                ['email' => 'avera@worthclark.com']
            ]
        ],
        [
            'filter_owner_user' => [
                'email' => 'rpowers@worthclark.com'
            ],
            'search_user_filter' => [
                'name' => 'Filtrar Numbero Dos',
                'user_id' => 1,
                'min_age' => null,
                'max_age' => null,
                'gender_male' => 1,
                'gender_female' => 0,
                'gender_not_indicated' => null,
                'area_of_speciality_id' => null,
                'min_insurance_expiration_date' => null,
                'max_insurance_expiration_date' => null,
                'min_license_expiration_date' => null,
                'max_license_expiration_date' => null,
                'min_start_date' => null,
                'max_start_date' => null,
                'email_subscribed' => null,
                'campaign_status_has_been_on' => null,
                'campaign_status_is_on' => null,
                'campaign_status_has_not_been_on' => null,
                'min_close_date' => null,
                'max_close_date' => null,
                'is_lead' => null,
                'min_assigned_date' => null,
                'max_assigned_date'=> null
            ]
        ],
        [
            'filter_owner_user' => [
                'email' => 'avera@worthclark.com'
            ],
            'search_user_filter' => [
                'name' => 'フィルター三番目',
                'user_id' => 2,
                'min_age' => null,
                'max_age' => null,
                'gender_male' => null,
                'gender_female' => null,
                'gender_not_indicated' => 1,
                'area_of_speciality_id' => null,
                'min_insurance_expiration_date' => null,
                'max_insurance_expiration_date' => null,
                'min_license_expiration_date' => null,
                'max_license_expiration_date' => null,
                'min_start_date' => null,
                'max_start_date' => null,
                'email_subscribed' => false,
                'campaign_status_has_been_on' => null,
                'campaign_status_is_on' => null,
                'campaign_status_has_not_been_on' => null,
                'min_close_date' => null,
                'max_close_date' => null,
                'is_lead' => null,
                'min_assigned_date' => null,
                'max_assigned_date'=> null
            ]
        ]
    ]

];


