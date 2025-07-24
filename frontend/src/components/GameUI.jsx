import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockAPI } from '../data/mockData';

const GameUI = ({ 
  gameState, 
  onStartGame, 
  onStartInfiniteMode,
  onLevelSelect, 
  onShowSettings, 
  onShowAchievements 
}) => {
  const [playerProgress, setPlayerProgress] = useState(null);
  const [infiniteStats, setInfiniteStats] = useState({ highScore: 0, highWave: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayerProgress();
    loadInfiniteStats();
  }, []);

  const loadPlayerProgress = async () => {
    try {
      const progress = await mockAPI.getPlayerProgress();
      setPlayerProgress(progress);
    } catch (error) {
      console.error('Failed to load player progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInfiniteStats = () => {
    const highScore = parseInt(localStorage.getItem('nebula-infinite-high-score') || '0');
    const highWave = parseInt(localStorage.getItem('nebula-infinite-high-wave') || '0');
    setInfiniteStats({ highScore, highWave });
  };

  const handleLevelComplete = async (levelData) => {
    try {
      const updatedProgress = await mockAPI.completeLevel(
        levelData.level, 
        levelData.score, 
        levelData.stars
      );
      setPlayerProgress(updatedProgress);
      
      // Check for achievements
      await mockAPI.checkAchievements('level-complete', levelData);
    } catch (error) {
      console.error('Failed to save level completion:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <div className="text-white text-xl">Loading Nebula...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            NEBULA
          </h1>
          <p className="text-xl text-blue-200 italic">Cosmic Bubble Shooter</p>
        </div>

        {/* Player Stats */}
        <Card className="mb-6 bg-black/30 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Celestial Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {playerProgress?.currentLevel || 1}
                </div>
                <div className="text-sm text-gray-300">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {playerProgress?.totalScore || 0}
                </div>
                <div className="text-sm text-gray-300">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {playerProgress?.totalStars || 0}
                </div>
                <div className="text-sm text-gray-300">Stars Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {playerProgress?.levels?.filter(l => l.completed).length || 0}
                </div>
                <div className="text-sm text-gray-300">Levels Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Menu Buttons */}
        <div className="grid gap-4 max-w-md mx-auto">
          <Button
            onClick={() => onStartGame(playerProgress?.currentLevel || 1)}
            size="lg"
            className="h-16 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            🚀 START GAME
          </Button>

          <Button
            onClick={onStartInfiniteMode}
            size="lg"
            className="h-16 text-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
          >
            ∞ INFINITE COSMOS
          </Button>

          <Button
            onClick={onLevelSelect}
            variant="outline"
            size="lg"
            className="h-12 border-blue-400 text-blue-300 hover:bg-blue-400/20"
          >
            🌟 LEVEL SELECT
          </Button>

          <Button
            onClick={onShowAchievements}
            variant="outline"
            size="lg"
            className="h-12 border-purple-400 text-purple-300 hover:bg-purple-400/20"
          >
            🏆 ACHIEVEMENTS
          </Button>

          <Button
            onClick={onShowSettings}
            variant="outline"
            size="lg"
            className="h-12 border-gray-400 text-gray-300 hover:bg-gray-400/20"
          >
            ⚙️ SETTINGS
          </Button>
        </div>

        {/* Infinite Mode Stats */}
        {(infiniteStats.highScore > 0 || infiniteStats.highWave > 0) && (
          <Card className="mt-6 bg-black/30 backdrop-blur-sm border-pink-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Infinite Cosmos Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-pink-400">
                    {infiniteStats.highScore.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">High Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {infiniteStats.highWave}
                  </div>
                  <div className="text-sm text-gray-300">Best Wave</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Level Progress Preview */}
        <Card className="mt-6 bg-black/30 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Recent Conquests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {playerProgress?.levels?.slice(0, 4).map((level, index) => (
                <div key={level.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={level.unlocked ? "default" : "secondary"}
                      className={level.unlocked ? "bg-blue-600" : "bg-gray-600"}
                    >
                      Level {level.id}
                    </Badge>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-lg ${i < level.stars ? 'text-yellow-400' : 'text-gray-600'}`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {level.bestScore.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Best Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Power-ups Preview */}
        <Card className="mt-6 bg-black/30 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Cosmic Powers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="text-center p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                <div className="text-2xl mb-1">💥</div>
                <div className="text-xs text-orange-300">Nova Bomb</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs text-cyan-300">Chain Lightning</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <div className="text-2xl mb-1">❄️</div>
                <div className="text-xs text-blue-300">Time Freeze</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                <div className="text-2xl mb-1">🔮</div>
                <div className="text-xs text-purple-300">Mirror Shot</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-pink-500/20 border border-pink-500/30">
                <div className="text-2xl mb-1">🌀</div>
                <div className="text-xs text-pink-300">Gravity Switch</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameUI;