FROM httpd:2.4

COPY scripts/start.sh .

COPY dist /usr/local/apache2/htdocs

COPY apache/httpd-development.conf /usr/local/apache2/conf
COPY apache/httpd-test.conf /usr/local/apache2/conf

EXPOSE 443
EXPOSE 80

CMD ["/bin/bash", "-c", "./start.sh"]
