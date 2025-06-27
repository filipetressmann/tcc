FROM postgres:16

# The locale configurations are needed because bikesp database have fields that are
# locale dependent (like remuneracao)
RUN apt-get update && apt-get install -y \
    locales \
    postgresql-contrib \
    postgresql-16-postgis-3 \
  && sed -i '/pt_BR.UTF-8/s/^# //g' /etc/locale.gen \
  && locale-gen

ENV LANG pt_BR.UTF-8
ENV LANGUAGE pt_BR:pt
ENV LC_ALL pt_BR.UTF-8

ENV POSTGRES_INITDB_ARGS="--locale=pt_BR.UTF-8"

COPY ./bikesp.sql /docker-entrypoint-initdb.d/00.sql
COPY ./create_transformed_db.sql /docker-entrypoint-initdb.d/01.sql
COPY ./transformations.sql /docker-entrypoint-initdb.d/02.sql