# 🌌 NEBULA - Cosmic Bubble Shooter Game

Welcome to **Nebula**, a personal project I've designed and developed end-to-end. It's a modern, mobile-first bubble shooter game that brings together creativity, physics, and a cosmic vibe. Built using **React**, **Phaser 3**, **FastAPI**, and **MongoDB**.

> Developed by **Arda Güner** (a.k.a. **Ardo**) 🚀

![Nebula Game](https://img.shields.io/badge/Game-Nebula-purple?style=for-the-badge)

## 🚀 Features

### 🎮 Game Modes

* 50 handcrafted levels (from *Cosmic Dawn* to *Transcendence*)
* Infinite procedurally generated mode
* Dynamic difficulty curve: Easy → Legendary
* 3-star rating based on precision

### 🌟 Gameplay Mechanics

* Match 3+ bubble shooter mechanics
* 6 cosmic elements: Fire, Water, Earth, Air, Light, Dark
* 5 unique power-ups (coded by yours truly)
* Physics-based logic for collisions and drops
* Built-in aim guide with bounce prediction

### 📱 Mobile-First

* Touch-optimized input
* Fully responsive
* Portrait-first design
* APK-ready using Capacitor

### 🏆 Progression System

* Local + cloud-based player progress
* UUID-based tracking
* Achievements system (12 unlockables)
* High scores and leaderboard support

### 💪 Tech Stack

* Frontend: React 19 + Phaser 3 + Tailwind
* Backend: FastAPI + MongoDB (async via Motor)
* Mobile Export: Capacitor

## 🌟 Quick Setup

### Requirements

* Node.js 18+
* Python 3.9+
* MongoDB 6+
* Docker (optional)

### 1. Backend

```bash
cd backend
pip install -r requirements.txt

# Environment vars
export MONGO_URL="mongodb://localhost:27017"
export DB_NAME="nebula_game"

# Run
uvicorn server:app --reload --port 8001
```

### 2. Frontend

```bash
cd frontend
yarn install
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env
yarn start
```

### 3. Database

No setup needed. Mongo creates everything on-demand.

---

## 🎮 How to Play

### Campaign

* Drag to aim
* Release to shoot
* Match same colors to pop
* Clear all to win the level

### Infinite Mode

* Waves drop every 30s
* Score as high as you can
* Game over if they reach the bottom

### Power-ups

* 💥 Nova Bomb
* ⚡ Chain Lightning
* ❄️ Time Freeze
* 🔮 Mirror Shot
* 🌀 Gravity Switch

---

## 📊 API Endpoints

### Levels

* `GET /api/levels`
* `GET /api/levels/{id}`

### Player

* `GET /api/progress/{player_id}`
* `POST /api/progress/{player_id}`
* `POST /api/progress/{player_id}/complete-level`

### Infinite

* `GET /api/infinite/highscores`
* `POST /api/infinite/highscores/{player_id}`

### Achievements

* `GET /api/achievements/{player_id}`

---

## 🏐 Project Structure

```
nebula/
├── frontend/     # React + Phaser
├── backend/      # FastAPI + MongoDB
├── README.md     # You're here
```

---

## 🚀 Production Build

### Web

```bash
cd frontend
yarn build

cd backend
pip install -r requirements.txt
uvicorn server:app --port 8001
```

### Android APK

```bash
cd frontend
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
yarn build
npx cap sync
npx cap open android
```

---

## 🎨 Design

### Themes

* Cosmic backgrounds
* Purple-blue-pink gradients
* Particle FX and smooth 60fps

### Level Difficulty

* Levels 1-10: Beginner
* 11-25: Intermediate
* 26-40: Advanced
* 41-50: Master

---

## 🏅 Achievements

* ⭐ First Steps
* ✨ Transcendent
* 🌌 Nebula Master
* 💪 Infinite Warrior
* 🔥 Bubble Destroyer
  ... (and 7 more)

---

## 🔧 Dev Scripts

**Frontend**

* `yarn start`
* `yarn build`
* `yarn test`

**Backend**

* `uvicorn server:app --reload`
* `python -m pytest`

**Env Vars**

```
# frontend/.env
REACT_APP_BACKEND_URL=http://localhost:8001

# backend
MONGO_URL=mongodb://localhost:27017
DB_NAME=nebula_game
```

---

## 🚫 Common Issues

1. **Mongo connection fails** → Ensure it's running
2. **404s in frontend** → Backend URL in `.env`?
3. **CORS errors** → Check browser devtools
4. **APK build fails** → Sync Capacitor correctly

---

## 🖊️ License

MIT

---

This game is a passion project coded by me, Ardo – combining frontend, backend, and game dev skills into one cosmic experience.

Let the stars guide your aim ✨
