import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NebulaGame from "./components/NebulaGame";
import GameUI from "./components/GameUI";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'levelSelect', 'settings', 'achievements'
  const [currentLevel, setCurrentLevel] = useState(1);
  const { toast } = useToast();

  const handleStartGame = (level = 1) => {
    setCurrentLevel(level);
    setGameState('playing');
  };

  const handleLevelComplete = (levelData) => {
    toast({
      title: "Level Complete! 🎉",
      description: `You earned ${levelData.stars} stars and scored ${levelData.score} points!`,
      duration: 5000,
    });
    
    // Return to level select after showing completion
    setTimeout(() => {
      setGameState('levelSelect');
    }, 2000);
  };

  const handleGameOver = (gameData) => {
    toast({
      title: "Game Over 💫",
      description: `Better luck next time! Final score: ${gameData.score}`,
      variant: "destructive",
      duration: 4000,
    });
    
    // Return to menu after game over
    setTimeout(() => {
      setGameState('menu');
    }, 2000);
  };

  const handlePause = () => {
    // Pause is handled within the Phaser game
    console.log('Game paused');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const handleLevelSelect = () => {
    setGameState('levelSelect');
  };

  const handleShowSettings = () => {
    setGameState('settings');
    toast({
      title: "Coming Soon! 🔧",
      description: "Settings panel will be available in the next update.",
    });
  };

  const handleShowAchievements = () => {
    setGameState('achievements');
    toast({
      title: "Coming Soon! 🏆",
      description: "Achievement system will be available in the next update.",
    });
  };

  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              {gameState === 'menu' && (
                <GameUI
                  gameState={gameState}
                  onStartGame={handleStartGame}
                  onLevelSelect={handleLevelSelect}
                  onShowSettings={handleShowSettings}
                  onShowAchievements={handleShowAchievements}
                />
              )}
              
              {gameState === 'playing' && (
                <div className="relative">
                  <NebulaGame
                    currentLevel={currentLevel}
                    onLevelComplete={handleLevelComplete}
                    onGameOver={handleGameOver}
                    onPause={handlePause}
                  />
                  {/* Back to menu button overlay */}
                  <button
                    onClick={handleBackToMenu}
                    className="absolute top-4 left-4 z-50 px-4 py-2 bg-black/50 text-white rounded-lg border border-white/30 hover:bg-black/70 transition-colors"
                  >
                    ← Menu
                  </button>
                </div>
              )}
              
              {gameState === 'levelSelect' && (
                <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white p-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      <button
                        onClick={handleBackToMenu}
                        className="px-4 py-2 bg-gray-600/50 text-white rounded-lg border border-gray-400/30 hover:bg-gray-600/70 transition-colors"
                      >
                        ← Back
                      </button>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Select Level
                      </h1>
                      <div></div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[...Array(8)].map((_, index) => {
                        const levelNum = index + 1;
                        const isUnlocked = levelNum <= 3; // Mock: first 3 levels unlocked
                        
                        return (
                          <button
                            key={levelNum}
                            onClick={() => isUnlocked ? handleStartGame(levelNum) : null}
                            disabled={!isUnlocked}
                            className={`
                              aspect-square rounded-xl p-4 border-2 transition-all duration-200
                              ${isUnlocked 
                                ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-blue-400/50 hover:border-blue-400 hover:scale-105' 
                                : 'bg-gray-800/30 border-gray-600/30 cursor-not-allowed'
                              }
                            `}
                          >
                            <div className="text-center">
                              <div className={`text-3xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                {levelNum}
                              </div>
                              <div className="flex justify-center gap-1 mb-2">
                                {[...Array(3)].map((_, i) => (
                                  <span key={i} className="text-sm text-gray-400">⭐</span>
                                ))}
                              </div>
                              <div className={`text-xs ${isUnlocked ? 'text-blue-300' : 'text-gray-500'}`}>
                                {isUnlocked ? 'Ready' : 'Locked'}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              <Toaster />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;