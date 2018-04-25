<?php

return [
    'table_names' => [
        'compensation-plans' => 'compensation_plans',
    ],
    'compensation_plans' => [
        [
            'system_name' => 'gold_plan',
            'display_name' => 'Gold Plan',
            'description' => 'The grand plan',
            'payout_type' => 'percentage',
            'amount' => '6'
        ],
        [
            'system_name' => 'silver_plan',
            'display_name' => 'Silver Plan',
            'description' => 'The ok plan',
            'payout_type' => 'percentage',
            'amount' => '12.5'
        ],
        [
            'system_name' => 'bronze_plan',
            'display_name' => 'Bronze Plan',
            'description' => 'The not so good plan',
            'payout_type' => 'flat_fee',
            'amount' => '100'
        ]
    ]
];