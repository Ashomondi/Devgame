import { api } from "./api";

export const playerService = {
  // Players
  listPlayers: (params) =>
    api.get(`/players${params ? `?${new URLSearchParams(params)}` : ""}`),

  getPlayer: (playerId) => api.get(`/players/${playerId}`),

  // Auth / current user (adjust if your routes differ)
  getMe: () => api.get(`/players/me`),

  // Profile / updates (adjust payload as needed)
  updateProfile: (data) => api.put(`/players/me`, data),

  // Avatar / settings (examples)
  updateAvatar: (data) => api.patch(`/players/me/avatar`, data),

  // Common leaderboard stats (examples)
  getPlayerStats: (playerId, params) =>
    api.get(
      `/players/${playerId}/stats${params ? `?${new URLSearchParams(params)}` : ""}`
    ),
};

export default playerService;
