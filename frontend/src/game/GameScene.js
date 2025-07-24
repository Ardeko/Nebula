import Phaser from 'phaser';
import { BubbleGrid } from './BubbleGrid';
import { Shooter } from './Shooter';
import { mockLevels } from '../data/mockData';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.bubbleGrid = null;
    this.shooter = null;
    this.currentLevel = 1;
    this.score = 0;
    this.shots = 0;
    this.maxShots = 50;
    this.gameWidth = 375;
    this.gameHeight = 667;
  }

  init(data) {
    this.currentLevel = data.level || 1;
    this.score = 0;
    this.shots = 0;
    this.maxShots = mockLevels[this.currentLevel - 1]?.maxShots || 50;
  }

  preload() {
    // Create colored bubble graphics
    this.createBubbleGraphics();
    
    // Create power-up graphics
    this.createPowerUpGraphics();
    
    // Create UI graphics
    this.createUIGraphics();
  }

  createBubbleGraphics() {
    const colors = ['fire', 'water', 'earth', 'air', 'light', 'dark'];
    const colorMap = {
      fire: 0xff4444,
      water: 0x4488ff,
      earth: 0x88ff44,
      air: 0xffff44,
      light: 0xffffff,
      dark: 0x444444
    };

    colors.forEach(color => {
      const graphics = this.add.graphics();
      graphics.fillStyle(colorMap[color]);
      graphics.fillCircle(15, 15, 15);
      graphics.lineStyle(2, 0xffffff, 0.3);
      graphics.strokeCircle(15, 15, 15);
      graphics.generateTexture(`bubble-${color}`, 30, 30);
      graphics.destroy();
    });
  }

  createPowerUpGraphics() {
    // Nova Bomb
    const nova = this.add.graphics();
    nova.fillStyle(0xff8800);
    nova.fillCircle(15, 15, 15);
    nova.fillStyle(0xffaa00);
    nova.fillCircle(15, 15, 10);
    nova.generateTexture('power-nova', 30, 30);
    nova.destroy();

    // Chain Lightning
    const chain = this.add.graphics();
    chain.fillStyle(0x00ffff);
    chain.fillCircle(15, 15, 15);
    chain.lineStyle(2, 0xffffff);
    chain.beginPath();
    chain.moveTo(5, 15);
    chain.lineTo(25, 15);
    chain.strokePath();
    chain.generateTexture('power-chain', 30, 30);
    chain.destroy();

    // Time Freeze
    const freeze = this.add.graphics();
    freeze.fillStyle(0x88ccff);
    freeze.fillCircle(15, 15, 15);
    freeze.fillStyle(0xffffff);
    freeze.fillCircle(15, 15, 8);
    freeze.generateTexture('power-freeze', 30, 30);
    freeze.destroy();
  }

  createUIGraphics() {
    // Aim guide dot
    const aimDot = this.add.graphics();
    aimDot.fillStyle(0xffffff);
    aimDot.fillCircle(2, 2, 2);
    aimDot.generateTexture('aim-dot', 4, 4);
    aimDot.destroy();
  }

  create() {
    // Create cosmic background
    this.createBackground();
    
    // Setup physics groups first
    this.setupPhysics();
    
    // Initialize bubble grid
    this.bubbleGrid = new BubbleGrid(this, this.currentLevel);
    
    // Initialize shooter
    this.shooter = new Shooter(this);
    
    // Create UI
    this.createUI();
    
    // Setup input
    this.setupInput();
  }

  createBackground() {
    // Cosmic gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a0a2e, 0x16213e, 0x0f1419, 0x16213e, 1);
    bg.fillRect(0, 0, this.gameWidth, this.gameHeight);
    
    // Add stars
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * this.gameWidth;
      const y = Math.random() * this.gameHeight;
      const star = this.add.circle(x, y, Math.random() * 2, 0xffffff);
      star.setAlpha(Math.random() * 0.8 + 0.2);
      
      // Twinkling animation
      this.tweens.add({
        targets: star,
        alpha: Math.random() * 0.3,
        duration: 2000 + Math.random() * 3000,
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2000
      });
    }
  }

  createUI() {
    // Score display
    this.scoreText = this.add.text(20, 30, `Score: ${this.score}`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    });

    // Shots remaining
    this.shotsText = this.add.text(20, 60, `Shots: ${this.maxShots - this.shots}`, {
      fontSize: '18px',
      fontFamily: 'Arial',
      fill: '#ffaa00'
    });

    // Level display
    this.levelText = this.add.text(this.gameWidth - 20, 30, `Level ${this.currentLevel}`, {
      fontSize: '18px',
      fontFamily: 'Arial',
      fill: '#00ffaa'
    }).setOrigin(1, 0);

    // Pause button
    this.pauseButton = this.add.circle(this.gameWidth - 30, 70, 20, 0x333333, 0.7);
    this.add.text(this.gameWidth - 30, 70, '||', {
      fontSize: '16px',
      fontFamily: 'Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);
    
    this.pauseButton.setInteractive();
    this.pauseButton.on('pointerdown', () => {
      this.scene.pause();
      this.scene.launch('PauseScene');
    });
  }

  setupInput() {
    this.input.on('pointerdown', (pointer) => {
      if (this.shooter && this.shots < this.maxShots) {
        this.shooter.shoot(pointer);
      }
    });

    this.input.on('pointermove', (pointer) => {
      if (this.shooter) {
        this.shooter.updateAim(pointer);
      }
    });
  }

  setupPhysics() {
    this.bubbles = this.add.group();
    this.projectiles = this.add.group();
    
    this.physics.add.overlap(this.projectiles, this.bubbles, (projectile, bubble) => {
      this.handleBubbleCollision(projectile, bubble);
    });
  }

  handleBubbleCollision(projectile, bubble) {
    projectile.destroy();
    
    // Find position to place new bubble
    const gridPos = this.bubbleGrid.getGridPosition(bubble.x, bubble.y);
    
    // Place bubble in grid
    this.bubbleGrid.placeBubble(gridPos.row, gridPos.col, projectile.bubbleType);
    
    // Check for matches
    const matches = this.bubbleGrid.findMatches(gridPos.row, gridPos.col);
    
    if (matches.length >= 3) {
      this.removeMatches(matches);
      this.updateScore(matches.length * 100);
      
      // Check for floating bubbles
      const floating = this.bubbleGrid.findFloatingBubbles();
      if (floating.length > 0) {
        this.removeFloatingBubbles(floating);
        this.updateScore(floating.length * 50);
      }
    }
    
    this.shots++;
    this.updateUI();
    
    // Check win/lose conditions
    this.checkGameState();
  }

  removeMatches(matches) {
    matches.forEach(pos => {
      const bubble = this.bubbleGrid.getBubble(pos.row, pos.col);
      if (bubble) {
        // Particle effect
        this.createExplosion(bubble.x, bubble.y, bubble.bubbleType);
        bubble.destroy();
        this.bubbleGrid.removeBubble(pos.row, pos.col);
      }
    });
  }

  removeFloatingBubbles(floating) {
    floating.forEach(pos => {
      const bubble = this.bubbleGrid.getBubble(pos.row, pos.col);
      if (bubble) {
        // Falling animation
        this.tweens.add({
          targets: bubble,
          y: this.gameHeight + 100,
          duration: 800,
          ease: 'Power2',
          onComplete: () => {
            bubble.destroy();
          }
        });
        this.bubbleGrid.removeBubble(pos.row, pos.col);
      }
    });
  }

  createExplosion(x, y, type) {
    const colors = {
      fire: [0xff4444, 0xff8844],
      water: [0x4488ff, 0x88ccff],
      earth: [0x88ff44, 0xccff88],
      air: [0xffff44, 0xffff88],
      light: [0xffffff, 0xcccccc],
      dark: [0x444444, 0x888888]
    };

    const particles = this.add.particles(x, y, 'aim-dot', {
      speed: { min: 50, max: 150 },
      scale: { start: 1, end: 0 },
      lifespan: 500,
      tint: colors[type] || [0xffffff],
      quantity: 8
    });

    this.time.delayedCall(500, () => particles.destroy());
  }

  updateScore(points) {
    this.score += points;
  }

  updateUI() {
    this.scoreText.setText(`Score: ${this.score}`);
    this.shotsText.setText(`Shots: ${this.maxShots - this.shots}`);
  }

  checkGameState() {
    // Check win condition
    if (this.bubbleGrid.isEmpty()) {
      this.levelComplete();
      return;
    }
    
    // Check lose condition
    if (this.shots >= this.maxShots) {
      this.gameOver();
      return;
    }
    
    // Check if bubbles reached bottom
    if (this.bubbleGrid.reachedBottom()) {
      this.gameOver();
      return;
    }
  }

  levelComplete() {
    // Calculate stars based on performance
    const efficiency = (this.maxShots - this.shots) / this.maxShots;
    let stars = 1;
    if (efficiency > 0.5) stars = 2;
    if (efficiency > 0.8) stars = 3;
    
    this.game.events.emit('level-complete', {
      level: this.currentLevel,
      score: this.score,
      stars: stars
    });
  }

  gameOver() {
    this.game.events.emit('game-over', {
      level: this.currentLevel,
      score: this.score
    });
  }
}