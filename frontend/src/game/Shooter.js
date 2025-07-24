export class Shooter {
  constructor(scene) {
    this.scene = scene;
    this.x = scene.gameWidth / 2;
    this.y = scene.gameHeight - 80;
    this.currentBubble = null;
    this.nextBubble = null;
    this.aimLine = [];
    this.maxBounces = 3;
    
    this.createShooter();
    this.generateNextBubbles();
  }

  createShooter() {
    // Shooter base
    this.base = this.scene.add.circle(this.x, this.y, 25, 0x333333, 0.8);
    this.base.setStrokeStyle(3, 0x666666);
    
    // Current bubble
    this.currentBubble = this.createBubble();
    this.currentBubble.setPosition(this.x, this.y - 35);
    
    // Next bubble indicator
    this.nextBubble = this.createBubble();
    this.nextBubble.setPosition(this.x + 60, this.y);
    this.nextBubble.setScale(0.7);
    this.nextBubble.setAlpha(0.8);
    
    // Next bubble label
    this.scene.add.text(this.x + 60, this.y + 30, 'Next', {
      fontSize: '12px',
      fontFamily: 'Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);
  }

  createBubble() {
    const types = ['fire', 'water', 'earth', 'air', 'light', 'dark'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const bubble = this.scene.add.image(0, 0, `bubble-${randomType}`);
    bubble.bubbleType = randomType;
    bubble.setInteractive();
    
    return bubble;
  }

  generateNextBubbles() {
    // Generate random bubble types that exist in the grid
    const existingTypes = this.getExistingBubbleTypes();
    
    if (existingTypes.length > 0) {
      const randomType = existingTypes[Math.floor(Math.random() * existingTypes.length)];
      
      if (this.currentBubble) {
        this.currentBubble.setTexture(`bubble-${randomType}`);
        this.currentBubble.bubbleType = randomType;
      }
      
      const nextRandomType = existingTypes[Math.floor(Math.random() * existingTypes.length)];
      if (this.nextBubble) {
        this.nextBubble.setTexture(`bubble-${nextRandomType}`);
        this.nextBubble.bubbleType = nextRandomType;
      }
    }
  }

  getExistingBubbleTypes() {
    const types = new Set();
    const grid = this.scene.bubbleGrid.grid;
    
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col]) {
          types.add(grid[row][col]);
        }
      }
    }
    
    return Array.from(types);
  }

  updateAim(pointer) {
    if (!this.currentBubble) return;
    
    const angle = Phaser.Math.Angle.Between(this.x, this.y - 35, pointer.x, pointer.y);
    
    // Limit angle to prevent shooting backwards
    const minAngle = -2.8; // ~160 degrees
    const maxAngle = -0.3; // ~20 degrees
    const clampedAngle = Phaser.Math.Clamp(angle, minAngle, maxAngle);
    
    // Show aim guide
    this.showAimGuide(clampedAngle);
  }

  showAimGuide(angle) {
    // Clear previous aim guide
    this.clearAimGuide();
    
    // Calculate trajectory with bounces
    const trajectory = this.calculateTrajectory(this.x, this.y - 35, angle);
    
    // Draw aim guide dots
    for (let i = 0; i < trajectory.length; i += 15) {
      if (i < trajectory.length) {
        const dot = this.scene.add.image(trajectory[i].x, trajectory[i].y, 'aim-dot');
        dot.setAlpha(0.7 - (i / trajectory.length) * 0.5);
        this.aimLine.push(dot);
      }
    }
  }

  calculateTrajectory(startX, startY, angle) {
    const trajectory = [];
    let x = startX;
    let y = startY;
    let velocityX = Math.cos(angle) * 300;
    let velocityY = Math.sin(angle) * 300;
    let bounces = 0;
    
    const stepSize = 1;
    const maxSteps = 300;
    
    for (let step = 0; step < maxSteps; step++) {
      x += velocityX * stepSize / 60;
      y += velocityY * stepSize / 60;
      
      // Check wall bounces
      if (x <= 15 || x >= this.scene.gameWidth - 15) {
        velocityX = -velocityX;
        bounces++;
        if (bounces > this.maxBounces) break;
      }
      
      // Check if trajectory would hit a bubble
      const gridPos = this.scene.bubbleGrid.getGridPosition(x, y);
      if (this.scene.bubbleGrid.grid[gridPos.row] && this.scene.bubbleGrid.grid[gridPos.row][gridPos.col]) {
        break;
      }
      
      // Check if reached top
      if (y <= 100) break;
      
      trajectory.push({ x, y });
    }
    
    return trajectory;
  }

  clearAimGuide() {
    this.aimLine.forEach(dot => dot.destroy());
    this.aimLine = [];
  }

  shoot(pointer) {
    if (!this.currentBubble) return;
    
    const angle = Phaser.Math.Angle.Between(this.x, this.y - 35, pointer.x, pointer.y);
    const clampedAngle = Phaser.Math.Clamp(angle, -2.8, -0.3);
    
    // Create projectile
    const projectile = this.scene.add.image(this.x, this.y - 35, this.currentBubble.texture.key);
    projectile.bubbleType = this.currentBubble.bubbleType;
    
    this.scene.physics.add.existing(projectile);
    
    const velocity = 400;
    projectile.body.setVelocity(
      Math.cos(clampedAngle) * velocity,
      Math.sin(clampedAngle) * velocity
    );
    
    projectile.body.setBounce(1, 0);
    projectile.body.setCollideWorldBounds(true, 0, 0, true, false);
    
    // Add to projectiles group if it exists
    if (this.scene.projectiles) {
      this.scene.projectiles.add(projectile);
    }
    
    // Move next bubble to current
    this.currentBubble.destroy();
    this.currentBubble = this.nextBubble;
    this.currentBubble.setPosition(this.x, this.y - 35);
    this.currentBubble.setScale(1);
    this.currentBubble.setAlpha(1);
    
    // Generate new next bubble
    this.nextBubble = this.createBubble();
    this.nextBubble.setPosition(this.x + 60, this.y);
    this.nextBubble.setScale(0.7);
    this.nextBubble.setAlpha(0.8);
    this.generateNextBubbles();
    
    // Clear aim guide
    this.clearAimGuide();
    
    // Add trail effect to projectile
    this.addTrailEffect(projectile);
  }

  addTrailEffect(projectile) {
    const trail = this.scene.add.particles(projectile.x, projectile.y, 'aim-dot', {
      speed: 0,
      scale: { start: 0.5, end: 0 },
      lifespan: 200,
      frequency: 50,
      tint: projectile.bubbleType === 'fire' ? 0xff4444 : 
            projectile.bubbleType === 'water' ? 0x4488ff :
            projectile.bubbleType === 'earth' ? 0x88ff44 :
            projectile.bubbleType === 'air' ? 0xffff44 :
            projectile.bubbleType === 'light' ? 0xffffff : 0x444444
    });
    
    trail.startFollow(projectile);
    
    // Clean up trail when projectile is destroyed
    projectile.on('destroy', () => {
      trail.destroy();
    });
  }
}