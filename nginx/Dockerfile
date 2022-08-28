FROM nginx:stable-alpine

#  copy the nginx.conf in our filesystem into the image filesystem
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d