import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GameScene } from '../game/GameScene';
import { MenuScene } from '../game/MenuScene';
import { LevelSelectScene } from '../game/LevelSelectScene';
import { PauseScene } from '../game/PauseScene';

const NebulaGame = ({ currentLevel, onLevelComplete, onGameOver, onPause }) => {
  const gameRef = useRef(null);
  const phaserGameRef = useRef(null);

  useEffect(() => {
    // Phaser game configuration
    const config = {
      type: Phaser.AUTO,
      width: 375, // Mobile portrait width
      height: 667, // Mobile portrait height
      parent: gameRef.current,
      backgroundColor: '#0a0a1a',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [MenuScene, LevelSelectScene, GameScene, PauseScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: gameRef.current,
      },
      input: {
        activePointers: 1,
      }
    };

    // Create Phaser game instance
    phaserGameRef.current = new Phaser.Game(config);

    // Pass React callbacks to Phaser scenes
    phaserGameRef.current.events.on('level-complete', onLevelComplete);
    phaserGameRef.current.events.on('game-over', onGameOver);
    phaserGameRef.current.events.on('pause-game', onPause);

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (phaserGameRef.current && currentLevel) {
      phaserGameRef.current.scene.start('GameScene', { level: currentLevel });
    }
  }, [currentLevel]);

  return (
    <div className="game-container relative w-full h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black overflow-hidden">
      <div ref={gameRef} className="w-full h-full" />
    </div>
  );
};

export default NebulaGame;