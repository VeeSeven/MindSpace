FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    curl \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

RUN useradd -m -u 1000 appuser

RUN mkdir -p /app/staticfiles /app/media

COPY . /app/

RUN chown -R appuser:appuser /app && chmod +x /app/entrypoint.sh

USER appuser

ENTRYPOINT ["/app/entrypoint.sh"]