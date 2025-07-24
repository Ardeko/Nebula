import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useGameData } from '../hooks/useGameData';

const AchievementsView = ({ onBackToMenu }) => {
  const { achievements, loading } = useGameData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <div className="text-white text-xl">Loading achievements...</div>
      </div>
    );
  }

  if (!achievements || !achievements.achievements) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <div className="text-center text-white">
          <div className="text-xl mb-4">No achievements data available</div>
          <Button onClick={onBackToMenu}>Back to Menu</Button>
        </div>
      </div>
    );
  }

  const totalAchievements = achievements.achievements.length;
  const unlockedCount = achievements.achievements.filter(a => a.unlocked).length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="border-gray-400 text-gray-300 hover:bg-gray-400/20"
          >
            ← Back
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Achievements
          </h1>
          <div className="w-16"></div>
        </div>

        {/* Progress Summary */}
        <Card className="mb-6 bg-black/30 backdrop-blur-sm border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Cosmic Accomplishments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {unlockedCount}
                </div>
                <div className="text-sm text-gray-300">Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400">
                  {totalAchievements}
                </div>
                <div className="text-sm text-gray-300">Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {completionPercentage}%
                </div>
                <div className="text-sm text-gray-300">Complete</div>
              </div>
            </div>
            <Progress 
              value={completionPercentage} 
              className="h-3"
            />
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid gap-4">
          {achievements.achievements.map((achievement) => (
            <Card 
              key={achievement.id}
              className={`
                transition-all duration-200
                ${achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/50' 
                  : 'bg-gray-800/30 border-gray-600/30'
                }
              `}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Achievement Icon */}
                  <div className={`
                    text-4xl p-3 rounded-full
                    ${achievement.unlocked 
                      ? 'bg-yellow-500/20 text-yellow-400' 
                      : 'bg-gray-600/20 text-gray-500'
                    }
                  `}>
                    {achievement.icon}
                  </div>
                  
                  {/* Achievement Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-bold ${
                        achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                      }`}>
                        {achievement.name}
                      </h3>
                      {achievement.unlocked && (
                        <Badge className="bg-yellow-500 text-black">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      achievement.unlocked ? 'text-gray-200' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar for Incomplete Achievements */}
                    {!achievement.unlocked && achievement.target > 1 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.target}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {/* Unlock Date */}
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="text-xs text-gray-400 mt-2">
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400">
          <p className="text-sm">
            Keep playing to unlock more cosmic achievements! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementsView;