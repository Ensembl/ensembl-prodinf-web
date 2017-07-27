var config_module = angular.module('app.config', [])
    .constant('CONFIG', {
	'LIVE_URI': 'mysql://ensro@mysql-ensembl-mirror.ebi.ac.uk:4240/',
	'STAGING_URI': 'mysql://ensro@mysql-ens-sta-1.ebi.ac.uk:4519/',
	'COMPARA_URI': 'mysql://ensro@mysql-ens-compara-prod-1.ebi.ac.uk:4485/ensembl_compara_master',
	'PROD_URI': 'mysql://ensro@mysql-ens-sta-1.ebi.ac.uk:4519/ensembl_production',
	'HC_SRV_URL': "http://ens-prod-1.ebi.ac.uk:5000/"
    });
