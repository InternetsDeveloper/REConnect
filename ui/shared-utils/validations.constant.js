(function() {
	'use strict';

	angular
		.module('worthClark.utils.validations', [])
		.constant('Validations', {
			general: {
				pattern: /^[0-9a-zA-Z#-\s,.'&"$!():;%]+$/,
				message: 'Invalid entry. The only special characters allowed are # - , . \'&"$!():;%'
			},
			name: {
				pattern: /^[0-9a-zA-Z#-\s,.'&"$!]+$/,
				message: 'Invalid entry. The only special characters allowed are , . \' & " $ !'
			},
			street: {
				pattern: /^[0-9a-zA-Z#-\s,.]+$/,
				message: 'Invalid entry. The only special characters allowed are # - , .'
			},
			city: {
				pattern: /^[0-9a-zA-Z-'&.\s]+$/,
				message: 'Invalid entry. The only special character allowed are - \' &.'
			},
			state: {
				message: 'Must be a valid US state or province. Ex: NY'
			},
			zip: {
				pattern: /^(\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1})$/,
				message: 'Must be a valid US or Canadian Postal Code'
			},
			phone: {
				message: 'Must be a valid 10 digit phone number. Ex: (222) 555-1212'
			},
			email: {
				message: 'Must be a valid email address. Ex: someone@anydomain.com'
			}
		});
})();
