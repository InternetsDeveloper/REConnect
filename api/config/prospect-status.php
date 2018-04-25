<?php

return [
    'table_names' => [
        'prospect-status' => 'prospect_statuses'
    ],
    'prospect_statuses' => [
        [
            'system_name' => 'waiting',
            'display_name' => 'Waiting',
            'description' => 'Waiting for the listing agreement to be signed.'
        ],
        [
            'system_name' => 'signed',
            'display_name' => 'Signed',
            'description' => 'The listing agreement has been signed.'
        ]
    ]
];