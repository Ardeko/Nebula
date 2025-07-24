// Mock data for Nebula game - replace with backend API calls later

export const mockLevels = [
  {
    id: 1,
    theme: 'Cosmic Dawn',
    difficulty: 'Easy',
    maxShots: 50,
    targetScore: 5000,
    description: 'Welcome to the cosmos! Learn the basics of elemental harmony.',
    elements: ['fire', 'water'],
    powerUps: [],
    background: 'cosmic-dawn'
  },
  {
    id: 2,
    theme: 'Solar Winds',
    difficulty: 'Easy',
    maxShots: 45,
    targetScore: 7500,
    description: 'Harness the power of solar winds with earth and air elements.',
    elements: ['earth', 'air', 'fire', 'water'],
    powerUps: ['nova-bomb'],
    background: 'solar-winds'
  },
  {
    id: 3,
    theme: 'Stellar Forge',
    difficulty: 'Medium',
    maxShots: 40,
    targetScore: 10000,
    description: 'The stellar forge creates new elements. Master light and dark.',
    elements: ['fire', 'water', 'earth', 'air', 'light'],
    powerUps: ['nova-bomb', 'chain-lightning'],
    background: 'stellar-forge'
  },
  {
    id: 4,
    theme: 'Nebula Heart',
    difficulty: 'Medium',
    maxShots: 35,
    targetScore: 12500,
    description: 'The heart of the nebula pulses with all elemental forces.',
    elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'],
    powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze'],
    background: 'nebula-heart'
  },
  {
    id: 5,
    theme: 'Void Rift',
    difficulty: 'Hard',
    maxShots: 30,
    targetScore: 15000,
    description: 'A dangerous rift in space-time challenges your mastery.',
    elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'],
    powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'],
    background: 'void-rift'
  },
  {
    id: 6,
    theme: 'Galactic Core',
    difficulty: 'Hard',
    maxShots: 28,
    targetScore: 18000,
    description: 'The galactic core tests your ultimate skills.',
    elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'],
    powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'],
    background: 'galactic-core'
  },
  {
    id: 7,
    theme: 'Supernova',
    difficulty: 'Expert',
    maxShots: 25,
    targetScore: 20000,
    description: 'A dying star creates chaos in the elemental balance.',
    elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'],
    powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'],
    background: 'supernova'
  },
  {
    id: 8,
    theme: 'Black Hole',
    difficulty: 'Expert',
    maxShots: 22,
    targetScore: 25000,
    description: 'The ultimate challenge: restore balance near a black hole.',
    elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'],
    powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'],
    background: 'black-hole'
  }
];

export const mockPlayerProgress = {
  currentLevel: 1,
  totalScore: 0,
  totalStars: 0,
  levels: [
    { id: 1, unlocked: true, completed: false, stars: 0, bestScore: 0 },
    { id: 2, unlocked: false, completed: false, stars: 0, bestScore: 0 },
    { id: 3, unlocked: false, completed: false, stars: 0, bestScore: 0 },
    { id: 4, unlocked: false, completed: false, stars: 0, bestScore: 0 },
    { id: 5, unlocked: false, completed: false, stars: 0, bestScore: 0 },
    { id: 6, unlocked: false, completed: false, stars: 0, bestScore: 0 },
    { id: 7, unlocked: false, completed: false, stars: 0, bestScore: 0 },
    { id: 8, unlocked: false, completed: false, stars: 0, bestScore: 0 }
  ]
};

export const mockPowerUps = {
  'nova-bomb': {
    name: 'Nova Bomb',
    description: 'Destroys all bubbles in a large radius',
    icon: 'power-nova',
    rarity: 'common',
    cost: 1000
  },
  'chain-lightning': {
    name: 'Chain Lightning',
    description: 'Connects and destroys same-color bubbles in sequence',
    icon: 'power-chain',
    rarity: 'uncommon',
    cost: 2000
  },
  'time-freeze': {
    name: 'Time Freeze',
    description: 'Stops bubble drop for 10 seconds',
    icon: 'power-freeze',
    rarity: 'rare',
    cost: 3000
  },
  'mirror-shot': {
    name: 'Mirror Shot',
    description: 'Shoot gets extra reflections off walls',
    icon: 'power-mirror',
    rarity: 'rare',
    cost: 3500
  },
  'gravity-switch': {
    name: 'Gravity Switch',
    description: 'Temporarily inverts bubble gravity',
    icon: 'power-gravity',
    rarity: 'legendary',
    cost: 5000
  }
};

export const mockAchievements = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first level',
    icon: 'achievement-start',
    unlocked: false,
    progress: 0,
    target: 1
  },
  {
    id: 'combo-master',
    name: 'Combo Master',
    description: 'Create a 10+ bubble combo',
    icon: 'achievement-combo',
    unlocked: false,
    progress: 0,
    target: 1
  },
  {
    id: 'perfect-aim',
    name: 'Perfect Aim',
    description: 'Complete a level with 90% accuracy',
    icon: 'achievement-aim',
    unlocked: false,
    progress: 0,
    target: 1
  },
  {
    id: 'star-collector',
    name: 'Star Collector',
    description: 'Earn 15 stars total',
    icon: 'achievement-stars',
    unlocked: false,
    progress: 0,
    target: 15
  },
  {
    id: 'cosmic-master',
    name: 'Cosmic Master',
    description: 'Complete all levels with 3 stars',
    icon: 'achievement-master',
    unlocked: false,
    progress: 0,
    target: 8
  }
];

export const mockSettings = {
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  showAimGuide: true,
  autoSave: true,
  difficulty: 'normal', // easy, normal, hard
  colorBlindMode: false
};

// Mock functions to simulate backend operations
export const mockAPI = {
  // Player progress
  getPlayerProgress: () => Promise.resolve(mockPlayerProgress),
  updatePlayerProgress: (progress) => {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        Object.assign(mockPlayerProgress, progress);
        resolve(mockPlayerProgress);
      }, 100);
    });
  },
  
  // Level completion
  completeLevel: (levelId, score, stars) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const level = mockPlayerProgress.levels.find(l => l.id === levelId);
        if (level) {
          level.completed = true;
          level.stars = Math.max(level.stars, stars);
          level.bestScore = Math.max(level.bestScore, score);
          
          // Unlock next level
          const nextLevel = mockPlayerProgress.levels.find(l => l.id === levelId + 1);
          if (nextLevel) {
            nextLevel.unlocked = true;
          }
          
          mockPlayerProgress.totalScore += score;
          mockPlayerProgress.totalStars += stars;
          mockPlayerProgress.currentLevel = Math.max(mockPlayerProgress.currentLevel, levelId + 1);
        }
        resolve(mockPlayerProgress);
      }, 200);
    });
  },
  
  // Settings
  getSettings: () => Promise.resolve(mockSettings),
  updateSettings: (newSettings) => {
    return new Promise(resolve => {
      setTimeout(() => {
        Object.assign(mockSettings, newSettings);
        resolve(mockSettings);
      }, 100);
    });
  },
  
  // Achievements
  getAchievements: () => Promise.resolve(mockAchievements),
  checkAchievements: (eventType, data) => {
    // Simple achievement checking logic
    return new Promise(resolve => {
      setTimeout(() => {
        const unlockedAchievements = [];
        
        if (eventType === 'level-complete' && data.level === 1) {
          const achievement = mockAchievements.find(a => a.id === 'first-steps');
          if (!achievement.unlocked) {
            achievement.unlocked = true;
            achievement.progress = 1;
            unlockedAchievements.push(achievement);
          }
        }
        
        resolve(unlockedAchievements);
      }, 100);
    });
  }
};