FROM php:8.1-fpm

RUN apt-get update && apt install -y zlib1g-dev libpng-dev
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html

RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]

