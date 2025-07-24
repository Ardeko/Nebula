import { useState, useEffect, useCallback } from 'react';
import { gameAPI } from '../services/api';
import { useToast } from './use-toast';

export const useGameData = () => {
  const [playerProgress, setPlayerProgress] = useState(null);
  const [levels, setLevels] = useState([]);
  const [achievements, setAchievements] = useState(null);
  const [infiniteStats, setInfiniteStats] = useState({ highScore: 0, highWave: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Load initial data
  const loadGameData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all game data in parallel
      const [progressData, levelsData, achievementsData] = await Promise.all([
        gameAPI.getPlayerProgress(),
        gameAPI.getLevels(),
        gameAPI.getPlayerAchievements().catch(() => null) // Achievements might not exist yet
      ]);

      setPlayerProgress(progressData);
      setLevels(levelsData);
      setAchievements(achievementsData);
      
      // Set infinite stats
      setInfiniteStats({
        highScore: progressData.infiniteHighScore || 0,
        highWave: progressData.infiniteHighWave || 0
      });

      // Sync any local data
      await gameAPI.syncLocalData();

    } catch (err) {
      console.error('Failed to load game data:', err);
      setError(err.message);
      toast({
        title: "Connection Error",
        description: "Failed to load game data. Playing in offline mode.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Complete a level
  const completeLevel = useCallback(async (levelId, score, stars, shots) => {
    try {
      const updatedProgress = await gameAPI.completeLevel(levelId, score, stars, shots);
      setPlayerProgress(updatedProgress);
      
      // Update achievements
      const updatedAchievements = await gameAPI.getPlayerAchievements();
      setAchievements(updatedAchievements);
      
      return updatedProgress;
    } catch (err) {
      console.error('Failed to complete level:', err);
      toast({
        title: "Save Error",
        description: "Failed to save level progress.",
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  // Save infinite score
  const saveInfiniteScore = useCallback(async (score, wave) => {
    try {
      await gameAPI.saveInfiniteScore(score, wave);
      
      // Update local stats
      setInfiniteStats(prev => ({
        highScore: Math.max(prev.highScore, score),
        highWave: Math.max(prev.highWave, wave)
      }));
      
      // Update local storage
      if (score > gameAPI.getLocalInfiniteHighScore()) {
        gameAPI.setLocalInfiniteHighScore(score);
      }
      if (wave > gameAPI.getLocalInfiniteHighWave()) {
        gameAPI.setLocalInfiniteHighWave(wave);
      }
      
      // Refresh player progress
      const updatedProgress = await gameAPI.getPlayerProgress();
      setPlayerProgress(updatedProgress);
      
      // Update achievements
      const updatedAchievements = await gameAPI.getPlayerAchievements();
      setAchievements(updatedAchievements);
      
    } catch (err) {
      console.error('Failed to save infinite score:', err);
      toast({
        title: "Save Error",
        description: "Failed to save infinite mode score.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Refresh data
  const refreshData = useCallback(async () => {
    await loadGameData();
  }, [loadGameData]);

  // Get level by ID
  const getLevelById = useCallback((levelId) => {
    return levels.find(level => level.id === levelId);
  }, [levels]);

  // Get unlocked achievements
  const getUnlockedAchievements = useCallback(() => {
    if (!achievements) return [];
    return achievements.achievements.filter(ach => ach.unlocked);
  }, [achievements]);

  // Check if player has new achievements
  const checkNewAchievements = useCallback((previousAchievements) => {
    if (!achievements || !previousAchievements) return [];
    
    const newlyUnlocked = achievements.achievements.filter(current => {
      const previous = previousAchievements.achievements.find(prev => prev.id === current.id);
      return current.unlocked && (!previous || !previous.unlocked);
    });
    
    return newlyUnlocked;
  }, [achievements]);

  // Load data on mount
  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  return {
    // Data
    playerProgress,
    levels,
    achievements,
    infiniteStats,
    loading,
    error,
    
    // Actions
    completeLevel,
    saveInfiniteScore,
    refreshData,
    
    // Helpers
    getLevelById,
    getUnlockedAchievements,
    checkNewAchievements,
    
    // User info
    userId: gameAPI.getUserId()
  };
};