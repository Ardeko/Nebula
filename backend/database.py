from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
import os
from models import PlayerProgress, InfiniteScore, PlayerAchievements, Level, LevelProgress
from datetime import datetime

class Database:
    def __init__(self):
        self.client: AsyncIOMotorClient = None
        self.database = None

    async def connect_to_mongo(self):
        """Create database connection"""
        self.client = AsyncIOMotorClient(os.environ['MONGO_URL'])
        self.database = self.client[os.environ['DB_NAME']]

    async def close_mongo_connection(self):
        """Close database connection"""
        if self.client:
            self.client.close()

    async def get_player_progress(self, player_id: str) -> Optional[PlayerProgress]:
        """Get player progress by ID"""
        progress_data = await self.database.player_progress.find_one({"playerId": player_id})
        if progress_data:
            return PlayerProgress(**progress_data)
        return None

    async def create_player_progress(self, player_id: str) -> PlayerProgress:
        """Create new player progress with default values"""
        # Initialize with first 3 levels unlocked
        initial_levels = []
        for i in range(50):
            level_progress = LevelProgress(
                id=i + 1,
                unlocked=i < 3,  # First 3 levels unlocked
                completed=False,
                stars=0,
                bestScore=0
            )
            initial_levels.append(level_progress)

        progress = PlayerProgress(
            playerId=player_id,
            currentLevel=1,
            totalScore=0,
            totalStars=0,
            infiniteHighScore=0,
            infiniteHighWave=0,
            levels=initial_levels
        )
        
        progress_dict = progress.dict()
        await self.database.player_progress.insert_one(progress_dict)
        return progress

    async def update_player_progress(self, player_id: str, progress: PlayerProgress) -> PlayerProgress:
        """Update player progress"""
        progress.updatedAt = datetime.utcnow()
        progress_dict = progress.dict()
        
        await self.database.player_progress.update_one(
            {"playerId": player_id},
            {"$set": progress_dict},
            upsert=True
        )
        return progress

    async def complete_level(self, player_id: str, level_id: int, score: int, stars: int, shots: int) -> PlayerProgress:
        """Complete a level and update progress"""
        progress = await self.get_player_progress(player_id)
        if not progress:
            progress = await self.create_player_progress(player_id)

        # Update level progress
        level_progress = next((l for l in progress.levels if l.id == level_id), None)
        if level_progress:
            level_progress.completed = True
            level_progress.stars = max(level_progress.stars, stars)
            level_progress.bestScore = max(level_progress.bestScore, score)
            level_progress.lastPlayed = datetime.utcnow()

            # Unlock next level
            if level_id < 50:
                next_level = next((l for l in progress.levels if l.id == level_id + 1), None)
                if next_level:
                    next_level.unlocked = True

            # Update totals
            progress.totalScore += score
            progress.totalStars = sum(l.stars for l in progress.levels)
            progress.currentLevel = max(progress.currentLevel, level_id + 1)

        return await self.update_player_progress(player_id, progress)

    async def save_infinite_score(self, player_id: str, score: int, wave: int) -> InfiniteScore:
        """Save infinite mode score"""
        infinite_score = InfiniteScore(
            playerId=player_id,
            score=score,
            wave=wave
        )
        
        score_dict = infinite_score.dict()
        await self.database.infinite_scores.insert_one(score_dict)

        # Update player's high scores
        progress = await self.get_player_progress(player_id)
        if progress:
            if score > progress.infiniteHighScore:
                progress.infiniteHighScore = score
            if wave > progress.infiniteHighWave:
                progress.infiniteHighWave = wave
            await self.update_player_progress(player_id, progress)

        return infinite_score

    async def get_infinite_leaderboard(self, limit: int = 100) -> List[InfiniteScore]:
        """Get top infinite mode scores"""
        cursor = self.database.infinite_scores.find().sort("score", -1).limit(limit)
        scores = []
        async for score_data in cursor:
            scores.append(InfiniteScore(**score_data))
        return scores

    async def get_player_achievements(self, player_id: str) -> Optional[PlayerAchievements]:
        """Get player achievements"""
        achievements_data = await self.database.player_achievements.find_one({"playerId": player_id})
        if achievements_data:
            return PlayerAchievements(**achievements_data)
        return None

    async def update_player_achievements(self, player_id: str, achievements: PlayerAchievements) -> PlayerAchievements:
        """Update player achievements"""
        achievements.updatedAt = datetime.utcnow()
        achievements_dict = achievements.dict()
        
        await self.database.player_achievements.update_one(
            {"playerId": player_id},
            {"$set": achievements_dict},
            upsert=True
        )
        return achievements

# Global database instance
database = Database()