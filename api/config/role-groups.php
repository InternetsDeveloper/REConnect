<?php

return [
    'table_names' => [
        'rolegroups' => 'rolegroups',
        'rolegroupables' => 'rolegroupables'
    ],
    'rolegroups' => [
        [
            'system_name' => 'staff',
            'display_name' => 'Staff',
            'description' => 'Staff People'
        ],
        [
            'system_name' => 'buyer',
            'display_name' => 'Buyer',
            'description' => 'Those looking to purchase'
        ],
        [
            'system_name' => 'seller',
            'display_name' => 'Seller',
            'description' => 'Those looking to sell'
        ],
        [
            'system_name' => 'tenant',
            'display_name' => 'Tenant',
            'description' => 'Those who rent from landlords'
        ],
        [
            'system_name' => 'landlord',
            'display_name' => 'Landlord',
            'description' => 'Those who own and rent out to tenants'
        ],
        [
            'system_name' => 'vendor',
            'display_name' => 'Vendor',
            'description' => 'Vendor people'
        ]
    ]
];