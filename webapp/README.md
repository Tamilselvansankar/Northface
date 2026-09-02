# Nothface

A demo e-commerce site for a fictional outdoor apparel brand, "Nothface" — jackets, hoodies, t-shirts, bags, and accessories, priced in INR. Built with React, Vite, and React Router. All data (cart, wishlist, accounts, orders) is stored in the browser's `localStorage` — there is no backend and no real payments are processed.

## Features

- Product catalog with category filters and search (`/products`)
- Product detail pages with size/quantity selection (`/products/:id`)
- Shopping cart with quantity controls and free-shipping threshold (`/cart`)
- Wishlist — heart any product to save it for later (`/wishlist`)
- Dummy authentication with a seeded demo account, plus sign-up (`/login`)
- Account page with simulated order history (`/account`)

## Demo login

```
Email:    demo@nothface.com
Password: Demo@123
```

You can also sign up with a new email — accounts are stored locally in the browser, not on a server.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm (for local development)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (only if you want to run it in a container)

## Run locally (no Docker)

```bash
npm install
npm run dev
```

The app will be available at **http://localhost:5173**.

Other useful scripts:

```bash
npm run build    # production build, output in dist/
npm run preview  # preview the production build locally
npm run lint     # run oxlint
```

## Run with Docker

Build the image from the `webapp/` directory (where the `Dockerfile` lives):

```bash
docker build -t nothface-webapp:latest .
```

Run the container, mapping container port 80 to a host port of your choice (8080 here):

```bash
docker run -d --name nothface-webapp -p 8080:80 nothface-webapp:latest
```

The app will be available at **http://localhost:8080**.

Stop / restart / remove the container:

```bash
docker stop nothface-webapp
docker start nothface-webapp
docker rm -f nothface-webapp
```

## Pull the prebuilt image from Docker Hub

A prebuilt image is published at [`tamilselvansankar/nothface-webapp`](https://hub.docker.com/r/tamilselvansankar/nothface-webapp):

```bash
docker pull tamilselvansankar/nothface-webapp:latest
docker run -d -p 8080:80 tamilselvansankar/nothface-webapp:latest
```

Tagged versions are also available, e.g. `tamilselvansankar/nothface-webapp:v1.0`.

## Project structure

```
webapp/
├─ src/
│  ├─ components/   # Header, Footer, ProductCard
│  ├─ context/       # Auth, Cart, and Wishlist state (localStorage-backed)
│  ├─ data/          # Product catalog
│  ├─ pages/         # Route-level pages (Home, Products, ProductDetail, Cart, Wishlist, Login, Account)
│  └─ utils/         # INR currency formatting, rating stars
├─ Dockerfile         # Multi-stage build: Node (build) -> nginx (serve)
├─ nginx.conf          # SPA fallback so client-side routes work on refresh
└─ vite.config.js
```

## Disclaimer

Nothface is a fictional brand created for this demo project. All prices, products, accounts, and orders are for demonstration purposes only.
