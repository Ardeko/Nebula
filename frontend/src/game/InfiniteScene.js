import Phaser from 'phaser';
import { BubbleGrid } from './BubbleGrid';
import { Shooter } from './Shooter';

export class InfiniteScene extends Phaser.Scene {
  constructor() {
    super({ key: 'InfiniteScene' });
    this.bubbleGrid = null;
    this.shooter = null;
    this.score = 0;
    this.wave = 1;
    this.bubblesCleared = 0;
    this.gameWidth = 375;
    this.gameHeight = 667;
    this.dropTimer = null;
    this.dropInterval = 30000; // 30 seconds initially
    this.speedMultiplier = 1;
    this.isGameOver = false;
  }

  init() {
    this.score = 0;
    this.wave = 1;
    this.bubblesCleared = 0;
    this.dropInterval = 30000;
    this.speedMultiplier = 1;
    this.isGameOver = false;
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
    
    // Initialize bubble grid with procedural generation
    this.bubbleGrid = new BubbleGrid(this, 0); // 0 for infinite mode
    this.generateProceduralBubbles();
    
    // Initialize shooter
    this.shooter = new Shooter(this);
    
    // Create UI
    this.createUI();
    
    // Setup input
    this.setupInput();
    
    // Start drop timer
    this.startDropTimer();
  }

  createBackground() {
    // Animated cosmic gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a0a2e, 0x16213e, 0x0f1419, 0x16213e, 1);
    bg.fillRect(0, 0, this.gameWidth, this.gameHeight);
    
    // Add more stars for infinite feel
    for (let i = 0; i < 100; i++) {
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

    // Add moving background elements
    for (let i = 0; i < 10; i++) {
      const particle = this.add.circle(
        Math.random() * this.gameWidth,
        Math.random() * this.gameHeight,
        Math.random() * 3 + 1,
        0x4444ff,
        0.3
      );
      
      this.tweens.add({
        targets: particle,
        y: particle.y + this.gameHeight,
        duration: 20000 + Math.random() * 10000,
        repeat: -1,
        delay: Math.random() * 5000
      });
    }
  }

  generateProceduralBubbles() {
    // Clear existing bubbles
    this.bubbleGrid.clearGrid();
    
    // Generate based on wave difficulty
    const rows = Math.min(4 + Math.floor(this.wave / 3), 8);
    const colors = ['fire', 'water', 'earth', 'air'];
    
    // Add more colors as waves progress
    if (this.wave > 5) colors.push('light');
    if (this.wave > 10) colors.push('dark');
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < 10; col++) {
        // Procedural generation with some randomness
        if (Math.random() < 0.7 - (row * 0.1)) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          this.bubbleGrid.createBubble(row, col, color);
        }
      }
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

    // Wave display
    this.waveText = this.add.text(20, 60, `Wave: ${this.wave}`, {
      fontSize: '18px',
      fontFamily: 'Arial',
      fill: '#00ffaa'
    });

    // Speed indicator
    this.speedText = this.add.text(20, 85, `Speed: ${this.speedMultiplier.toFixed(1)}x`, {
      fontSize: '16px',
      fontFamily: 'Arial',
      fill: '#ffaa00'
    });

