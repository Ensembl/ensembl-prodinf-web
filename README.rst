Overview
========
This project provides a simple Angular web app which uses the services provided by `ensembl-prodinf-srv` to execute various production tasks.

Configuration
=============
Some default server values are provided in `app/scripts/config.js` which you may wish to update. In particular, you should modify the HC_SRV and DB_SRV urls.
If you want to use Nginx, You will need to setup your server port and app ports inside `nginx.conf`

Installation
========

`grunt` and `bower` are used as build tools. `npm` is assumed as a prerequisite. 

To install:
```
npm install
npm install grunt-cli
npm install bower
node_modules/bower/bin/bower install
```

Execution
=========
To run a test instance for development, you can use `grunt`:
```
node_modules/grunt-cli/bin/grunt serve
```

To build the distribtion for use with another web server:
```
node_modules/grunt-cli/bin/grunt build
```

OR To start a nginx server:
```
./start_nginx_server.sh
```

To create a docker image using `nginx`:
```
node_modules/grunt-cli/bin/grunt build
grunt build
docker build . -t ensembl_prodinf/www
```

To run the Docker image, specifying values `from config.js` to override at run time e.g.:
```
docker run -p:8001:80 --env HC_SRV_URI=http://ens-prod-1.ebi.ac.uk:4001/ --env DB_SRV_URI=http://ens-prod-1.ebi.ac.uk:4002/ ensembl_prodinf/www
```

To use Docker Compose to run a set of nodes for HC and DB job management (this requires images from ensembl-prodinf-srv), first ensure you have:
* built the following images:
 * `ensembl_prodinf/www`
 * `ensembl_prodinf/hc_app`
 * `ensembl_prodinf/db_app`
 * `ensembl_prodinf/celery_email`
* created a .env file containing the following values (see `example.env` for an example):
 * HC_HIVE_URI - hive for your HC pipeline
 * SMTP_SERVER - SMTP server used by email alerter
 * EMAIL_RETRY_WAIT - time for email alerter to wait between checking jobs (optional)
 * FROM_EMAIL_ADDRESS - email address to use in alert mails (optional)
 * SSH_KEYS_VOL - local folder containing keys specified in `ssh_config`
 * SERVER_URIS_VOL - local folder containing server URIs files used by db endpoint
 * SERVER_URIS_FILE - name of server URI file to use (relative to `SERVER_URIS_VOL`)


then start Docker Compose:
```
docker-compose up
```
The website will be available on 0.0.0.0:8000 and the Flask server on 0.0.0.0:4001.

