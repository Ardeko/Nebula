from typing import List, Dict, Any
from .models import Achievement, PlayerAchievements, PlayerProgress
from .database import database
from datetime import datetime

# Default achievements
DEFAULT_ACHIEVEMENTS = [
    {
        "id": "first-steps",
        "name": "First Steps",
        "description": "Complete your first level",
        "icon": "🌟",
        "target": 1
    },
    {
        "id": "rising-star",
        "name": "Rising Star",
        "description": "Complete 5 levels",
        "icon": "⭐",
        "target": 5
    },
    {
        "id": "cosmic-explorer",
        "name": "Cosmic Explorer",
        "description": "Complete 10 levels",
        "icon": "🚀",
        "target": 10
    },
    {
        "id": "nebula-master",
        "name": "Nebula Master",
        "description": "Complete 25 levels",
        "icon": "🌌",
        "target": 25
    },
    {
        "id": "transcendent",
        "name": "Transcendent",
        "description": "Complete all 50 levels",
        "icon": "✨",
        "target": 50
    },
    {
        "id": "perfect-shot",
        "name": "Perfect Shot",
        "description": "Complete a level with 3 stars",
        "icon": "🎯",
        "target": 1
    },
    {
        "id": "star-collector",
        "name": "Star Collector",
        "description": "Earn 50 stars total",
        "icon": "⭐",
        "target": 50
    },
    {
        "id": "cosmic-perfectionist",
        "name": "Cosmic Perfectionist",
        "description": "Earn 100 stars total",
        "icon": "💫",
        "target": 100
    },
    {
        "id": "high-scorer",
        "name": "High Scorer",
        "description": "Score 50,000 points in a single level",
        "icon": "💯",
        "target": 50000
    },
    {
        "id": "infinite-warrior",
        "name": "Infinite Warrior",
        "description": "Reach wave 10 in Infinite mode",
        "icon": "⚔️",
        "target": 10
    },
    {
        "id": "endless-champion",
        "name": "Endless Champion",
        "description": "Score 100,000 points in Infinite mode",
        "icon": "🏆",
        "target": 100000
    },
    {
        "id": "bubble-destroyer",
        "name": "Bubble Destroyer",
        "description": "Pop 1000 bubbles total",
        "icon": "💥",
        "target": 1000
    }
]

async def get_or_create_achievements(player_id: str) -> PlayerAchievements:
    """Get player achievements or create default ones"""
    achievements = await database.get_player_achievements(player_id)
    
    if not achievements:
        # Create default achievements
        default_achievements = []
        for ach_data in DEFAULT_ACHIEVEMENTS:
            achievement = Achievement(**ach_data)
            default_achievements.append(achievement)
        
        achievements = PlayerAchievements(
            playerId=player_id,
            achievements=default_achievements
        )
        await database.update_player_achievements(player_id, achievements)
    
    return achievements

async def check_level_achievements(player_id: str, progress: PlayerProgress, level_data: Dict[str, Any]) -> List[Achievement]:
    """Check and unlock level-related achievements"""
    achievements = await get_or_create_achievements(player_id)
    unlocked = []
    
    completed_levels = len([l for l in progress.levels if l.completed])
    total_stars = progress.totalStars
    
    for achievement in achievements.achievements:
        if achievement.unlocked:
            continue
            
        # Level completion achievements
        if achievement.id == "first-steps" and completed_levels >= 1:
            achievement.unlocked = True
            achievement.progress = completed_levels
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        elif achievement.id == "rising-star" and completed_levels >= 5:
            achievement.unlocked = True
            achievement.progress = completed_levels
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        elif achievement.id == "cosmic-explorer" and completed_levels >= 10:
            achievement.unlocked = True
            achievement.progress = completed_levels
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        elif achievement.id == "nebula-master" and completed_levels >= 25:
            achievement.unlocked = True
            achievement.progress = completed_levels
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        elif achievement.id == "transcendent" and completed_levels >= 50:
            achievement.unlocked = True
            achievement.progress = completed_levels
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        # Star achievements
        elif achievement.id == "perfect-shot" and level_data.get("stars", 0) == 3:
            achievement.unlocked = True
            achievement.progress = 1
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        elif achievement.id == "star-collector" and total_stars >= 50:
            achievement.unlocked = True
            achievement.progress = total_stars
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        elif achievement.id == "cosmic-perfectionist" and total_stars >= 100:
            achievement.unlocked = True
            achievement.progress = total_stars
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        # Score achievements
        elif achievement.id == "high-scorer" and level_data.get("score", 0) >= 50000:
            achievement.unlocked = True
            achievement.progress = level_data.get("score", 0)
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
    
    if unlocked:
        await database.update_player_achievements(player_id, achievements)
    
    return unlocked

async def check_infinite_achievements(player_id: str, score: int, wave: int) -> List[Achievement]:
    """Check and unlock infinite mode achievements"""
    achievements = await get_or_create_achievements(player_id)
    unlocked = []
    
    for achievement in achievements.achievements:
        if achievement.unlocked:
            continue
        
        if achievement.id == "infinite-warrior" and wave >= 10:
            achievement.unlocked = True
            achievement.progress = wave
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
        
        elif achievement.id == "endless-champion" and score >= 100000:
            achievement.unlocked = True
            achievement.progress = score
            achievement.unlockedAt = datetime.utcnow()
            unlocked.append(achievement)
    
    if unlocked:
        await database.update_player_achievements(player_id, achievements)
    
    return unlocked