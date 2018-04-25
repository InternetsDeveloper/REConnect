(function() {
	'use strict';

	/**
	 * @class UploadService
	 * @memberOf worthClark.imageUpload
	 *
	 * @param {$http} $http - Angular $http service.
	 * @param {Upload} Upload - Upload service.
	 */
	angular
		.module('worthClark.fileUpload')
		.factory('UploadService', ['$http', 'Upload', function($http, Upload) {
			return {
				// uploadImage: uploadImage,
				uploadCsv: uploadCsv
			};

			/**
			 * Upload a single file.
			 *
			 * @param {File} file - The image to upload.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			// function uploadImage(file) {
			// 	return Upload.upload({
			// 		url: 'https://s3.amazonaws.com/tradeserve-app-uploads/',
			// 		method: 'POST',
			// 		data: {
			// 			key: file.name,
			// 			AWSAccessKeyId: 'AKIAJLUEGVG3AUITQHQA',
			// 			acl: 'public-read',
			// 			policy: 'ew0KICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwNCiAiY29uZGl0aW9ucyI6IFsNC' +
			// 			'iAgIHsiYnVja2V0IjogInRyYWRlc2VydmUtYXBwLXVwbG9hZHMifSwNCiAgIFsic3RhcnRzLXdpdGgiLCAiJGtleS' +
			// 			'IsICIiXSwNCiAgIHsiYWNsIjogInB1YmxpYy1yZWFkIn0sDQogICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR' +
			// 			'5cGUiLCAiIl0sDQogICBbInN0YXJ0cy13aXRoIiwgIiRmaWxlbmFtZSIsICIiXSwNCiAgIFsiY29udGVudC1sZW5ndG' +
			// 			'gtcmFuZ2UiLCAwLCA1MjQyODgwMDBdDQogXQ0KfQ==',
			// 			signature: 't2+cYRySpITHEhszSvW7/aa0SyI=',
			// 			'Content-Type': file.type === '' ? 'application/octet-stream' : file.type,
			// 			filename: file.name,
			// 			file: file
			// 		}
			// 	});
			// }

			/**
			 * Upload a single file.
			 *
			 * @param {File} file - The image to upload.
			 * @param {String} guid - GUID for file upload
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function uploadCsv(file, guid) {
				return Upload.upload({
					url: 'https://s3.amazonaws.com/wc-contact-import',
					method: 'POST',
					data: {
						key: guid,
						AWSAccessKeyId: 'AKIAJWNQOWADG6TQFJOA',
						acl: 'public-read',
						policy: 'ewogICJleHBpcmF0aW9uIjogIjIwM' +
						'jAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZG' +
						'l0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInd' +
						'jLWNvbnRhY3QtaW1wb3J0In0sCiAgICBbInN0' +
						'YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgI' +
						'CB7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LAogIC' +
						'AgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1' +
						'UeXBlIiwgIiJdLAogICAgWyJzdGFydHMtd2l0' +
						'aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgXQp9',
						signature: 'fRV0NVYfjp1ufmfa79/s0eKa3lk=',
						'Content-Type': file.type === '' ? 'application/octet-stream' : file.type,
						filename: file.name,
						file: file
					}
				});
			}
		}]);
})();
