FROM nginx
ADD dist /usr/share/nginx/html
ADD run_nginx.sh /
ADD nginx.conf /
RUN chmod -R 755 /usr/share/nginx/html && \
    chmod +x run_nginx.sh && \
    mkdir /logs
EXPOSE 80
ENTRYPOINT ["/run_nginx.sh"]