    // High score display
    const highScore = parseInt(localStorage.getItem('nebula-infinite-high-score') || '0');
    this.add.text(this.gameWidth - 20, 30, `Best: ${highScore.toLocaleString()}`, {
      fontSize: '16px',
      fontFamily: 'Arial',
      fill: '#ff88ff'
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

    // Drop warning indicator
    this.dropWarning = this.add.rectangle(this.gameWidth / 2, 110, this.gameWidth - 40, 30, 0xff4444, 0);
    this.dropWarningText = this.add.text(this.gameWidth / 2, 110, '', {
      fontSize: '14px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);
  }

  setupInput() {
    this.input.on('pointerdown', (pointer) => {
      if (this.shooter && !this.isGameOver) {
        this.shooter.shoot(pointer);
      }
    });

    this.input.on('pointermove', (pointer) => {
      if (this.shooter && !this.isGameOver) {
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
      this.updateScore(matches.length * 100 * this.speedMultiplier);
      this.bubblesCleared += matches.length;
      
      // Check for floating bubbles
      const floating = this.bubbleGrid.findFloatingBubbles();
      if (floating.length > 0) {
        this.removeFloatingBubbles(floating);
        this.updateScore(floating.length * 50 * this.speedMultiplier);
        this.bubblesCleared += floating.length;
      }
    }
    
    // Check for wave completion
    this.checkWaveComplete();
    
    // Check game over
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
    this.updateUI();
  }

  updateUI() {
    this.scoreText.setText(`Score: ${this.score.toLocaleString()}`);
    this.waveText.setText(`Wave: ${this.wave}`);
    this.speedText.setText(`Speed: ${this.speedMultiplier.toFixed(1)}x`);
  }

  checkWaveComplete() {
    if (this.bubbleGrid.isEmpty()) {
      this.nextWave();
    }
  }

  nextWave() {
    this.wave++;
    this.speedMultiplier = Math.min(1 + (this.wave - 1) * 0.1, 3.0);
    this.dropInterval = Math.max(10000, 30000 - (this.wave - 1) * 1000);
    
    // Bonus points for wave completion
    this.updateScore(1000 * this.wave);
    
    // Generate new wave
    this.generateProceduralBubbles();
    
    // Update drop timer
    this.restartDropTimer();
    
    // Show wave complete notification
    this.showWaveComplete();
  }

  showWaveComplete() {
    const waveText = this.add.text(this.gameWidth / 2, this.gameHeight / 2, `WAVE ${this.wave} COMPLETE!`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      fill: '#00ff00',
      fontWeight: 'bold'
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: waveText,
      alpha: 0,
      y: waveText.y - 50,
      duration: 2000,
      onComplete: () => waveText.destroy()
    });
  }

  startDropTimer() {
    this.dropTimer = this.time.addEvent({
      delay: this.dropInterval,
      callback: this.dropNewRow,
      callbackScope: this,
      loop: true
    });
  }

  restartDropTimer() {
    if (this.dropTimer) {
      this.dropTimer.destroy();
    }
    this.startDropTimer();
  }

  dropNewRow() {
    if (this.isGameOver) return;
    
    // Show warning first
    this.showDropWarning();
    
    // Drop new row after warning
    this.time.delayedCall(3000, () => {
      this.bubbleGrid.dropNewRow();
      this.hideDropWarning();
      
      if (this.bubbleGrid.reachedBottom()) {
        this.gameOver();
      }
    });
  }

  showDropWarning() {
    this.dropWarning.setAlpha(0.8);
    this.dropWarningText.setText('⚠️ NEW ROW INCOMING! ⚠️');
    
    // Pulsing effect
    this.tweens.add({
      targets: this.dropWarning,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      repeat: 5
    });
  }

  hideDropWarning() {
    this.dropWarning.setAlpha(0);
    this.dropWarningText.setText('');
  }

  checkGameState() {
    // Check if bubbles reached bottom
    if (this.bubbleGrid.reachedBottom()) {
      this.gameOver();
      return;
    }
  }

  gameOver() {
    this.isGameOver = true;
    
    // Stop drop timer
    if (this.dropTimer) {
      this.dropTimer.destroy();
    }
    
    // Save high score
    const currentHighScore = parseInt(localStorage.getItem('nebula-infinite-high-score') || '0');
    const currentHighWave = parseInt(localStorage.getItem('nebula-infinite-high-wave') || '0');
    
    if (this.score > currentHighScore) {
      localStorage.setItem('nebula-infinite-high-score', this.score.toString());
    }
    
    if (this.wave > currentHighWave) {
      localStorage.setItem('nebula-infinite-high-wave', this.wave.toString());
    }
    
    this.game.events.emit('infinite-game-over', {
      score: this.score,
      wave: this.wave,
      isNewHighScore: this.score > currentHighScore,
      isNewHighWave: this.wave > currentHighWave
    });
  }
}