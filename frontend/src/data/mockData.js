// Mock data for Nebula game - replace with backend API calls later

export const mockLevels = [
  // Beginner Levels (1-10)
  { id: 1, theme: 'Cosmic Dawn', difficulty: 'Easy', maxShots: 50, targetScore: 5000, description: 'Welcome to the cosmos! Learn the basics of elemental harmony.', elements: ['fire', 'water'], powerUps: [], background: 'cosmic-dawn' },
  { id: 2, theme: 'Solar Winds', difficulty: 'Easy', maxShots: 48, targetScore: 6000, description: 'Harness the power of solar winds with earth and air elements.', elements: ['earth', 'air', 'fire', 'water'], powerUps: [], background: 'solar-winds' },
  { id: 3, theme: 'Stellar Forge', difficulty: 'Easy', maxShots: 45, targetScore: 7500, description: 'The stellar forge creates new elements. Master light and dark.', elements: ['fire', 'water', 'earth', 'air', 'light'], powerUps: ['nova-bomb'], background: 'stellar-forge' },
  { id: 4, theme: 'Plasma Garden', difficulty: 'Easy', maxShots: 43, targetScore: 8500, description: 'Navigate through the beautiful plasma formations.', elements: ['fire', 'water', 'earth', 'air'], powerUps: ['nova-bomb'], background: 'plasma-garden' },
  { id: 5, theme: 'Meteor Shower', difficulty: 'Easy', maxShots: 40, targetScore: 9500, description: 'Dodge cosmic debris while maintaining elemental balance.', elements: ['fire', 'water', 'earth', 'air', 'light'], powerUps: ['nova-bomb'], background: 'meteor-shower' },
  { id: 6, theme: 'Aurora Fields', difficulty: 'Easy', maxShots: 38, targetScore: 10500, description: 'Dance through the cosmic aurora with grace.', elements: ['fire', 'water', 'earth', 'air', 'light'], powerUps: ['nova-bomb', 'chain-lightning'], background: 'aurora-fields' },
  { id: 7, theme: 'Nebula Heart', difficulty: 'Easy', maxShots: 36, targetScore: 11500, description: 'The heart of the nebula pulses with all elemental forces.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning'], background: 'nebula-heart' },
  { id: 8, theme: 'Comet Trail', difficulty: 'Easy', maxShots: 35, targetScore: 12500, description: 'Follow the comet\'s path through the void.', elements: ['fire', 'water', 'earth', 'air', 'light'], powerUps: ['nova-bomb', 'chain-lightning'], background: 'comet-trail' },
  { id: 9, theme: 'Quantum Echo', difficulty: 'Easy', maxShots: 33, targetScore: 13500, description: 'Reality bends as quantum forces interfere.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning'], background: 'quantum-echo' },
  { id: 10, theme: 'Crystal Void', difficulty: 'Easy', maxShots: 32, targetScore: 14500, description: 'Navigate the crystalline structures of deep space.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning'], background: 'crystal-void' },

  // Intermediate Levels (11-25)
  { id: 11, theme: 'Solar Nexus', difficulty: 'Medium', maxShots: 30, targetScore: 15500, description: 'Where multiple solar systems converge.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze'], background: 'solar-nexus' },
  { id: 12, theme: 'Photon Storm', difficulty: 'Medium', maxShots: 29, targetScore: 16500, description: 'Survive the intense photon bombardment.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze'], background: 'photon-storm' },
  { id: 13, theme: 'Gravity Well', difficulty: 'Medium', maxShots: 28, targetScore: 17500, description: 'Escape the pull of a massive gravity well.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze'], background: 'gravity-well' },
  { id: 14, theme: 'Stardust Maze', difficulty: 'Medium', maxShots: 27, targetScore: 18500, description: 'Find your way through the cosmic maze.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze'], background: 'stardust-maze' },
  { id: 15, theme: 'Pulsar Rhythm', difficulty: 'Medium', maxShots: 26, targetScore: 19500, description: 'Match the rhythm of the spinning pulsar.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze'], background: 'pulsar-rhythm' },
  { id: 16, theme: 'Dark Matter', difficulty: 'Medium', maxShots: 25, targetScore: 20500, description: 'Confront the mysterious dark matter clouds.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze'], background: 'dark-matter' },
  { id: 17, theme: 'Wormhole Gate', difficulty: 'Medium', maxShots: 24, targetScore: 21500, description: 'Stabilize the wormhole for safe passage.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'wormhole-gate' },
  { id: 18, theme: 'Asteroid Belt', difficulty: 'Medium', maxShots: 23, targetScore: 22500, description: 'Navigate the treacherous asteroid field.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'asteroid-belt' },
  { id: 19, theme: 'Helios Flare', difficulty: 'Medium', maxShots: 22, targetScore: 23500, description: 'Withstand the intense solar flare.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'helios-flare' },
  { id: 20, theme: 'Void Rift', difficulty: 'Medium', maxShots: 21, targetScore: 24500, description: 'A dangerous rift in space-time challenges your mastery.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'void-rift' },
  { id: 21, theme: 'Gamma Burst', difficulty: 'Medium', maxShots: 20, targetScore: 25500, description: 'Survive the devastating gamma ray burst.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'gamma-burst' },
  { id: 22, theme: 'Quasar Echo', difficulty: 'Medium', maxShots: 19, targetScore: 26500, description: 'The quasar\'s energy reverberates through space.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'quasar-echo' },
  { id: 23, theme: 'Magnetosphere', difficulty: 'Medium', maxShots: 18, targetScore: 27500, description: 'Navigate the planet\'s magnetic field.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'magnetosphere' },
  { id: 24, theme: 'Solar Corona', difficulty: 'Medium', maxShots: 17, targetScore: 28500, description: 'Brave the star\'s blazing corona.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'solar-corona' },
  { id: 25, theme: 'Cosmic Web', difficulty: 'Medium', maxShots: 16, targetScore: 29500, description: 'Traverse the universe\'s largest structures.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot'], background: 'cosmic-web' },

  // Advanced Levels (26-40)
  { id: 26, theme: 'Binary Stars', difficulty: 'Hard', maxShots: 15, targetScore: 30500, description: 'Balance the forces of twin stars.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'binary-stars' },
  { id: 27, theme: 'Ion Tempest', difficulty: 'Hard', maxShots: 14, targetScore: 31500, description: 'Weather the chaotic ion storm.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'ion-tempest' },
  { id: 28, theme: 'Galactic Core', difficulty: 'Hard', maxShots: 13, targetScore: 32500, description: 'The galactic core tests your ultimate skills.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'galactic-core' },
  { id: 29, theme: 'Neutron Dance', difficulty: 'Hard', maxShots: 12, targetScore: 33500, description: 'Dance with the dense neutron star.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'neutron-dance' },
  { id: 30, theme: 'Plasma Vortex', difficulty: 'Hard', maxShots: 11, targetScore: 34500, description: 'Escape the swirling plasma vortex.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'plasma-vortex' },
  { id: 31, theme: 'Stellar Nursery', difficulty: 'Hard', maxShots: 10, targetScore: 35500, description: 'Witness the birth of new stars.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'stellar-nursery' },
  { id: 32, theme: 'Dimension Tear', difficulty: 'Hard', maxShots: 9, targetScore: 36500, description: 'Reality fractures at the dimension\'s edge.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'dimension-tear' },
  { id: 33, theme: 'Time Spiral', difficulty: 'Hard', maxShots: 8, targetScore: 37500, description: 'Navigate the twisted streams of time.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'time-spiral' },
  { id: 34, theme: 'Antimatter Zone', difficulty: 'Hard', maxShots: 7, targetScore: 38500, description: 'Survive the deadly antimatter field.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'antimatter-zone' },
  { id: 35, theme: 'Supernova', difficulty: 'Hard', maxShots: 6, targetScore: 39500, description: 'A dying star creates chaos in the elemental balance.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'supernova' },
  { id: 36, theme: 'Quantum Foam', difficulty: 'Hard', maxShots: 5, targetScore: 40500, description: 'Reality bubbles at the quantum level.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'quantum-foam' },
  { id: 37, theme: 'Cosmic String', difficulty: 'Hard', maxShots: 4, targetScore: 41500, description: 'Navigate the one-dimensional cosmic defect.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'cosmic-string' },
  { id: 38, theme: 'Event Horizon', difficulty: 'Hard', maxShots: 3, targetScore: 42500, description: 'Approach the point of no return.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'event-horizon' },
  { id: 39, theme: 'Vacuum Decay', difficulty: 'Hard', maxShots: 2, targetScore: 43500, description: 'The universe itself begins to unravel.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'vacuum-decay' },
  { id: 40, theme: 'Multiverse Gate', difficulty: 'Hard', maxShots: 1, targetScore: 44500, description: 'Gateway to infinite possibilities.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'multiverse-gate' },

  // Master Levels (41-50)
  { id: 41, theme: 'Alpha Genesis', difficulty: 'Expert', maxShots: 25, targetScore: 50000, description: 'Return to the beginning of everything.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'alpha-genesis' },
  { id: 42, theme: 'Omega Terminus', difficulty: 'Expert', maxShots: 24, targetScore: 52500, description: 'Witness the end of all things.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'omega-terminus' },
  { id: 43, theme: 'Eternal Cycle', difficulty: 'Expert', maxShots: 23, targetScore: 55000, description: 'The universe begins anew.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'eternal-cycle' },
  { id: 44, theme: 'Perfect Void', difficulty: 'Expert', maxShots: 22, targetScore: 57500, description: 'Absolute nothingness challenges everything.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'perfect-void' },
  { id: 45, theme: 'Infinite Loop', difficulty: 'Expert', maxShots: 21, targetScore: 60000, description: 'Trapped in an endless recursion.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'infinite-loop' },
  { id: 46, theme: 'Singularity Core', difficulty: 'Expert', maxShots: 20, targetScore: 62500, description: 'The heart of a black hole awaits.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'singularity-core' },
  { id: 47, theme: 'Reality Engine', difficulty: 'Expert', maxShots: 19, targetScore: 65000, description: 'The machine that creates universes.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'reality-engine' },
  { id: 48, theme: 'Consciousness Web', difficulty: 'Expert', maxShots: 18, targetScore: 67500, description: 'Where all minds connect as one.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'consciousness-web' },
  { id: 49, theme: 'Final Paradox', difficulty: 'Expert', maxShots: 17, targetScore: 70000, description: 'Logic itself becomes impossible.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'final-paradox' },
  { id: 50, theme: 'Transcendence', difficulty: 'Legendary', maxShots: 15, targetScore: 100000, description: 'Beyond mastery lies transcendence itself.', elements: ['fire', 'water', 'earth', 'air', 'light', 'dark'], powerUps: ['nova-bomb', 'chain-lightning', 'time-freeze', 'mirror-shot', 'gravity-switch'], background: 'transcendence' }
];

export const mockPlayerProgress = {
  currentLevel: 1,
  totalScore: 0,
  totalStars: 0,
  infiniteHighScore: 0,
  infiniteHighWave: 0,
  levels: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    unlocked: i < 3, // First 3 levels unlocked
    completed: false,
    stars: 0,
    bestScore: 0
  }))
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