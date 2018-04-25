<?php

date_default_timezone_set("America/Chicago");

use Carbon\Carbon;

return [

    'table_names' => [
        'users' => 'users'
    ],
    'seeder_config' => [
        'num_user_seeds' => env('NUM_USER_SEEDS', 50),
        'min_campaigns' => env('MIN_CAMPAIGNS', 1),
        'max_campaigns' => env('MAX_CAMPAIGNS', 4),
        'min_roles' => env('MIN_ROLES', 1),
        'max_roles' => env('MAX_ROLES', 3),
        'min_phone_numbers' => env('MIN_PHONE_NUMBERS', 1),
        'max_phone_numbers' => env('MAX_PHONE_NUMBERS', 3),
        'min_addresses' => env('MIN_ADDRESSES', 1),
        'max_addresses' => env('MAX_ADDRESSES', 3),
        'min_tasks' => env('MIN_TASKS', 4),
        'max_tasks' => env('MAX_TASKS', 25),
    ],
    'defaults' => [
        'initial_user' => [
            'user' => [
                'name' => 'Rob Powers',
                'email' => 'rpowers@worthclark.com',
                'age' => 28,
                'gender'=> 'male',
                'password' => 'password',
                'email_subscribed' => true,
                'created_by' => 1,
                'updated_by' => 1
            ],
            'department' => [
                'system_name' => 'staff',
                'display_name' => 'Staff',
                'description' => 'part of the staff'
            ],
            'user_role'=> [
                'name' => 'adsupr',
                'display_name' => 'Super Admin'
            ]
        ],
        'created_by' => [
            'email' => 'rpowers@worthclark.com',
            'role' => 'adsupr'
        ]
    ],
    'users' => [
        [
            'user' => [
                'name' => 'Rob Powers',
                'email' => 'rpowers@worthclark.com',
                'age' => 42,
                'gender'=> 'male',
                'password' => 'password',
                'email_subscribed' => true,
                'photo_url' => '/img/dashboard/avatars/avatar_male_1.jpg',
                'insurance_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'license_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'start_date' => date('Y-m-d', strtotime( '-'.mt_rand(0,30).' days'))
            ],
            'department' => [
                'system_name' => 'engineering',
                'display_name' => 'Engineering'
            ],
            'user_roles'=> [
                [
                    'name' => 'adsupr'
                ]
            ],
            'market' => [
                'system_name' => 'st_louis'
            ],
            'phone_numbers' => [
                [
                    'is_home' => 1,
                    'phone_number' => '3148298882',
                    'is_preferred'=>  1
                ],
                [
                    'is_business' => 1,
                    'phone_number' => '6369288821',
                    'is_preferred'=>  0
                ],
                [
                    'is_cell' => 1,
                    'phone_number' => '3214598727',
                    'is_preferred'=>  0
                ]
            ],
            'addresses' => [
                [
                    'is_mailing' => 1,
                    'street' => '100 Main',
                    'city' => 'Burlington',
                    'state' => 'VT',
                    'post_code' => '90210',
                    'country_id' => '840'
                ],
                [
                    'is_property' => 1,
                    'street' => '10784 Oak Pointe Dr',
                    'city' => 'Saint Ann',
                    'state' => 'MO',
                    'post_code' => '63074',
                    'country_id' => '840'
                ],
                [
                    'is_business' => 1,
                    'street' => '785 Southern Hills Dr',
                    'city' => 'Eureka',
                    'state' => 'MO',
                    'post_code' => '63025',
                    'country_id' => '840'
                ]
            ],
            'languages' => [
              [
                  'system_name' => 'en'
              ]
            ],
            'compensation_plan' => [
                'system_name' => 'gold_plan'
            ],
            'area_of_speciality' => [
                'system_name' => 'electrician'
            ],
            'campaigns' => [
                [
                    'name' => '2017 Homeowners'
                ],
                [
                    'name' => '2017 Tenants'
                ],
                [
                    'name' => '2017 Social Good'
                ]
            ],
            'user_company' => [
                'system_name' => 'continental_title'
            ],
            'brokerage' => [
                'system_name' => 'keller_williams'
            ],
            'notes' => [
                'note' => 'There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened.'
            ]
        ],
        [
            'user' => [
                'name' => 'Adam Vera',
                'email' => 'avera@worthclark.com',
                'age' => 30,
                'gender'=> 'male',
                'password' => 'password',
                'email_subscribed' => false,
                'photo_url' => '/img/dashboard/avatars/avatar_male_2.jpg',
                'insurance_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'license_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'start_date' => date('Y-m-d', strtotime( '-'.mt_rand(0,30).' days'))
            ],
            'department' => [
                'system_name' => 'engineering',
                'display_name' => 'Engineering'
            ],
            'user_roles'=> [
                [
                    'name' => 'adsupr'
                ],
                [
                    'name' => 'buyer'
                ],
                [
                    'name' => 'seller'
                ],
                [
                    'name' => 'landlord'
                ]
            ],
            'market' => [
                'system_name' => 'chicago'
            ],
            'phone_numbers' => [
                [
                    'is_home' => 1,
                    'phone_number' => '3144230250',
                    'is_preferred'=>  1
                ],
                [
                    'is_cell' => 1,
                    'phone_number' => '3148786992',
                    'is_preferred'=>  0
                ]
            ],
            'addresses' => [
                [
                    'is_property' => 1,
                    'street' => '675 Lawrence Rd #210',
                    'city' => 'Black Rock',
                    'state' => 'AR',
                    'post_code' => '72415',
                    'country_id' => '840'
                ],
                [
                    'is_business' => 1,
                    'street' => '15 Oak St',
                    'city' => 'Manchester',
                    'state' => 'Wellesley',
                    'post_code' => 'MA',
                    'country_id' => '840'
                ]
            ],
            'languages' => [
                [
                    'system_name' => 'en'
                ],
                [
                    'system_name' => 'ja'
                ]
            ],
            'compensation_plan' => [
                'system_name' => 'silver_plan'
            ],
            'area_of_speciality' => [
                'system_name' => 'electrician'
            ],
            'rep' => [
                'email' => 'rpowers@worthclark.com'
            ],
            'lead_status' => [
                'system_name' => 'working'
            ],
            'prospect_status' => [
                'system_name' => 'waiting'
            ],
            'source' => [
                'system_name' => 'web'
            ],
            'campaigns' => [
                [
                    'name' => '2016 Spring'
                ],
                [
                    'name' => '2016 Winter'
                ]
            ],
            'user_company' => [
                'system_name' => 'hospitality_handyman'
            ],
            'brokerage' => [
                'system_name' => 'coldwell_banker'
            ],
            'source' => [
                'system_name' => 'newspaper'
            ],
            'notes' => [
                'note' => '"In the beginning, the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move."
'
            ]
        ],
        [
            'user' => [
                'name' => 'Alissa Talimonchuk',
                'email' => 'alissat@worthclark.com',
                'age' => 26,
                'gender'=> 'female',
                'password' => 'password',
                'email_subscribed' => true,
                'photo_url' => '/img/dashboard/avatars/avatar_female_1.jpg',
                'insurance_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'license_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'start_date' => date('Y-m-d', strtotime( '-'.mt_rand(0,30).' days'))
            ],
            'department' => [
                'system_name' => 'sales',
                'display_name' => 'Sales'
            ],
            'user_roles'=> [
                [
                    'name' => 'adsyst'
                ]
            ],
            'market' => [
                'system_name' => 'st_louis'
            ],
            'phone_numbers' => [
                [
                    'is_home' => 1,
                    'phone_number' => '3146352631',
                    'is_preferred'=>  0
                ],
                [
                    'is_business' => 1,
                    'phone_number' => '6362459222',
                    'is_preferred'=>  1
                ],
                [
                    'is_cell' => 1,
                    'phone_number' => '6362245575',
                    'is_preferred'=>  0
                ]
            ],
            'addresses' => [
                [
                    'is_mailing' => 1,
                    'street' => '3450 Saratoga St',
                    'city' => 'Wellington',
                    'state' => 'CO',
                    'post_code' => '80549',
                    'country_id' => '840'
                ],
                [
                    'is_property' => 1,
                    'street' => '39 Cherry Ln',
                    'city' => 'Eden',
                    'state' => 'VT',
                    'post_code' => '05652',
                    'country_id' => '840'
                ],
                [
                    'is_business' => 1,
                    'street' => '428 2nd Rte',
                    'city' => 'Post',
                    'state' => 'TX',
                    'post_code' => '79356',
                    'country_id' => '840'
                ]
            ],
            'languages' => [
                [
                    'system_name' => 'en'
                ]
            ],
            'compensation_plan' => [
                'system_name' => 'silver_plan'
            ],
            'area_of_speciality' => [
                'system_name' => 'sales'
            ],
            'campaigns' => [
                [
                    'name' => '2015 Big Sale'
                ],
                [
                    'name' => '2015 Small Sale'
                ]
            ],
            'user_company' => [
                'system_name' => 'investor_title_company'
            ],
            'brokerage' => [
                'system_name' => 'worth_clark'
            ]
        ],
        [
            'user' => [
                'name' => 'Bryan Bowles',
                'age' => 34,
                'gender'=> 'male',
                'email' => 'bryan@worthclark.com',
                'email_subscribed' => true,
                'password' => 'password',
                'photo_url' => '/img/dashboard/avatars/avatar_male_3.jpg',
                'insurance_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'license_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'start_date' => date('Y-m-d', strtotime( '-'.mt_rand(0,30).' days'))
            ],
            'department' => [
                'system_name' => 'marketing',
                'display_name' => 'Marketing'
            ],
            'user_roles'=> [
                [
                    'name' => 'buyer'
                ]
            ],
            'market' => [
                'system_name' => 'kansas_city'
            ],
            'brokerage' => [
                'system_name' => 'worth_clark'
            ],
            'phone_numbers' => [
                [
                    'is_home' => 1,
                    'phone_number' => '3143981232',
                    'is_preferred'=>  1
                ]
            ],
            'addresses' => [
                [
                    'is_mailing' => 1,
                    'street' => '380 Mashapaug Rd',
                    'city' => 'Holland',
                    'state' => 'MA',
                    'post_code' => '01521',
                    'country_id' => '840'
                ],
                [
                    'is_property' => 1,
                    'street' => '32735 A County 29 Rte',
                    'city' => 'Philadelphia',
                    'state' => 'NY',
                    'post_code' => '13673',
                    'country_id' => '840'
                ],
                [
                    'is_business' => 1,
                    'street' => '691 S Milpitas Blvd',
                    'city' => 'Milpitas',
                    'state' => 'CA',
                    'post_code' => '95035',
                    'country_id' => '840'
                ]
            ],
            'languages' => [
                [
                    'system_name' => 'en'
                ]
            ],
            'compensation_plan' => [
                'system_name' => 'bronze_plan'
            ],
            'area_of_speciality' => [
                'system_name' => 'farmer'
            ],
            'rep' => [
                'email' => 'avera@worthclark.com'
            ],
            'lead' => [
                'email' => 'avera@worthclark.com'
            ],
            'campaigns' => [
                [
                    'name' => '2014 Red Houses'
                ],
                [
                    'name' => '2014 Blue Houses'
                ],
                [
                    'name' => '2014 Orange Houses'
                ],
                [
                    'name' => '2014 Black Houses'
                ]
            ],
            'user_company' => [
                'system_name' => 'continental_title'
            ],
            'brokerage' => [
                'system_name' => 'keller_williams'
            ],
            'notes' => [
                'note' => 'Many were increasingly of the opinion that they’d all made a big mistake in coming down from the trees in the first place. And some said that even the trees had been a bad move, and that no one should ever have left the oceans.'
            ]
        ],
        [
            'user' => [
                'name' => 'Josh Stevens',
                'age' => 31,
                'gender'=> 'male',
                'email' => 'josh@worthclark.com',
                'email_subscribed' => true,
                'password' => 'password',
                'photo_url' => '/img/dashboard/avatars/avatar_male_4.jpg',
                'insurance_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'license_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
                'start_date' => date('Y-m-d', strtotime( '-'.mt_rand(0,30).' days'))
            ],
            'department' => [
                'system_name' => 'marketing',
                'display_name' => 'Marketing'
            ],
            'user_roles'=> [
                [
                    'name' => 'adsupr'
                ]
            ],
            'market' => [
                'system_name' => 'kansas_city'
            ],
            'brokerage' => [
                'system_name' => 'worth_clark'
            ],
            'phone_numbers' => [
                [
                    'is_home' => 1,
                    'phone_number' => '6360395252',
                    'is_preferred'=>  1
                ]
            ],
            'addresses' => [
                [
                    'is_mailing' => 1,
                    'street' => '928 Maple St',
                    'city' => 'Springfiled',
                    'state' => 'MA',
                    'post_code' => '01521',
                    'country_id' => '840'
                ],
                [
                    'is_property' => 1,
                    'street' => '8214 South East St',
                    'city' => 'New York',
                    'state' => 'NY',
                    'post_code' => '13673',
                    'country_id' => '840'
                ],
                [
                    'is_business' => 1,
                    'street' => '34912 Foo St',
                    'city' => 'St Louis',
                    'state' => 'MO',
                    'post_code' => '63021',
                    'country_id' => '840'
                ]
            ],
            'languages' => [
                [
                    'system_name' => 'en'
                ]
            ],
            'compensation_plan' => [
                'system_name' => 'bronze_plan'
            ],
            'area_of_speciality' => [
                'system_name' => 'farmer'
            ],
            'lead' => [
                'email' => 'bryan@worthclark.com'
            ],
            'campaigns' => [
                [
                    'name' => '2017 Stripped Houses'
                ],
                [
                    'name' => '2015 Tan Houses'
                ],
                [
                    'name' => '2013 Pink Houses'
                ],
                [
                    'name' => '2011 Huge Houses'
                ]
            ],
            'user_company' => [
                'system_name' => 'continental_title'
            ],
            'brokerage' => [
                'system_name' => 'keller_williams'
            ],
            'notes' => [
                'note' => 'A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.'
            ]
        ]
    ]
];