FROM php:8.1-fpm

RUN apt-get update && apt install -y unzip zlib1g-dev libpng-dev libpq-dev
RUN docker-php-ext-install pdo_pgsql
RUN docker-php-ext-install gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
run composer global require laravel/installer

COPY . /var/www/html
workdir /var/www/html

RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["./run.sh"]

