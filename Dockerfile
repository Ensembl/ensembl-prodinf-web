FROM nginx
ADD dist /usr/share/nginx/html
ADD run_nginx.sh /
ADD nginx.conf /
RUN mkdir -p /var/cache/nginx && \
    mkdir -p /logs && \
    touch /var/run/nginx.pid && \
    chown -R 1000:0 /etc/nginx && \
    chown -R 1000:0 /usr/share/nginx && \
    chown -R 1000:0 /logs && \
    chown -R 1000:0 /var/run/nginx.pid && \
    chown -R 1000:0 /var/cache/nginx && \
    chmod -R 770 /usr/share/nginx && \
    chmod -R 770 /logs && \
    chown 1000:0 /run_nginx.sh && \
    chown 1000:0 /nginx.conf && \
    chmod 770 /run_nginx.sh && \
    chmod 770 /nginx.conf && \
    chmod -R 770 /etc/nginx
USER 1000:0
EXPOSE 8080
ENTRYPOINT ["/run_nginx.sh"]