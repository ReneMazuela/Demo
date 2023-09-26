FROM python:3.11

RUN apt update && apt upgrade -y
RUN pip3 install -U pip setuptools wheel
RUN pip3 install gunicorn uvloop httptools

COPY ./service /app/src
COPY ./requirements.txt /app

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host=0.0.0.0", "--reload"]