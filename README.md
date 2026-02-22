# MindSpace

MindSpace is a recursive note‑taking app where you can create nested notes (folders inside folders), organize them with tags, and write using a rich text editor. Built with React, Django, and PostgreSQL, and fully containerized with Docker for easy local development.

## ✨ Key Features

- **Nested Notes** – Create notes inside notes, forming an infinite hierarchy.
- **Tagging System** – Add tags to notes; filter by tags; tags get consistent colors automatically.
- **Rich Text Editor** – Powered by TipTap with formatting toolbar, word count, and auto‑save.
- **JWT Authentication** – Secure login/register with token rotation.
- **Dockerized** – Run the whole stack with one command.

## 🛠 Tech Stack

- **Frontend:** React, Vite, Chakra UI, Axios, TipTap
- **Backend:** Django, Django REST Framework, SimpleJWT, PostgreSQL
- **Containerization:** Docker, Docker Compose

## 📋 Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (for Docker setup)
- OR [Node.js](https://nodejs.org/) (v18+) + [Python](https://python.org/) (3.11+) + [PostgreSQL](https://postgresql.org/) (for local setup)

## 🚀 Getting Started

Choose one of the following methods.

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/VeeSeven/MindSpace.git
   cd MindSpace
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in your own values (especially `SECRET_KEY` and `DB_PASSWORD`).  
   The superuser credentials are defined here – they will be auto‑created when the backend starts (only in development mode).

3. **Start all services**
   ```bash
   docker-compose up --build
   ```
   This starts:
   - PostgreSQL on `localhost:5432`
   - Django backend on `http://localhost:8000`
   - React frontend (Vite dev server) on `http://localhost:5173`

4. **Open the app** at `http://localhost:5173` and log in with the superuser credentials you set, or register a new user.

### Option 2: Local Setup (without Docker)

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a PostgreSQL database (e.g., `mindspace_db`). Then copy `backend/.env.example` to `backend/.env` and adjust variables (set `DB_HOST=localhost`). Run:

```bash
python manage.py migrate
python manage.py createsuperuser   # optional, if you want an admin
python manage.py runserver
```
Backend will be available at `http://localhost:8000`.

#### Frontend

In a new terminal:

```bash
cd mindspace-frontend
cp .env.example .env   # or set VITE_API_BASE=http://localhost:8000/api/
npm install
npm run dev
```
Frontend will be available at `http://localhost:5173`.

## 🔐 Environment Variables

The root `.env` file (used by Docker) contains the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_NAME` | PostgreSQL database name | `mindspace_db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `yourpassword` |
| `DB_HOST` | Database host (use `db` for Docker) | `db` |
| `DB_PORT` | Database port | `5432` |
| `SECRET_KEY` | Django secret key – change in production | `your-secret-key` |
| `DEBUG` | Set to `True` for development | `True` |
| `ALLOWED_HOSTS` | Comma‑separated allowed hosts | `localhost,127.0.0.1,backend` |
| `VITE_API_BASE` | Backend API URL for frontend | `http://localhost:8000/api/` |
| `ACCESS_TOKEN_LIFETIME` | JWT access token lifetime (minutes) | `30` |
| `REFRESH_TOKEN_LIFETIME` | JWT refresh token lifetime (days) | `1` |
| `DJANGO_SUPERUSER_USERNAME` | Admin username (auto‑created) | `admin` |
| `DJANGO_SUPERUSER_PASSWORD` | Admin password | `admin` |
| `DJANGO_SUPERUSER_EMAIL` | Admin email | `admin@xyz.com` |

> **Note:** The superuser is only created automatically when `DEBUG=True` (development mode) and the user doesn't already exist.

## 📡 API Overview

All endpoints require JWT authentication (except `/register/` and `/token/`).

- `POST /api/register/` – Register a new user
- `POST /api/token/` – Obtain JWT token pair
- `POST /api/token/refresh/` – Refresh access token
- `GET /api/notes/` – List user’s notes (supports `?q=search` and `?tag=id`)
- `POST /api/notes/` – Create a note
- `GET /api/notes/<id>/` – Retrieve a note with its children
- `PUT /api/notes/<id>/` – Update a note
- `DELETE /api/notes/<id>/` – Delete a note
- `POST /api/notes/<id>/add_tag/` – Assign a tag
- `DELETE /api/notes/<id>/remove_tag/` – Remove a tag
- `GET /api/tags/` – List user’s tags (with note count)
- `POST /api/tags/` – Create a tag (color auto‑assigned)
