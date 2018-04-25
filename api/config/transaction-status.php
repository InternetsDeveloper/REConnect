<?php

return [
    'table_names' => [
        'transaction-status' => 'transaction_statuses'
    ],
    'transaction_statuses' => [
        [
            'system_name' => 'active',
            'display_name' => 'Active',
            'description' => 'Transaction is Active'
        ],
        [
            'system_name' => 'dead',
            'display_name' => 'Dead',
            'description' => 'Transaction is Dead'
        ],
        [
            'system_name' => 'working',
            'display_name' => 'Working',
            'description' => 'Transaction is Working'
        ]
    ]
];