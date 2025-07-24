import Phaser from 'phaser';
import { mockLevels, mockPlayerProgress } from '../data/mockData';

export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelSelectScene' });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    
    // Background
    this.createBackground();

    // Title
    this.add.text(centerX, 50, 'SELECT LEVEL', {
      fontSize: '32px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    // Back button
    const backButton = this.add.rectangle(50, 50, 80, 40, 0x666666, 0.8);
    backButton.setStrokeStyle(2, 0x888888);
    this.add.text(50, 50, 'BACK', {
      fontSize: '16px',
      fontFamily: 'Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    backButton.setInteractive();
    backButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });

    // Create level grid
    this.createLevelGrid();
  }

  createBackground() {
    // Same cosmic background as menu
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a0a2e, 0x16213e, 0x0f1419, 0x16213e, 1);
    bg.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

    // Add stars
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * this.cameras.main.width;
      const y = Math.random() * this.cameras.main.height;
      const star = this.add.circle(x, y, Math.random() * 2, 0xffffff);
      star.setAlpha(Math.random() * 0.8 + 0.2);
    }
  }

  createLevelGrid() {
    const startY = 120;
    const cols = 3;
    const levelSize = 80;
    const spacing = 100;
    const centerX = this.cameras.main.width / 2;

    mockLevels.forEach((level, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      const x = centerX + (col - 1) * spacing;
      const y = startY + row * spacing;
      
      this.createLevelButton(x, y, level, index + 1);
    });
  }

  createLevelButton(x, y, levelData, levelNumber) {
    const progress = mockPlayerProgress.levels[levelNumber - 1];
    const isUnlocked = progress.unlocked;
    const stars = progress.stars;
    
    // Level circle
    const circle = this.add.circle(x, y, 35, isUnlocked ? 0x4444ff : 0x444444, isUnlocked ? 0.8 : 0.4);
    circle.setStrokeStyle(3, isUnlocked ? 0x6666ff : 0x666666);
    
    // Level number
    this.add.text(x, y - 5, levelNumber.toString(), {
      fontSize: '24px',
      fontFamily: 'Arial',
      fill: isUnlocked ? '#ffffff' : '#888888',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    // Stars
    if (isUnlocked && stars > 0) {
      for (let i = 0; i < 3; i++) {
        const starX = x - 20 + i * 20;
        const starY = y + 20;
        const starColor = i < stars ? 0xffdd00 : 0x444444;
        
        this.add.text(starX, starY, '★', {
          fontSize: '16px',
          fontFamily: 'Arial',
          fill: `#${starColor.toString(16).padStart(6, '0')}`
        }).setOrigin(0.5);
      }
    }

    // Level theme indicator
    const themeColors = {
      'Cosmic Dawn': 0xff6b9d,
      'Solar Winds': 0xffa500,
      'Stellar Forge': 0xff4444,
      'Nebula Heart': 0x9966ff
    };
    
    const themeColor = themeColors[levelData.theme] || 0xffffff;
    const themeIndicator = this.add.circle(x + 25, y - 25, 6, themeColor, 0.8);

    if (isUnlocked) {
      circle.setInteractive();
      circle.on('pointerdown', () => {
        this.startLevel(levelNumber);
      });
      
      // Hover effect
      circle.on('pointerover', () => {
        circle.setScale(1.1);
        this.showLevelInfo(x, y - 70, levelData);
      });
      
      circle.on('pointerout', () => {
        circle.setScale(1);
        this.hideLevelInfo();
      });
    }
  }

  showLevelInfo(x, y, levelData) {
    // Clear previous info
    this.hideLevelInfo();
    
    // Info background
    this.levelInfoBg = this.add.rectangle(x, y, 200, 80, 0x000000, 0.8);
    this.levelInfoBg.setStrokeStyle(2, 0x444444);
    
    // Level info text
    this.levelInfoText = this.add.text(x, y - 15, levelData.theme, {
      fontSize: '16px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);
    
    this.levelDifficultyText = this.add.text(x, y + 5, `Difficulty: ${levelData.difficulty}`, {
      fontSize: '12px',
      fontFamily: 'Arial',
      fill: '#cccccc'
    }).setOrigin(0.5);
    
    this.levelShotsText = this.add.text(x, y + 20, `Max Shots: ${levelData.maxShots}`, {
      fontSize: '12px',
      fontFamily: 'Arial',
      fill: '#cccccc'
    }).setOrigin(0.5);
  }

  hideLevelInfo() {
    if (this.levelInfoBg) {
      this.levelInfoBg.destroy();
      this.levelInfoText.destroy();
      this.levelDifficultyText.destroy();
      this.levelShotsText.destroy();
    }
  }

  startLevel(levelNumber) {
    this.scene.start('GameScene', { level: levelNumber });
  }
}