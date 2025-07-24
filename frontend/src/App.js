import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NebulaGame from "./components/NebulaGame";
import GameUI from "./components/GameUI";
import ScrollableLevelSelect from "./components/ScrollableLevelSelect";
import AchievementsView from "./components/AchievementsView";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import { useGameData } from "./hooks/useGameData";

function App() {
  const [gameState, setGameState] = useState("menu");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameMode, setGameMode] = useState("levels");
  const { toast } = useToast();
  const { completeLevel, saveInfiniteScore, checkNewAchievements } = useGameData();

  const handleStartGame = (level = 1) => {
    setCurrentLevel(level);
    setGameMode("levels");
    setGameState("playing");
  };

  const handleStartInfiniteMode = () => {
    setGameMode("infinite");
    setGameState("infinite");
  };

  const handleLevelComplete = async (levelData) => {
    try {
      const previousAchievements = await completeLevel(
        levelData.level,
        levelData.score,
        levelData.stars,
        50 - (levelData.shots || 0)
      );

      toast({
        title: "Level Complete! 🎉",
        description: `You earned ${levelData.stars} stars and scored ${levelData.score.toLocaleString()} points!`,
        duration: 5000,
      });

      const newAchievements = checkNewAchievements(previousAchievements);
      if (newAchievements.length > 0) {
        setTimeout(() => {
          newAchievements.forEach((achievement) => {
            toast({
              title: "Achievement Unlocked! 🏆",
              description: `${achievement.icon} ${achievement.name}: ${achievement.description}`,
              duration: 6000,
            });
          });
        }, 2000);
      }

      setTimeout(() => {
        setGameState("levelSelect");
      }, 3000);
    } catch (error) {
      console.error("Failed to complete level:", error);
      toast({
        title: "Save Error",
        description: "Failed to save progress, but you can continue playing!",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleGameOver = (gameData) => {
    toast({
      title: "Game Over 💫",
      description: `Better luck next time! Final score: ${gameData.score.toLocaleString()}`,
      variant: "destructive",
      duration: 4000,
    });

    setTimeout(() => {
      setGameState("menu");
    }, 2000);
  };

  const handleInfiniteGameOver = async (gameData) => {
    try {
      await saveInfiniteScore(gameData.score, gameData.wave);

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
        description: messages.join(" • "),
        duration: 6000,
      });
    } catch (error) {
      console.error("Failed to save infinite score:", error);
      toast({
        title: "Game Complete! 🌌",
        description: `Score: ${gameData.score.toLocaleString()} • Wave: ${gameData.wave}`,
        duration: 6000,
      });
    }

    setTimeout(() => {
      setGameState("menu");
    }, 3000);
  };

  const handlePause = () => {
    console.log("Game paused");
  };

  const handleBackToMenu = () => {
    setGameState("menu");
  };

  const handleLevelSelect = () => {
    setGameState("levelSelect");
  };

  const handleSelectLevel = (levelId) => {
    handleStartGame(levelId);
  };

  const handleShowSettings = () => {
    setGameState("settings");
    toast({
      title: "Coming Soon! 🔧",
      description: "Settings panel will be available in the next update.",
    });

    setTimeout(() => {
      setGameState("menu");
    }, 2000);
  };

  const handleShowAchievements = () => {
    setGameState("achievements");
  };

  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {gameState === "menu" && (
                  <GameUI
                    gameState={gameState}
                    onStartGame={handleStartGame}
                    onStartInfiniteMode={handleStartInfiniteMode}
                    onLevelSelect={handleLevelSelect}
                    onShowSettings={handleShowSettings}
                    onShowAchievements={handleShowAchievements}
                  />
                )}

                {(gameState === "playing" || gameState === "infinite") && (
                  <div className="relative">
                    <NebulaGame
                      currentLevel={currentLevel}
                      gameMode={gameMode}
                      onLevelComplete={handleLevelComplete}
                      onGameOver={handleGameOver}
                      onInfiniteGameOver={handleInfiniteGameOver}
                      onPause={handlePause}
                    />
                    <button
                      onClick={handleBackToMenu}
                      className="absolute top-4 left-4 z-50 px-4 py-2 bg-black/50 text-white rounded-lg border border-white/30 hover:bg-black/70 transition-colors"
                    >
                      ← Menu
                    </button>
                  </div>
                )}

                {gameState === "levelSelect" && (
                  <ScrollableLevelSelect
                    onBackToMenu={handleBackToMenu}
                    onSelectLevel={handleSelectLevel}
                  />
                )}

                {gameState === "achievements" && (
                  <AchievementsView onBackToMenu={handleBackToMenu} />
                )}

                <Toaster />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
