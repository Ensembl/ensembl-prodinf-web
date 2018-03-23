#!/bin/sh --
for env in HC_SRV_URL LIVE_URI STAGING_URI COMPARA_URI PROD_URI DB_SRV_URL URI_USER COPY_SOURCE_USER COPY_TARGET_USER DATA_FILES_PATH; do
    val=$(printenv $env)
    if [ ! -z "$val" ]; then
        echo "Configuring UI to use $env $val"
        sed -i -e \
            "s#$env:\"[^\"]*\"#$env:\"$val\"#g" \
            /usr/share/nginx/html/scripts/*.js
    fi
done
echo "Starting Web Server"
nginx -g 'daemon off;' -c /nginx.conf
