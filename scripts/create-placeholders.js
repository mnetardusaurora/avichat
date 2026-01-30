#!/usr/bin/env node

/**
 * Creates placeholder PNG images for AviTalk development
 * These should be replaced with real ARASAAC symbols before production
 */

const fs = require('fs');
const path = require('path');

// Simple 1x1 pixel PNG (smallest valid PNG)
const PLACEHOLDER_PNG = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
  0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x64,
  0x08, 0x02, 0x00, 0x00, 0x00, 0xff, 0x80, 0x02, 0x03, 0x00, 0x00, 0x00,
  0x19, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0xed, 0xc1, 0x01, 0x0d, 0x00,
  0x00, 0x00, 0xc2, 0xa0, 0xf7, 0x4f, 0x6d, 0x0e, 0x37, 0xa0, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xbe, 0x0d, 0x21, 0x00, 0x00, 0x01,
  0x9a, 0x60, 0xe1, 0xd5, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44,
  0xae, 0x42, 0x60, 0x82
]);

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

const categories = ['core', 'food', 'drinks', 'people', 'actions', 'feelings', 'objects'];

const symbols = {
  core: ['more', 'help', 'stop', 'go', 'want', 'yes', 'no', 'please', 'thank-you', 'sorry', 'mine', 'you', 'i', 'it', 'that'],
  food: ['apple', 'banana', 'cookie', 'cracker', 'cheese', 'bread', 'chicken', 'rice', 'pasta', 'snack'],
  drinks: ['water', 'milk', 'juice', 'cup'],
  people: ['mom', 'dad', 'grandma', 'grandpa', 'baby', 'teacher', 'friend', 'me'],
  actions: ['eat', 'drink', 'play', 'read', 'sleep', 'walk', 'run', 'sit', 'stand', 'open', 'close', 'push', 'pull', 'hug', 'kiss'],
  feelings: ['happy', 'sad', 'angry', 'scared', 'tired', 'sick', 'hungry', 'thirsty', 'hurt', 'love', 'like'],
  objects: ['ball', 'book', 'toy', 'blanket', 'phone', 'tv', 'car', 'bed', 'diaper', 'potty', 'bath', 'shoes', 'clothes'],
};

const uiAssets = [
  'placeholder.png',
  'folder-icon.png',
  'category-core.png',
  'category-food.png',
  'category-drinks.png',
  'category-people.png',
  'category-actions.png',
  'category-feelings.png',
  'category-objects.png',
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createPlaceholder(filePath) {
  fs.writeFileSync(filePath, PLACEHOLDER_PNG);
}

console.log('Creating placeholder assets...\n');

// Create symbol placeholders
for (const category of categories) {
  const categoryDir = path.join(ASSETS_DIR, 'symbols', category);
  ensureDir(categoryDir);

  for (const symbol of symbols[category]) {
    const filePath = path.join(categoryDir, `${symbol}.png`);
    createPlaceholder(filePath);
    console.log(`  Created: symbols/${category}/${symbol}.png`);
  }
}

// Create UI asset placeholders
const uiDir = path.join(ASSETS_DIR, 'ui');
ensureDir(uiDir);

for (const asset of uiAssets) {
  const filePath = path.join(uiDir, asset);
  createPlaceholder(filePath);
  console.log(`  Created: ui/${asset}`);
}

console.log('\nPlaceholder assets created successfully!');
console.log('Run "node scripts/download-symbols.js" to download real ARASAAC symbols.');
