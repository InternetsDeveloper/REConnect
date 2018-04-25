<?php

return [
  'table_names' => [
      'cards' => 'cards',
      'has_cards' => 'has_cards'
  ],
    'cards' => [
        [
            'stripe_id' => '123456789',
            'card_brand' => 'visa',
            'card_last_four' => '1234',
            'address_id' => '12',
            'cardable_id' => '1',
            'cardable_type' => 'user',
            'is_primary' => '1',
            'is_visa' => '1',
            'is_mastercard' => '0',
            'is_discover' => '0',
            'is_americanexpress' => '0',
            'is_dinersclub' => '0',
            'is_jbc' => '0',
            'vat_id' => 'ATU99999999',
            'extra_billing_information' => 'N/A',
        ],
        [
            'stripe_id' => '234567891',
            'card_brand' => 'mastercard',
            'card_last_four' => '2345',
            'address_id' => '42',
            'cardable_id' => '1',
            'cardable_type' => 'user',
            'is_primary' => '0',
            'is_visa' => '0',
            'is_mastercard' => '1',
            'is_discover' => '0',
            'is_americanexpress' => '0',
            'is_dinersclub' => '0',
            'is_jbc' => '0',
            'vat_id' => 'BG999999999',
            'extra_billing_information' => 'Please call if card is declined.',
        ],
    ],
    'phone_numbers' => [
        [
            'phone_number' => '1873892254',
            'is_preferred' => '1',
            'is_cell' => '0',
            'is_business' => '1',
        ],
        [
            'phone_number' => '4447778888',
            'is_preferred' => '0',
            'is_cell' => '1',
            'is_business' => '0',
        ],
        [
            'phone_number' => '1123321442',
            'is_preferred' => '1',
            'is_cell' => '1',
            'is_business' => '0',
        ],
    ]
];
