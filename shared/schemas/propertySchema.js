// shared/schemas/playerSchema.js

/**
 * Structural definition and factory template for a Monopoly Player.
 * Keeps Go structures and Frontend models in perfect alignment.
 */
export const playerSchema = {
  id: "string",           // Unique Identifier (e.g., UUID or Guest ID)
  name: "string",         // Display Name / Reddit Username
  color: "string",        // Hex Code value (e.g., #FF4500)
  piece: "string",        // Token type choice (e.g., 'alien', 'doge')
  money: "number",        // Current cash balance 
  position: "number",     // Current board tile index (0 to 39)
  inJail: "boolean",      // True if player is trapped in jail
  jailTurns: "number",    // Counter for how many turns spent in jail
  hasGetOutofJailCard: "boolean", 
  isBankrupt: "boolean",  // True if player has dropped out of match
  propertiesOwned: "array", // Array of strings (Property/Tile IDs)
};

/**
 * Creates a default structured Player Instance object.
 * Useful for mocking players in tests or initializing new players in lobbies.
 * * @param {Object} partialData - Override values to set upon instantiation
 * @returns {Object} A fully formatted default player object
 */
export function createPlayerInstance(partialData = {}) {
  return {
    id: partialData.id || "",
    name: partialData.name || "Anonymous Redditor",
    color: partialData.color || "#FF4500", // Reddit Orange
    piece: partialData.piece || "alien",
    money: typeof partialData.money === 'number' ? partialData.money : 1500, // Classic starting cash
    position: partialData.position || 0, // Starts at GO (index 0)
    inJail: partialData.inJail || false,
    jailTurns: partialData.jailTurns || 0,
    hasGetOutofJailCard: partialData.hasGetOutofJailCard || false,
    isBankrupt: partialData.isBankrupt || false,
    propertiesOwned: Array.isArray(partialData.propertiesOwned) ? partialData.propertiesOwned : [],
    ...partialData // Catch-all for any custom properties passed dynamically
  };
}

/**
 * Runtime validator to safely parse and confirm if an incoming server 
 * packet matches the structural player requirement rules.
 * * @param {Object} obj - The object to validate
 * @returns {boolean} True if object structure contains mandatory base keys
 */
export function validatePlayerStructure(obj) {
  if (!obj || typeof obj !== 'object') return false;
  
  const requiredKeys = ['id', 'name', 'money', 'position', 'isBankrupt'];
  return requiredKeys.every(key => Object.prototype.hasOwnProperty.call(obj, key));
}

// Default export wrapper containing all modules
const playerSchemaBundle = {
  schema: playerSchema,
  create: createPlayerInstance,
  validate: validatePlayerStructure
};

export default playerSchemaBundle;