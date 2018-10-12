node_modules/grunt-cli/bin/grunt build
if [ -f "./nginx.pid" ]; then
   kill `cat ./nginx.pid`
   nginx -c nginx.conf -p ./
else
   nginx -c nginx.conf -p ./
fi
