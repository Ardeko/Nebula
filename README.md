# 🌌 NEBULA - Cosmic Bubble Shooter Game

A modern, mobile-first bubble shooter game with 50 unique levels and infinite mode. Built with React, Phaser 3, FastAPI, and MongoDB.

![Nebula Game](https://img.shields.io/badge/Game-Nebula-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=flat-square)
![Phaser](https://img.shields.io/badge/Phaser-3.90-orange?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-darkgreen?style=flat-square)

## 🚀 Features

### 🎮 Game Modes
- **50 Unique Levels**: From "Cosmic Dawn" to "Transcendence" with increasing difficulty
- **Infinite Mode**: Endless procedurally generated bubble challenges
- **Progressive Difficulty**: Easy → Medium → Hard → Expert → Legendary
- **Star Rating System**: 1-3 stars based on performance

### 🌟 Core Gameplay
- **Bubble Shooter Mechanics**: Match 3+ bubbles to clear them
- **6 Elemental Types**: Fire, Water, Earth, Air, Light, Dark
- **5 Power-ups**: Nova Bomb, Chain Lightning, Time Freeze, Mirror Shot, Gravity Switch
- **Physics-based**: Realistic bubble dropping and bouncing
- **Aim Guide**: Trajectory prediction with bounce indicators

### 📱 Mobile-First Design
- **Touch Controls**: Optimized for mobile gameplay
- **Responsive UI**: Works on all screen sizes
- **Portrait Mode**: Optimized for mobile devices
- **APK Ready**: Exportable via Capacitor

### 🏆 Progression System
- **Player Tracking**: Unique UUID-based progress tracking
- **Achievement System**: 12 cosmic achievements to unlock
- **High Scores**: Local and cloud-based score tracking
- **Level Unlocking**: Complete levels to unlock new challenges

### 🛠 Technical Stack
- **Frontend**: React 19 + Phaser 3 + Tailwind CSS
- **Backend**: FastAPI + MongoDB + Motor (async)
- **Deployment**: Docker + Supervisor
- **Mobile Export**: Capacitor for Android APK

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB 6+
- Docker (optional)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export MONGO_URL="mongodb://localhost:27017"
export DB_NAME="nebula_game"

# Start the server
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Set environment variables
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start the development server
yarn start
```

### 3. Database Setup

MongoDB will automatically create collections on first use. No manual setup required!

## 🎮 How to Play

### Campaign Mode (50 Levels)
1. **Aim**: Touch and drag to aim your bubble
2. **Shoot**: Release to fire the bubble
3. **Match**: Connect 3+ same-colored bubbles to clear them
4. **Clear**: Remove all bubbles to complete the level
5. **Stars**: Earn 1-3 stars based on efficiency

### Infinite Mode
1. **Survive**: Clear bubbles before they reach the bottom
2. **Waves**: Complete waves to increase difficulty
3. **Drop Timer**: New rows drop every 30 seconds (faster each wave)
4. **High Score**: Beat your personal best!

### Power-ups
- **💥 Nova Bomb**: Destroys all bubbles in a large radius
- **⚡ Chain Lightning**: Connects same-color bubbles in sequence
- **❄️ Time Freeze**: Stops bubble drop for 10 seconds
- **🔮 Mirror Shot**: Extra reflections off walls
- **🌀 Gravity Switch**: Temporarily inverts bubble gravity

## 📊 API Endpoints

### Levels
- `GET /api/levels` - Get all 50 levels
- `GET /api/levels/{id}` - Get specific level

### Player Progress
- `GET /api/progress/{player_id}` - Get player progress
- `POST /api/progress/{player_id}` - Update progress
- `POST /api/progress/{player_id}/complete-level` - Complete a level

### Infinite Mode
- `GET /api/infinite/highscores` - Get leaderboard
- `POST /api/infinite/highscores/{player_id}` - Save score

### Achievements
- `GET /api/achievements/{player_id}` - Get player achievements

## 🏗 Project Structure

```
nebula-game/
├── frontend/                 # React + Phaser frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── game/           # Phaser game scenes
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API client
│   │   └── data/           # Mock data (for fallback)
│   └── public/
├── backend/                 # FastAPI backend
│   ├── models.py           # Pydantic models
│   ├── database.py         # MongoDB operations
│   ├── achievements.py     # Achievement system
│   └── server.py           # FastAPI server
└── README.md
```

## 🚀 Building for Production

### Web Deployment
```bash
# Frontend
cd frontend
yarn build

# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```

### Android APK Export
```bash
# Install Capacitor
cd frontend
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor
npx cap init

# Build and sync
yarn build
npx cap sync

# Open Android Studio
npx cap open android
```

## 🎨 Game Design

### Visual Theme
- **Cosmic Setting**: Space backgrounds with twinkling stars
- **Gradient Palettes**: Purple, blue, and pink cosmic gradients
- **Particle Effects**: Explosions, trails, and ambient particles
- **Smooth Animations**: 60fps gameplay with Phaser 3

### Level Themes
1. **Beginner (1-10)**: Cosmic Dawn, Solar Winds, Stellar Forge...
2. **Intermediate (11-25)**: Solar Nexus, Photon Storm, Gravity Well...
3. **Advanced (26-40)**: Binary Stars, Ion Tempest, Galactic Core...
4. **Master (41-50)**: Alpha Genesis, Omega Terminus, Transcendence...

### Difficulty Progression
- **Shot Limits**: 50 shots (Level 1) → 15 shots (Level 50)
- **Target Scores**: 5,000 → 100,000 points
- **Bubble Patterns**: Simple → Complex arrangements
- **Power-up Availability**: Gradual introduction

## 🏆 Achievement System

Unlock 12 cosmic achievements:
- 🌟 **First Steps**: Complete your first level
- ⭐ **Rising Star**: Complete 5 levels
- 🚀 **Cosmic Explorer**: Complete 10 levels
- 🌌 **Nebula Master**: Complete 25 levels
- ✨ **Transcendent**: Complete all 50 levels
- 🎯 **Perfect Shot**: Complete a level with 3 stars
- ⭐ **Star Collector**: Earn 50 stars total
- 💫 **Cosmic Perfectionist**: Earn 100 stars total
- 💯 **High Scorer**: Score 50,000 points in a single level
- ⚔️ **Infinite Warrior**: Reach wave 10 in Infinite mode
- 🏆 **Endless Champion**: Score 100,000 points in Infinite mode
- 💥 **Bubble Destroyer**: Pop 1000 bubbles total

## 🔧 Development

### Available Scripts

**Frontend:**
- `yarn start` - Development server
- `yarn build` - Production build
- `yarn test` - Run tests

**Backend:**
- `uvicorn server:app --reload` - Development server
- `python -m pytest` - Run tests

### Environment Variables

**Frontend (.env):**
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Backend (.env):**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=nebula_game
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check MongoDB is running
   - Verify environment variables
   - Check port 8001 availability

2. **Frontend API errors**
   - Verify REACT_APP_BACKEND_URL is correct
   - Check backend is running on port 8001
   - Look at browser network tab for CORS errors

3. **Mobile touch not working**
   - Ensure game is running in mobile viewport
   - Check touch event handlers in Phaser scenes

4. **Progress not saving**
   - Check MongoDB connection
   - Verify API endpoints are accessible
   - Check browser console for errors

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Phaser 3** - Amazing HTML5 game framework
- **React** - Frontend framework
- **FastAPI** - Modern Python web framework
- **MongoDB** - Document database
- **Tailwind CSS** - Utility-first CSS framework

---

**Ready to explore the cosmic void? Launch Nebula and restore balance to the universe! 🌌**