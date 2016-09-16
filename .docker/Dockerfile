FROM michaelsmithvml/d8centos7:1.0
MAINTAINER "Michael Smith" <michael.smith@vml.com>

ADD run-httpd.sh /run-httpd.sh
RUN chmod -v +x /run-httpd.sh
RUN mkdir /var/www/docroot

CMD ["/run-httpd.sh"]