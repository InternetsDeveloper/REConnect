<?php

return [
    'table_names' => [
        'lead-status' => 'lead_statuses'
    ],
    'lead_statuses' => [
        [
            'system_name' => 'active',
            'display_name' => 'Active',
            'description' => 'Lead is Active'
        ],
        [
            'system_name' => 'dead',
            'display_name' => 'Dead',
            'description' => 'Lead is Dead'
        ],
        [
            'system_name' => 'working',
            'display_name' => 'Working',
            'description' => 'Lead is Working'
        ]
    ]
];