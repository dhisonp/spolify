FROM python:3.9-alpine
WORKDIR /src
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
ENV FLASK_APP=app/app.py
CMD ["flask", "run", "--host", "0.0.0.0"]