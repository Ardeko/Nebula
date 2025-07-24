from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from typing import List, Optional

from .models import (
    PlayerProgress, InfiniteScore, PlayerAchievements, Level,
    LevelCompleteRequest, InfiniteScoreRequest, ProgressUpdateRequest
)
from .database import database
from .achievements import check_level_achievements, check_infinite_achievements, get_or_create_achievements

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Nebula Game API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Game levels data
GAME_LEVELS = [
    # Beginner Levels (1-10)
    {"id": 1, "theme": "Cosmic Dawn", "difficulty": "Easy", "maxShots": 50, "targetScore": 5000, "description": "Welcome to the cosmos! Learn the basics of elemental harmony.", "elements": ["fire", "water"], "powerUps": [], "background": "cosmic-dawn"},
    {"id": 2, "theme": "Solar Winds", "difficulty": "Easy", "maxShots": 48, "targetScore": 6000, "description": "Harness the power of solar winds with earth and air elements.", "elements": ["earth", "air", "fire", "water"], "powerUps": [], "background": "solar-winds"},
    {"id": 3, "theme": "Stellar Forge", "difficulty": "Easy", "maxShots": 45, "targetScore": 7500, "description": "The stellar forge creates new elements. Master light and dark.", "elements": ["fire", "water", "earth", "air", "light"], "powerUps": ["nova-bomb"], "background": "stellar-forge"},
    {"id": 4, "theme": "Plasma Garden", "difficulty": "Easy", "maxShots": 43, "targetScore": 8500, "description": "Navigate through the beautiful plasma formations.", "elements": ["fire", "water", "earth", "air"], "powerUps": ["nova-bomb"], "background": "plasma-garden"},
    {"id": 5, "theme": "Meteor Shower", "difficulty": "Easy", "maxShots": 40, "targetScore": 9500, "description": "Dodge cosmic debris while maintaining elemental balance.", "elements": ["fire", "water", "earth", "air", "light"], "powerUps": ["nova-bomb"], "background": "meteor-shower"},
    {"id": 6, "theme": "Aurora Fields", "difficulty": "Easy", "maxShots": 38, "targetScore": 10500, "description": "Dance through the cosmic aurora with grace.", "elements": ["fire", "water", "earth", "air", "light"], "powerUps": ["nova-bomb", "chain-lightning"], "background": "aurora-fields"},
    {"id": 7, "theme": "Nebula Heart", "difficulty": "Easy", "maxShots": 36, "targetScore": 11500, "description": "The heart of the nebula pulses with all elemental forces.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning"], "background": "nebula-heart"},
    {"id": 8, "theme": "Comet Trail", "difficulty": "Easy", "maxShots": 35, "targetScore": 12500, "description": "Follow the comet's path through the void.", "elements": ["fire", "water", "earth", "air", "light"], "powerUps": ["nova-bomb", "chain-lightning"], "background": "comet-trail"},
    {"id": 9, "theme": "Quantum Echo", "difficulty": "Easy", "maxShots": 33, "targetScore": 13500, "description": "Reality bends as quantum forces interfere.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning"], "background": "quantum-echo"},
    {"id": 10, "theme": "Crystal Void", "difficulty": "Easy", "maxShots": 32, "targetScore": 14500, "description": "Navigate the crystalline structures of deep space.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning"], "background": "crystal-void"},
    
    # Intermediate Levels (11-25)
    {"id": 11, "theme": "Solar Nexus", "difficulty": "Medium", "maxShots": 30, "targetScore": 15500, "description": "Where multiple solar systems converge.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze"], "background": "solar-nexus"},
    {"id": 12, "theme": "Photon Storm", "difficulty": "Medium", "maxShots": 29, "targetScore": 16500, "description": "Survive the intense photon bombardment.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze"], "background": "photon-storm"},
    {"id": 13, "theme": "Gravity Well", "difficulty": "Medium", "maxShots": 28, "targetScore": 17500, "description": "Escape the pull of a massive gravity well.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze"], "background": "gravity-well"},
    {"id": 14, "theme": "Stardust Maze", "difficulty": "Medium", "maxShots": 27, "targetScore": 18500, "description": "Find your way through the cosmic maze.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze"], "background": "stardust-maze"},
    {"id": 15, "theme": "Pulsar Rhythm", "difficulty": "Medium", "maxShots": 26, "targetScore": 19500, "description": "Match the rhythm of the spinning pulsar.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze"], "background": "pulsar-rhythm"},
    {"id": 16, "theme": "Dark Matter", "difficulty": "Medium", "maxShots": 25, "targetScore": 20500, "description": "Confront the mysterious dark matter clouds.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze"], "background": "dark-matter"},
    {"id": 17, "theme": "Wormhole Gate", "difficulty": "Medium", "maxShots": 24, "targetScore": 21500, "description": "Stabilize the wormhole for safe passage.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "wormhole-gate"},
    {"id": 18, "theme": "Asteroid Belt", "difficulty": "Medium", "maxShots": 23, "targetScore": 22500, "description": "Navigate the treacherous asteroid field.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "asteroid-belt"},
    {"id": 19, "theme": "Helios Flare", "difficulty": "Medium", "maxShots": 22, "targetScore": 23500, "description": "Withstand the intense solar flare.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "helios-flare"},
    {"id": 20, "theme": "Void Rift", "difficulty": "Medium", "maxShots": 21, "targetScore": 24500, "description": "A dangerous rift in space-time challenges your mastery.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "void-rift"},
    {"id": 21, "theme": "Gamma Burst", "difficulty": "Medium", "maxShots": 20, "targetScore": 25500, "description": "Survive the devastating gamma ray burst.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "gamma-burst"},
    {"id": 22, "theme": "Quasar Echo", "difficulty": "Medium", "maxShots": 19, "targetScore": 26500, "description": "The quasar's energy reverberates through space.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "quasar-echo"},
    {"id": 23, "theme": "Magnetosphere", "difficulty": "Medium", "maxShots": 18, "targetScore": 27500, "description": "Navigate the planet's magnetic field.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "magnetosphere"},
    {"id": 24, "theme": "Solar Corona", "difficulty": "Medium", "maxShots": 17, "targetScore": 28500, "description": "Brave the star's blazing corona.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "solar-corona"},
    {"id": 25, "theme": "Cosmic Web", "difficulty": "Medium", "maxShots": 16, "targetScore": 29500, "description": "Traverse the universe's largest structures.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot"], "background": "cosmic-web"},
    
    # Advanced Levels (26-40)
    {"id": 26, "theme": "Binary Stars", "difficulty": "Hard", "maxShots": 15, "targetScore": 30500, "description": "Balance the forces of twin stars.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "binary-stars"},
    {"id": 27, "theme": "Ion Tempest", "difficulty": "Hard", "maxShots": 14, "targetScore": 31500, "description": "Weather the chaotic ion storm.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "ion-tempest"},
    {"id": 28, "theme": "Galactic Core", "difficulty": "Hard", "maxShots": 13, "targetScore": 32500, "description": "The galactic core tests your ultimate skills.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "galactic-core"},
    {"id": 29, "theme": "Neutron Dance", "difficulty": "Hard", "maxShots": 12, "targetScore": 33500, "description": "Dance with the dense neutron star.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "neutron-dance"},
    {"id": 30, "theme": "Plasma Vortex", "difficulty": "Hard", "maxShots": 11, "targetScore": 34500, "description": "Escape the swirling plasma vortex.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "plasma-vortex"},
    {"id": 31, "theme": "Stellar Nursery", "difficulty": "Hard", "maxShots": 10, "targetScore": 35500, "description": "Witness the birth of new stars.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "stellar-nursery"},
    {"id": 32, "theme": "Dimension Tear", "difficulty": "Hard", "maxShots": 9, "targetScore": 36500, "description": "Reality fractures at the dimension's edge.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "dimension-tear"},
    {"id": 33, "theme": "Time Spiral", "difficulty": "Hard", "maxShots": 8, "targetScore": 37500, "description": "Navigate the twisted streams of time.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "time-spiral"},
    {"id": 34, "theme": "Antimatter Zone", "difficulty": "Hard", "maxShots": 7, "targetScore": 38500, "description": "Survive the deadly antimatter field.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "antimatter-zone"},
    {"id": 35, "theme": "Supernova", "difficulty": "Hard", "maxShots": 6, "targetScore": 39500, "description": "A dying star creates chaos in the elemental balance.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "supernova"},
    {"id": 36, "theme": "Quantum Foam", "difficulty": "Hard", "maxShots": 5, "targetScore": 40500, "description": "Reality bubbles at the quantum level.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "quantum-foam"},
    {"id": 37, "theme": "Cosmic String", "difficulty": "Hard", "maxShots": 4, "targetScore": 41500, "description": "Navigate the one-dimensional cosmic defect.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "cosmic-string"},
    {"id": 38, "theme": "Event Horizon", "difficulty": "Hard", "maxShots": 3, "targetScore": 42500, "description": "Approach the point of no return.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "event-horizon"},
    {"id": 39, "theme": "Vacuum Decay", "difficulty": "Hard", "maxShots": 2, "targetScore": 43500, "description": "The universe itself begins to unravel.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "vacuum-decay"},
    {"id": 40, "theme": "Multiverse Gate", "difficulty": "Hard", "maxShots": 1, "targetScore": 44500, "description": "Gateway to infinite possibilities.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "multiverse-gate"},
    
    # Master Levels (41-50)
    {"id": 41, "theme": "Alpha Genesis", "difficulty": "Expert", "maxShots": 25, "targetScore": 50000, "description": "Return to the beginning of everything.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "alpha-genesis"},
    {"id": 42, "theme": "Omega Terminus", "difficulty": "Expert", "maxShots": 24, "targetScore": 52500, "description": "Witness the end of all things.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "omega-terminus"},
    {"id": 43, "theme": "Eternal Cycle", "difficulty": "Expert", "maxShots": 23, "targetScore": 55000, "description": "The universe begins anew.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "eternal-cycle"},
    {"id": 44, "theme": "Perfect Void", "difficulty": "Expert", "maxShots": 22, "targetScore": 57500, "description": "Absolute nothingness challenges everything.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "perfect-void"},
    {"id": 45, "theme": "Infinite Loop", "difficulty": "Expert", "maxShots": 21, "targetScore": 60000, "description": "Trapped in an endless recursion.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "infinite-loop"},
    {"id": 46, "theme": "Singularity Core", "difficulty": "Expert", "maxShots": 20, "targetScore": 62500, "description": "The heart of a black hole awaits.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "singularity-core"},
    {"id": 47, "theme": "Reality Engine", "difficulty": "Expert", "maxShots": 19, "targetScore": 65000, "description": "The machine that creates universes.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "reality-engine"},
    {"id": 48, "theme": "Consciousness Web", "difficulty": "Expert", "maxShots": 18, "targetScore": 67500, "description": "Where all minds connect as one.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "consciousness-web"},
    {"id": 49, "theme": "Final Paradox", "difficulty": "Expert", "maxShots": 17, "targetScore": 70000, "description": "Logic itself becomes impossible.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "final-paradox"},
    {"id": 50, "theme": "Transcendence", "difficulty": "Legendary", "maxShots": 15, "targetScore": 100000, "description": "Beyond mastery lies transcendence itself.", "elements": ["fire", "water", "earth", "air", "light", "dark"], "powerUps": ["nova-bomb", "chain-lightning", "time-freeze", "mirror-shot", "gravity-switch"], "background": "transcendence"}
]

@api_router.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Nebula Game API is running", "version": "1.0.0"}

@api_router.get("/levels", response_model=List[Level])
async def get_levels():
    """Get all game levels"""
    return [Level(**level) for level in GAME_LEVELS]

@api_router.get("/levels/{level_id}", response_model=Level)
async def get_level(level_id: int):
    """Get specific level by ID"""
    level_data = next((level for level in GAME_LEVELS if level["id"] == level_id), None)
    if not level_data:
        raise HTTPException(status_code=404, detail="Level not found")
    return Level(**level_data)

@api_router.get("/progress/{player_id}", response_model=PlayerProgress)
async def get_player_progress(player_id: str):
    """Get player progress"""
    progress = await database.get_player_progress(player_id)
    if not progress:
        progress = await database.create_player_progress(player_id)
    return progress

@api_router.post("/progress/{player_id}", response_model=PlayerProgress)
async def update_progress(player_id: str, update_data: ProgressUpdateRequest):
    """Update player progress"""
    progress = await database.get_player_progress(player_id)
    if not progress:
        progress = await database.create_player_progress(player_id)
    
    # Update provided fields
    if update_data.currentLevel is not None:
        progress.currentLevel = update_data.currentLevel
    if update_data.totalScore is not None:
        progress.totalScore = update_data.totalScore
    if update_data.totalStars is not None:
        progress.totalStars = update_data.totalStars
    if update_data.levels is not None:
        progress.levels = update_data.levels
    
    return await database.update_player_progress(player_id, progress)

@api_router.post("/progress/{player_id}/complete-level", response_model=PlayerProgress)
async def complete_level(player_id: str, level_data: LevelCompleteRequest):
    """Complete a level and update progress"""
    progress = await database.complete_level(
        player_id, 
        level_data.levelId, 
        level_data.score, 
        level_data.stars,
        level_data.shots
    )
    
    # Check achievements
    level_dict = {
        "levelId": level_data.levelId,
        "score": level_data.score,
        "stars": level_data.stars,
        "shots": level_data.shots
    }
    await check_level_achievements(player_id, progress, level_dict)
    
    return progress

@api_router.get("/infinite/highscores", response_model=List[InfiniteScore])
async def get_infinite_highscores(limit: int = 100):
    """Get infinite mode leaderboard"""
    return await database.get_infinite_leaderboard(limit)

@api_router.post("/infinite/highscores/{player_id}", response_model=InfiniteScore)
async def save_infinite_score(player_id: str, score_data: InfiniteScoreRequest):
    """Save infinite mode score"""
    score = await database.save_infinite_score(player_id, score_data.score, score_data.wave)
    
    # Check achievements
    await check_infinite_achievements(player_id, score_data.score, score_data.wave)
    
    return score

@api_router.get("/achievements/{player_id}", response_model=PlayerAchievements)
async def get_player_achievements(player_id: str):
    """Get player achievements"""
    achievements = await get_or_create_achievements(player_id)
    return achievements

# Event handlers
@app.on_event("startup")
async def startup_db_client():
    """Initialize database connection"""
    await database.connect_to_mongo()
    logging.info("Connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection"""
    await database.close_mongo_connection()
    logging.info("Disconnected from MongoDB")

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)