import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { mockLevels, mockAPI } from '../data/mockData';

const ScrollableLevelSelect = ({ onBackToMenu, onSelectLevel }) => {
  const [playerProgress, setPlayerProgress] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const levelsPerPage = 12;
  const totalPages = Math.ceil(mockLevels.length / levelsPerPage);

  useEffect(() => {
    loadPlayerProgress();
  }, []);

  const loadPlayerProgress = async () => {
    try {
      const progress = await mockAPI.getPlayerProgress();
      setPlayerProgress(progress);
    } catch (error) {
      console.error('Failed to load player progress:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'bg-green-500',
      'Medium': 'bg-yellow-500',
      'Hard': 'bg-orange-500',
      'Expert': 'bg-red-500',
      'Legendary': 'bg-purple-500'
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  const getDifficultyTextColor = (difficulty) => {
    const colors = {
      'Easy': 'text-green-300',
      'Medium': 'text-yellow-300',
      'Hard': 'text-orange-300',
      'Expert': 'text-red-300',
      'Legendary': 'text-purple-300'
    };
    return colors[difficulty] || 'text-gray-300';
  };

  const getCurrentPageLevels = () => {
    const startIndex = currentPage * levelsPerPage;
    const endIndex = startIndex + levelsPerPage;
    return mockLevels.slice(startIndex, endIndex);
  };

  if (!playerProgress) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <div className="text-white text-xl">Loading levels...</div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Select Level
          </h1>
          <div className="w-16"></div> {/* Spacer */}
        </div>

        {/* Page indicator */}
        <div className="text-center mb-4">
          <div className="text-lg text-blue-300">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="text-sm text-gray-400">
            Levels {currentPage * levelsPerPage + 1} - {Math.min((currentPage + 1) * levelsPerPage, mockLevels.length)}
          </div>
        </div>

        {/* Levels grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {getCurrentPageLevels().map((level) => {
            const progress = playerProgress.levels.find(l => l.id === level.id);
            const isUnlocked = progress?.unlocked || false;
            const stars = progress?.stars || 0;
            const bestScore = progress?.bestScore || 0;

            return (
              <Card 
                key={level.id} 
                className={`
                  relative overflow-hidden transition-all duration-200 cursor-pointer
                  ${isUnlocked 
                    ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-400/50 hover:border-blue-400 hover:scale-105' 
                    : 'bg-gray-800/30 border-gray-600/30 cursor-not-allowed'
                  }
                `}
                onClick={() => isUnlocked ? onSelectLevel(level.id) : null}
              >
                <CardContent className="p-4 text-center">
                  {/* Level number */}
                  <div className={`text-2xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                    {level.id}
                  </div>
                  
                  {/* Level name */}
                  <div className={`text-xs mb-2 ${isUnlocked ? 'text-blue-200' : 'text-gray-500'}`}>
                    {level.theme}
                  </div>
                  
                  {/* Difficulty badge */}
                  <Badge 
                    className={`text-xs mb-2 ${getDifficultyColor(level.difficulty)} ${isUnlocked ? '' : 'opacity-50'}`}
                  >
                    {level.difficulty}
                  </Badge>
                  
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(3)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-sm ${i < stars ? 'text-yellow-400' : 'text-gray-600'}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  
                  {/* Best score */}
                  {bestScore > 0 && (
                    <div className="text-xs text-gray-300">
                      {bestScore.toLocaleString()}
                    </div>
                  )}
                  
                  {/* Lock indicator */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            variant="outline"
            className="border-blue-400 text-blue-300 hover:bg-blue-400/20 disabled:opacity-50"
          >
            ← Previous
          </Button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                onClick={() => setCurrentPage(i)}
                variant={i === currentPage ? "default" : "outline"}
                size="sm"
                className={i === currentPage ? "bg-blue-600" : "border-gray-400 text-gray-300 hover:bg-gray-400/20"}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            variant="outline"
            className="border-blue-400 text-blue-300 hover:bg-blue-400/20 disabled:opacity-50"
          >
            Next →
          </Button>
        </div>

        {/* Progress summary */}
        <Card className="mt-6 bg-black/30 backdrop-blur-sm border-purple-500/30">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {playerProgress.levels.filter(l => l.completed).length}
                </div>
                <div className="text-sm text-gray-300">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {playerProgress.totalStars}
                </div>
                <div className="text-sm text-gray-300">Total Stars</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {playerProgress.totalScore.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">Total Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {playerProgress.levels.filter(l => l.unlocked).length}
                </div>
                <div className="text-sm text-gray-300">Unlocked</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScrollableLevelSelect;