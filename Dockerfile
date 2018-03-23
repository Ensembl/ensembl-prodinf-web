FROM nginx
ADD dist /usr/share/nginx/html
ADD run_nginx.sh /
ADD nginx.conf /
RUN mkdir -p /var/cache/nginx && \
    mkdir -p /logs && \
    touch /var/run/nginx.pid && \
    chown -R 1000130000:0 /etc/nginx && \
    chown -R 1000130000:0 /usr/share/nginx && \
    chown -R 1000130000:0 /logs && \
    chown -R 1000130000:0 /var/run/nginx.pid && \
    chown -R 1000130000:0 /var/cache/nginx && \
    chmod -R 755 /usr/share/nginx && \
    chmod -R 755 /logs && \
    chmod -R 755 /etc/nginx && \
    chmod a+x run_nginx.sh
USER 1000130000:0
EXPOSE 8080
ENTRYPOINT ["/run_nginx.sh"]