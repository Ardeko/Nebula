export class BubbleGrid {
  constructor(scene, level) {
    this.scene = scene;
    this.rows = 12;
    this.cols = 10;
    this.bubbleSize = 30;
    this.grid = [];
    this.bubbleObjects = [];
    
    // Initialize empty grid
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = [];
      this.bubbleObjects[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = null;
        this.bubbleObjects[row][col] = null;
      }
    }
    
    this.generateLevel(level);
  }

  generateLevel(level) {
    if (level === 0) {
      // Infinite mode - don't generate initial pattern
      return;
    }

    const patterns = {
      1: [
        ['fire', 'water', 'fire', 'water', 'fire', 'water', 'fire', 'water', 'fire', 'water'],
        ['water', 'fire', 'water', 'fire', 'water', 'fire', 'water', 'fire', 'water', 'fire'],
        ['fire', 'water', 'fire', 'water', 'fire', 'water', 'fire', 'water', 'fire', 'water'],
        ['water', 'fire', 'water', 'fire', 'water', 'fire', 'water', 'fire', 'water', 'fire'],
      ],
      2: [
        ['earth', 'air', 'earth', 'air', 'earth', 'air', 'earth', 'air', 'earth', 'air'],
        ['air', 'earth', 'air', 'earth', 'air', 'earth', 'air', 'earth', 'air', 'earth'],
        ['earth', 'air', 'fire', 'water', 'fire', 'water', 'fire', 'air', 'earth', 'air'],
        ['air', 'earth', 'water', 'fire', 'water', 'fire', 'water', 'earth', 'air', 'earth'],
      ]
    };

    const pattern = patterns[level] || patterns[1];
    
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (pattern[row][col]) {
          this.createBubble(row, col, pattern[row][col]);
        }
      }
    }
  }

  createBubble(row, col, type) {
    const pos = this.getWorldPosition(row, col);
    const bubble = this.scene.add.image(pos.x, pos.y, `bubble-${type}`);
    bubble.setInteractive();
    bubble.bubbleType = type;
    bubble.gridRow = row;
    bubble.gridCol = col;
    
    this.scene.physics.add.existing(bubble, true); // Static body
    
    this.grid[row][col] = type;
    this.bubbleObjects[row][col] = bubble;
    
    // Add to scene's bubbles group if it exists
    if (this.scene.bubbles) {
      this.scene.bubbles.add(bubble);
    }
    
    return bubble;
  }

  getWorldPosition(row, col) {
    const offsetX = (row % 2) * (this.bubbleSize / 2); // Hex grid offset
    return {
      x: col * this.bubbleSize + this.bubbleSize / 2 + offsetX + 37.5, // Center in 375px width
      y: row * (this.bubbleSize * 0.866) + this.bubbleSize / 2 + 100 // Start below UI
    };
  }

  getGridPosition(worldX, worldY) {
    // Convert world coordinates back to grid position
    const adjustedY = worldY - 100 - this.bubbleSize / 2;
    const row = Math.round(adjustedY / (this.bubbleSize * 0.866));
    
    const offsetX = (row % 2) * (this.bubbleSize / 2);
    const adjustedX = worldX - 37.5 - this.bubbleSize / 2 - offsetX;
    const col = Math.round(adjustedX / this.bubbleSize);
    
    return { row: Math.max(0, Math.min(row, this.rows - 1)), col: Math.max(0, Math.min(col, this.cols - 1)) };
  }

  placeBubble(row, col, type) {
    // Find nearest empty position
    const emptyPos = this.findNearestEmpty(row, col);
    if (emptyPos) {
      this.createBubble(emptyPos.row, emptyPos.col, type);
    }
  }

  findNearestEmpty(targetRow, targetCol) {
    // Search in expanding circles for empty position
    for (let radius = 0; radius < 5; radius++) {
      for (let row = Math.max(0, targetRow - radius); row <= Math.min(this.rows - 1, targetRow + radius); row++) {
        for (let col = Math.max(0, targetCol - radius); col <= Math.min(this.cols - 1, targetCol + radius); col++) {
          if (!this.grid[row][col]) {
            return { row, col };
          }
        }
      }
    }
    return null;
  }

  findMatches(row, col) {
    const bubbleType = this.grid[row][col];
    if (!bubbleType) return [];
    
    const visited = new Set();
    const matches = [];
    
    this.floodFill(row, col, bubbleType, visited, matches);
    
    return matches.length >= 3 ? matches : [];
  }

  floodFill(row, col, type, visited, matches) {
    const key = `${row},${col}`;
    if (visited.has(key) || !this.isValidPosition(row, col) || this.grid[row][col] !== type) {
      return;
    }
    
    visited.add(key);
    matches.push({ row, col });
    
    // Check all 6 neighbors (hexagonal grid)
    const neighbors = this.getNeighbors(row, col);
    neighbors.forEach(neighbor => {
      this.floodFill(neighbor.row, neighbor.col, type, visited, matches);
    });
  }

  getNeighbors(row, col) {
    const neighbors = [];
    const isEvenRow = row % 2 === 0;
    
    // Hexagonal grid neighbors
    const offsets = isEvenRow
      ? [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]]
      : [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];
    
    offsets.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      if (this.isValidPosition(newRow, newCol)) {
        neighbors.push({ row: newRow, col: newCol });
      }
    });
    
    return neighbors;
  }

  findFloatingBubbles() {
    const connected = new Set();
    
    // Mark all bubbles connected to top row
    for (let col = 0; col < this.cols; col++) {
      if (this.grid[0][col]) {
        this.markConnected(0, col, connected);
      }
    }
    
    // Find bubbles not connected to top
    const floating = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] && !connected.has(`${row},${col}`)) {
          floating.push({ row, col });
        }
      }
    }
    
    return floating;
  }

  markConnected(row, col, connected) {
    const key = `${row},${col}`;
    if (connected.has(key) || !this.isValidPosition(row, col) || !this.grid[row][col]) {
      return;
    }
    
    connected.add(key);
    
    const neighbors = this.getNeighbors(row, col);
    neighbors.forEach(neighbor => {
      this.markConnected(neighbor.row, neighbor.col, connected);
    });
  }

  isValidPosition(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  getBubble(row, col) {
    return this.bubbleObjects[row] && this.bubbleObjects[row][col];
  }

  removeBubble(row, col) {
    this.grid[row][col] = null;
    this.bubbleObjects[row][col] = null;
  }

  isEmpty() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  reachedBottom() {
    // Check if any bubble is in the last few rows
    for (let row = this.rows - 3; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col]) {
          return true;
        }
      }
    }
    return false;
  }

  clearGrid() {
    // Clear all bubbles
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.bubbleObjects[row][col]) {
          this.bubbleObjects[row][col].destroy();
        }
        this.grid[row][col] = null;
        this.bubbleObjects[row][col] = null;
      }
    }
  }

  dropNewRow() {
    // Move all existing bubbles down by one row
    for (let row = this.rows - 1; row >= 1; row--) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row - 1][col]) {
          // Move bubble from row-1 to row
          const bubble = this.bubbleObjects[row - 1][col];
          if (bubble) {
            const newPos = this.getWorldPosition(row, col);
            bubble.setPosition(newPos.x, newPos.y);
            bubble.gridRow = row;
            bubble.gridCol = col;
          }
          
          this.grid[row][col] = this.grid[row - 1][col];
          this.bubbleObjects[row][col] = this.bubbleObjects[row - 1][col];
        } else {
          this.grid[row][col] = null;
          this.bubbleObjects[row][col] = null;
        }
      }
    }
    
    // Generate new top row
    const colors = ['fire', 'water', 'earth', 'air', 'light', 'dark'];
    for (let col = 0; col < this.cols; col++) {
      if (Math.random() < 0.8) { // 80% chance of bubble in new row
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.createBubble(0, col, color);
      } else {
        this.grid[0][col] = null;
        this.bubbleObjects[0][col] = null;
      }
    }
  }
}