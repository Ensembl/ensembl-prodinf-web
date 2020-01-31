angular.module('app.config', [])
    .constant('CONFIG', {
        'LIVE_URI': 'mysql://ensembl@127.0.0.1:3306/',
        'STAGING_URI': 'mysql://ensembl@127.0.0.1:3306/',
        'COMPARA_URI': 'mysql:///ensembl@127.0.0.1:3306/ensembl_compara_master',
        'PROD_URI': 'mysql://ensembl@127.0.0.1:3306/ensembl_production',
        'HC_SRV_URL': 'http://127.0.0.1:5001/',
        'DB_SRV_URL': 'http://127.0.0.1:5002/',
        'URI_USER': 'ensroensembl',
        'COPY_SOURCE_USER': 'ensembl',
        'COPY_TARGET_USER': 'ensembl',
        'DATA_FILES_PATH': '~/localhost/data_files/',
        'METADATA_SRV_URL': 'http://127.0.0.1:5003/',
        'HANDOVER_SRV_URL': 'http://127.0.0.1:5004/',
        'WEBSITE_NAME': 'Production team private self service'
    });
