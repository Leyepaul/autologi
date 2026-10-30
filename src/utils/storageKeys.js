// Browser-storage names used by the progress system.
// Progress is stored PER PLAYER, so two accounts on one computer never mix.
export const LEGACY_KEY = 'automation101-progress';        // from before accounts existed
export const MERGE_KEY = 'automation101-merge-from';       // "a guest is about to log in to another account"
export const progressKey = (userId) => `${LEGACY_KEY}-${userId}`;
