angular.module('app.config', [])
    .constant('CONFIG', {
	'LIVE_URI': 'mysql://ensro@ensro@127.0.0.1:3306/',
	'STAGING_URI': 'mysql://ensro@ensro@127.0.0.1:3306/',
	'COMPARA_URI': 'mysql:///ensro@127.0.0.1:3306/ensembl_compara_master',
	'PROD_URI': 'mysql://ensro@127.0.0.1:3306/ensembl_production',
	'HC_SRV_URL': 'http://127.0.0.1:5001/',
	'DB_SRV_URL': 'http://127.0.0.1:5002/',
	'URI_USER': 'ensro',
	'COPY_USER': 'ensadmin'
    });
