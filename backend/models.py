from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class Level(BaseModel):
    id: int
    theme: str
    difficulty: str
    maxShots: int
    targetScore: int
    description: str
    elements: List[str]
    powerUps: List[str]
    background: str

class LevelProgress(BaseModel):
    id: int
    unlocked: bool = False
    completed: bool = False
    stars: int = 0
    bestScore: int = 0
    lastPlayed: Optional[datetime] = None

class PlayerProgress(BaseModel):
    playerId: str = Field(default_factory=lambda: str(uuid.uuid4()))
    currentLevel: int = 1
    totalScore: int = 0
    totalStars: int = 0
    infiniteHighScore: int = 0
    infiniteHighWave: int = 0
    levels: List[LevelProgress] = []
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class InfiniteScore(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    playerId: str
    score: int
    wave: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Achievement(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    unlocked: bool = False
    progress: int = 0
    target: int
    unlockedAt: Optional[datetime] = None

class PlayerAchievements(BaseModel):
    playerId: str
    achievements: List[Achievement] = []
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class LevelCompleteRequest(BaseModel):
    levelId: int
    score: int
    stars: int
    shots: int

class InfiniteScoreRequest(BaseModel):
    score: int
    wave: int

class ProgressUpdateRequest(BaseModel):
    currentLevel: Optional[int] = None
    totalScore: Optional[int] = None
    totalStars: Optional[int] = None
    levels: Optional[List[LevelProgress]] = None