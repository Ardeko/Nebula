import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NebulaGame from "./components/NebulaGame";
import GameUI from "./components/GameUI";
import ScrollableLevelSelect from "./components/ScrollableLevelSelect";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'infinite', 'levelSelect', 'settings', 'achievements'
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameMode, setGameMode] = useState('levels'); // 'levels' or 'infinite'
  const { toast } = useToast();

  const handleStartGame = (level = 1) => {
    setCurrentLevel(level);
    setGameMode('levels');
    setGameState('playing');
  };

  const handleStartInfiniteMode = () => {
    setGameMode('infinite');
    setGameState('infinite');
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

  const handleInfiniteGameOver = (gameData) => {
    const messages = [];
    
    if (gameData.isNewHighScore) {
      messages.push(`New High Score: ${gameData.score.toLocaleString()}! 🏆`);
    } else {
      messages.push(`Final Score: ${gameData.score.toLocaleString()}`);
    }
    
    if (gameData.isNewHighWave) {
      messages.push(`New Best Wave: ${gameData.wave}! 🌊`);
    } else {
      messages.push(`Reached Wave: ${gameData.wave}`);
    }

    toast({
      title: "Infinite Mode Complete! 🌌",
      description: messages.join(' • '),
      duration: 6000,
    });
    
    // Return to menu after infinite mode ends
    setTimeout(() => {
      setGameState('menu');
    }, 3000);
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

  const handleSelectLevel = (levelId) => {
    handleStartGame(levelId);
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
                  onStartInfiniteMode={handleStartInfiniteMode}
                  onLevelSelect={handleLevelSelect}
                  onShowSettings={handleShowSettings}
                  onShowAchievements={handleShowAchievements}
                />
              )}
              
              {(gameState === 'playing' || gameState === 'infinite') && (
                <div className="relative">
                  <NebulaGame
                    currentLevel={currentLevel}
                    gameMode={gameMode}
                    onLevelComplete={handleLevelComplete}
                    onGameOver={handleGameOver}
                    onInfiniteGameOver={handleInfiniteGameOver}
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
                <ScrollableLevelSelect
                  onBackToMenu={handleBackToMenu}
                  onSelectLevel={handleSelectLevel}
                />
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