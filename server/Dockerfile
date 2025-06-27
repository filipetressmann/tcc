FROM python:3.7 as base

RUN mkdir /backend
WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .


ENV PYTHONPATH="${PYTHONPATH}:/backend"

FROM base as debug
RUN pip install debugpy
CMD python -m debugpy --listen 0.0.0.0:5678 --wait-for-client -m flask run --host 0.0.0.0 -p 5000

FROM base as development
CMD flask run --host=0.0.0.0 --port=5000

FROM base as production
CMD ["uwsgi", "app.ini"]