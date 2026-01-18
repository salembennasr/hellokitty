// Item Categories
export const CATEGORIES = {
  FURNITURE: 'FURNITURE',
  MATERIAL: 'MATERIAL',
  CLOTHING: 'CLOTHING',
  FOOD: 'FOOD',
  EVENT: 'EVENT',
  RECIPE: 'RECIPE',
}

export const CATEGORY_LABELS = {
  FURNITURE: 'Möbel',
  MATERIAL: 'Material',
  CLOTHING: 'Kleidung',
  FOOD: 'Essen',
  EVENT: 'Event',
  RECIPE: 'Rezepte',
}

export const CATEGORY_ICONS = {
  FURNITURE: '🪑',
  MATERIAL: '✨',
  CLOTHING: '👗',
  FOOD: '🍰',
  EVENT: '🎃',
  RECIPE: '📜',
}

// Item Rarities
export const RARITIES = {
  COMMON: 'COMMON',
  UNCOMMON: 'UNCOMMON',
  RARE: 'RARE',
  EVENT: 'EVENT',
}

export const RARITY_LABELS = {
  COMMON: 'Normal',
  UNCOMMON: 'Selten',
  RARE: 'Rar',
  EVENT: 'Event',
}

export const RARITY_COLORS = {
  COMMON: 'gray',
  UNCOMMON: 'blue',
  RARE: 'purple',
  EVENT: 'yellow',
}

// Trade Status
export const TRADE_STATUS = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export const TRADE_STATUS_LABELS = {
  ACTIVE: 'Aktiv',
  COMPLETED: 'Abgeschlossen',
  CANCELLED: 'Abgebrochen',
}

// Interest Status
export const INTEREST_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
}

export const INTEREST_STATUS_LABELS = {
  PENDING: 'Ausstehend',
  ACCEPTED: 'Akzeptiert',
  DECLINED: 'Abgelehnt',
}

// Contact Preferences
export const CONTACT_PREFERENCES = {
  IN_APP: 'IN_APP',
  DISCORD: 'DISCORD',
}

export const CONTACT_PREFERENCE_LABELS = {
  IN_APP: 'In-App Nachrichten',
  DISCORD: 'Discord',
}

// Character Sets / Subcategories
export const CHARACTER_SETS = [
  { id: 'hello-kitty', name: 'Hello Kitty', emoji: '🎀' },
  { id: 'cinnamoroll', name: 'Cinnamoroll', emoji: '☁️' },
  { id: 'kuromi', name: 'Kuromi', emoji: '💀' },
  { id: 'my-melody', name: 'My Melody', emoji: '🐰' },
  { id: 'pompompurin', name: 'Pompompurin', emoji: '🐕' },
  { id: 'keroppi', name: 'Keroppi', emoji: '🐸' },
  { id: 'badtz-maru', name: 'Badtz-Maru', emoji: '🐧' },
]

// App Configuration
export const APP_CONFIG = {
  MAX_ITEMS_PER_TRADE: 10,
  MAX_MESSAGE_LENGTH: 500,
  MAX_DESCRIPTION_LENGTH: 500,
  ACCESS_CODE_LENGTH: 12,
}

// External Links
export const EXTERNAL_LINKS = {
  WIKI: 'https://hellokittyislandadventure.wiki.gg/',
  DISCORD: '#', // Add actual Discord link
  APP_STORE: 'https://apps.apple.com/app/hello-kitty-island-adventure/id1601810596',
}
