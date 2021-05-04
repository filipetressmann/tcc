# use python container image
From python:3.6-stretch

# set the working directory of the image filesystem 
RUN mkdir /backend
WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# copy current directory to the working directory 
COPY . .

# start the uWSGI
CMD ["uwsgi", "app.ini"]