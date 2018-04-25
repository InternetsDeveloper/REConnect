<?php

return [

	/*
	 * Addresses
	 */
	'addresses' => [
		/*
		 * Main table
		 */
		'table'   => 'addresses',

		/*
		 * Flag columns to be added to table
		 */
		'flags'   => ['mailing', 'property', 'business'],

		/*
		 * Enable geocoding to add coordinates (lon/lat) to addresses
		 */
		'geocode' => false,
	],
];