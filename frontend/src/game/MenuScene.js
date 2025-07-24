import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Background
    this.createBackground();

    // Game title
    this.add.text(centerX, centerY - 200, 'NEBULA', {
      fontSize: '48px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(centerX, centerY - 150, 'Cosmic Bubble Shooter', {
      fontSize: '20px',
      fontFamily: 'Arial',
      fill: '#aaaaff',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    // Play button
    const playButton = this.add.rectangle(centerX, centerY - 50, 200, 60, 0x4444ff, 0.8);
    playButton.setStrokeStyle(2, 0x6666ff);
    this.add.text(centerX, centerY - 50, 'PLAY', {
      fontSize: '24px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    playButton.setInteractive();
    playButton.on('pointerdown', () => {
      this.scene.start('LevelSelectScene');
    });

    // Level Select button
    const levelButton = this.add.rectangle(centerX, centerY + 30, 200, 50, 0x44ff44, 0.8);
    levelButton.setStrokeStyle(2, 0x66ff66);
    this.add.text(centerX, centerY + 30, 'LEVEL SELECT', {
      fontSize: '18px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    levelButton.setInteractive();
    levelButton.on('pointerdown', () => {
      this.scene.start('LevelSelectScene');
    });

    // Settings button
    const settingsButton = this.add.rectangle(centerX, centerY + 100, 200, 50, 0xff4444, 0.8);
    settingsButton.setStrokeStyle(2, 0xff6666);
    this.add.text(centerX, centerY + 100, 'SETTINGS', {
      fontSize: '18px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    settingsButton.setInteractive();
    settingsButton.on('pointerdown', () => {
      // TODO: Implement settings scene
      console.log('Settings clicked');
    });

    // Instructions
    this.add.text(centerX, centerY + 180, 'Match 3 or more bubbles of the same element\nto restore cosmic balance!', {
      fontSize: '14px',
      fontFamily: 'Arial',
      fill: '#cccccc',
      align: 'center'
    }).setOrigin(0.5);

    // Add floating bubbles animation
    this.createFloatingBubbles();
  }

  createBackground() {
    // Cosmic gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a0a2e, 0x16213e, 0x0f1419, 0x16213e, 1);
    bg.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

    // Add stars
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * this.cameras.main.width;
      const y = Math.random() * this.cameras.main.height;
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

  createFloatingBubbles() {
    const colors = ['fire', 'water', 'earth', 'air', 'light', 'dark'];
    
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * this.cameras.main.width;
      const y = Math.random() * this.cameras.main.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Create colored circle for floating bubble
      const bubble = this.add.circle(x, y, 15, this.getColorValue(color), 0.3);
      
      // Floating animation
      this.tweens.add({
        targets: bubble,
        y: bubble.y - 50,
        duration: 3000 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      
      this.tweens.add({
        targets: bubble,
        x: bubble.x + (Math.random() - 0.5) * 100,
        duration: 4000 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  getColorValue(color) {
    const colorMap = {
      fire: 0xff4444,
      water: 0x4488ff,
      earth: 0x88ff44,
      air: 0xffff44,
      light: 0xffffff,
      dark: 0x444444
    };
    return colorMap[color] || 0xffffff;
  }
}