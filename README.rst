Overview
========
This project provides a simple Angular web app which uses the services provided by `ensembl-prodinf-srv` to execute various production tasks.

Configuration
=============
Some default server values are provided in `app/scripts/config.js` which you may wish to update. In particular, you should modify the HC_SRV and DB_SRV urls.

Installation
========

`grunt` and `bower` are used as build tools. `npm` is assumed as a prerequisite. 

To install:
```
npm install
npm install grunt-cli
npm install bower
node_modules/bower/bin/bower install
bower install components-font-awesome
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

To create a docker image using `nginx`:
```
node_modules/grunt-cli/bin/grunt build
grunt build
docker build . -t ensembl_prodinf
```
