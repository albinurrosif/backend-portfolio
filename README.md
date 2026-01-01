# Backend Portfolio (Monorepo)

This repository is a backend **monorepo** containing multiple independent backend applications deployed on 1 web service.

The focus of this repository is **clarity, scalability, and engineering trade-offs** under limited infrastructure.

---

## 🎯 Purpose

This repository is intended to:

- Showcase backend engineering skills using a monorepo approach
- Demonstrate how multiple backend applications can share infrastructure cleanly
- Practice production-oriented patterns while remaining realistic about infrastructure constraints
- Serve as a long-term backend portfolio, not a playground

---

## 🧠 Design Philosophy

This project intentionally balances **best practices** with **practical constraints**.

Not all production features are always enabled in development due to:

- Infrastructure availability
- Cost considerations
- Simplicity during early-stage development

As a result:

- Some infrastructure (e.g. Redis-based rate limiting) is **optional**
- The system is designed to degrade gracefully when optional services are unavailable

This reflects how real backend systems evolve over time.

---

## 🧱 Architecture Overview

```text
backend-portfolio/
├── apps/                  # Business domains (independent apps)
│   └── notes-app/
│
├── shared/                # Cross-app reusable infrastructure
│   ├── infra/             # DB / Redis / external services
│   ├── middlewares/       # Rate limiter, error handler, etc.
│   ├── config/            # Environment & configuration loader
│   └── utils/
│
├── server.js              # Composition root
├── Dockerfile
├── package.json
└── README.md
```

### Key Principles

* **apps/** contain business logic only
* **shared/** contains technical concerns
* `server.js` is the only entry point
* Applications do not know about deployment details

---

## 📦 Applications

### Notes App

A simple note-taking REST API used to demonstrate:

* Express application composition
* MongoDB integration
* Optional Redis-based rate limiting
* Shared infrastructure usage in a monorepo

Base path:

```
/api/notes
```

---

## 🔁 Shared Infrastructure

The `shared/` directory contains reusable components shared by all applications:

* DB connection logic
* Redis / Upstash rate limiter
* Environment configuration loader
* Common middlewares

Infrastructure is initialized **once** at startup and reused across apps.

---

## ⚙️ Environment Configuration

This project uses environment variables for configuration.

Some services are **optional**:

| Service                                  | Required    | Reason                 |
| ---------------------------------------- | ----------  | ---------------------- |
| MongoDB, Postgres, or any database used  | ✅ Yes      | Core data storage      |
| Redis (Upstash)                          | ❌ Optional | Rate limiting          |
| Docker                                   | ❌ Optional | Deployment convenience |

If Redis variables are not provided:

* The application will still run
* Rate limiting will be disabled automatically

This is intentional.

---

## 🧪 Local Development

```bash
npm install
npm run dev
```

---

## 🐳 Docker

```bash
docker build -t backend-portfolio .
docker run -p 5001:5001 --env-file .env backend-portfolio
```

Docker Compose is also supported for local development.

---

## 🚀 Deployment

* **Backend**: Koyeb (Docker-based)
* **Frontend**: Vercel
* **Database**: MongoDB Atlas
* **Rate Limiting**: Upstash Redis (optional)

---

## 📌 Notes

This repository prioritizes **architectural clarity** over feature completeness.

Features are added incrementally, following real-world backend evolution.