import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Semi-transparent overlay
    this.add.rectangle(centerX, centerY, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7);

    // Pause menu background
    const menuBg = this.add.rectangle(centerX, centerY, 280, 350, 0x1a1a2e, 0.95);
    menuBg.setStrokeStyle(3, 0x4444ff);

    // Pause title
    this.add.text(centerX, centerY - 120, 'PAUSED', {
      fontSize: '32px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    // Resume button
    const resumeButton = this.add.rectangle(centerX, centerY - 50, 200, 50, 0x44ff44, 0.8);
    resumeButton.setStrokeStyle(2, 0x66ff66);
    this.add.text(centerX, centerY - 50, 'RESUME', {
      fontSize: '20px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    resumeButton.setInteractive();
    resumeButton.on('pointerdown', () => {
      this.scene.resume('GameScene');
      this.scene.stop();
    });

    // Restart button
    const restartButton = this.add.rectangle(centerX, centerY + 10, 200, 50, 0xff8844, 0.8);
    restartButton.setStrokeStyle(2, 0xffaa66);
    this.add.text(centerX, centerY + 10, 'RESTART', {
      fontSize: '20px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    restartButton.setInteractive();
    restartButton.on('pointerdown', () => {
      this.scene.stop('GameScene');
      this.scene.start('GameScene', { level: this.getCurrentLevel() });
      this.scene.stop();
    });

    // Main menu button
    const menuButton = this.add.rectangle(centerX, centerY + 70, 200, 50, 0xff4444, 0.8);
    menuButton.setStrokeStyle(2, 0xff6666);
    this.add.text(centerX, centerY + 70, 'MAIN MENU', {
      fontSize: '20px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    menuButton.setInteractive();
    menuButton.on('pointerdown', () => {
      this.scene.stop('GameScene');
      this.scene.start('MenuScene');
      this.scene.stop();
    });

    // Settings toggle
    const settingsButton = this.add.rectangle(centerX, centerY + 130, 150, 40, 0x666666, 0.8);
    settingsButton.setStrokeStyle(2, 0x888888);
    this.add.text(centerX, centerY + 130, 'SETTINGS', {
      fontSize: '16px',
      fontFamily: 'Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    settingsButton.setInteractive();
    settingsButton.on('pointerdown', () => {
      // TODO: Implement settings
      console.log('Settings clicked');
    });
  }

  getCurrentLevel() {
    // Get current level from game scene
    const gameScene = this.scene.get('GameScene');
    return gameScene ? gameScene.currentLevel : 1;
  }
}