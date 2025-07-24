import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// User tracking - generate or get existing UUID
const getUserId = () => {
  let userId = localStorage.getItem('nebula-player-id');
  if (!userId) {
    userId = 'player-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    localStorage.setItem('nebula-player-id', userId);
  }
  return userId;
};

// API client setup
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add user ID
apiClient.interceptors.request.use((config) => {
  config.headers['X-Player-ID'] = getUserId();
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const gameAPI = {
  // Health check
  async healthCheck() {
    const response = await apiClient.get('/');
    return response.data;
  },

  // Levels
  async getLevels() {
    const response = await apiClient.get('/levels');
    return response.data;
  },

  async getLevel(levelId) {
    const response = await apiClient.get(`/levels/${levelId}`);
    return response.data;
  },

  // Player Progress
  async getPlayerProgress() {
    const userId = getUserId();
    const response = await apiClient.get(`/progress/${userId}`);
    return response.data;
  },

  async updatePlayerProgress(progressData) {
    const userId = getUserId();
    const response = await apiClient.post(`/progress/${userId}`, progressData);
    return response.data;
  },

  async completeLevel(levelId, score, stars, shots) {
    const userId = getUserId();
    const response = await apiClient.post(`/progress/${userId}/complete-level`, {
      levelId,
      score,
      stars,
      shots
    });
    return response.data;
  },

  // Infinite Mode
  async getInfiniteHighscores(limit = 100) {
    const response = await apiClient.get(`/infinite/highscores?limit=${limit}`);
    return response.data;
  },

  async saveInfiniteScore(score, wave) {
    const userId = getUserId();
    const response = await apiClient.post(`/infinite/highscores/${userId}`, {
      score,
      wave
    });
    return response.data;
  },

  // Achievements
  async getPlayerAchievements() {
    const userId = getUserId();
    const response = await apiClient.get(`/achievements/${userId}`);
    return response.data;
  },

  // Local storage helpers
  getLocalInfiniteHighScore() {
    return parseInt(localStorage.getItem('nebula-infinite-high-score') || '0');
  },

  getLocalInfiniteHighWave() {
    return parseInt(localStorage.getItem('nebula-infinite-high-wave') || '0');
  },

  setLocalInfiniteHighScore(score) {
    localStorage.setItem('nebula-infinite-high-score', score.toString());
  },

  setLocalInfiniteHighWave(wave) {
    localStorage.setItem('nebula-infinite-high-wave', wave.toString());
  },

  // Sync local data to backend
  async syncLocalData() {
    try {
      const progress = await this.getPlayerProgress();
      
      // Sync infinite scores from localStorage
      const localHighScore = this.getLocalInfiniteHighScore();
      const localHighWave = this.getLocalInfiniteHighWave();
      
      if (localHighScore > progress.infiniteHighScore || localHighWave > progress.infiniteHighWave) {
        await this.saveInfiniteScore(localHighScore, localHighWave);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to sync local data:', error);
      return false;
    }
  },

  // Get user ID for display
  getUserId,

  // Clear all local data (for testing)
  clearLocalData() {
    localStorage.removeItem('nebula-player-id');
    localStorage.removeItem('nebula-infinite-high-score');
    localStorage.removeItem('nebula-infinite-high-wave');
  }
};