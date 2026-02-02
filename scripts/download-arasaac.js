#!/usr/bin/env node
/**
 * ARASAAC Symbol Downloader
 * Downloads AAC symbols from the ARASAAC API for use in AviChat
 *
 * ARASAAC symbols are licensed under CC BY-NC-SA 4.0
 * Attribution: Sergio Palao / ARASAAC (https://arasaac.org)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Output directory for symbols
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'symbols');

// ARASAAC API base URL
const API_BASE = 'https://api.arasaac.org/v1';

// Symbol size (500px is good quality for tablets)
const SYMBOL_SIZE = 500;

// Words to download with their ARASAAC keyword searches
// Format: { id: 'our_id', search: 'arasaac_search_term', fallback: 'alternative_search' }
const VOCABULARY = [
  // Core words
  { id: 'want', search: 'want', fallback: 'desire' },
  { id: 'more', search: 'more' },
  { id: 'help', search: 'help' },
  { id: 'stop', search: 'stop' },
  { id: 'go', search: 'go' },
  { id: 'allDone', search: 'finished', fallback: 'done' },
  { id: 'yes', search: 'yes' },
  { id: 'no', search: 'no' },

  // People
  { id: 'mommy', search: 'mother', fallback: 'mom' },
  { id: 'daddy', search: 'father', fallback: 'dad' },
  { id: 'baby', search: 'baby' },
  { id: 'grandma', search: 'grandmother' },
  { id: 'grandpa', search: 'grandfather' },
  { id: 'teacher', search: 'teacher' },
  { id: 'friend', search: 'friend' },
  { id: 'me', search: 'me', fallback: 'I' },

  // Food
  { id: 'apple', search: 'apple' },
  { id: 'banana', search: 'banana' },
  { id: 'cookie', search: 'cookie', fallback: 'biscuit' },
  { id: 'cracker', search: 'cracker' },
  { id: 'cheese', search: 'cheese' },
  { id: 'bread', search: 'bread' },
  { id: 'pizza', search: 'pizza' },
  { id: 'snack', search: 'snack' },

  // Drinks
  { id: 'water', search: 'water' },
  { id: 'milk', search: 'milk' },
  { id: 'juice', search: 'juice' },
  { id: 'hotChocolate', search: 'hot chocolate', fallback: 'cocoa' },
  { id: 'smoothie', search: 'smoothie', fallback: 'shake' },
  { id: 'tea', search: 'tea' },
  { id: 'iceCream', search: 'ice cream' },
  { id: 'drink', search: 'drink' },

  // Feelings
  { id: 'happy', search: 'happy' },
  { id: 'sad', search: 'sad' },
  { id: 'mad', search: 'angry', fallback: 'mad' },
  { id: 'scared', search: 'scared', fallback: 'afraid' },
  { id: 'tired', search: 'tired' },
  { id: 'hungry', search: 'hungry' },
  { id: 'thirsty', search: 'thirsty' },
  { id: 'hurt', search: 'hurt', fallback: 'pain' },

  // Actions
  { id: 'play', search: 'play' },
  { id: 'eat', search: 'eat' },
  { id: 'sleep', search: 'sleep' },
  { id: 'read', search: 'read' },
  { id: 'watch', search: 'watch TV', fallback: 'television' },
  { id: 'hug', search: 'hug' },
  { id: 'walk', search: 'walk' },
  { id: 'run', search: 'run' },

  // Places
  { id: 'home', search: 'home', fallback: 'house' },
  { id: 'school', search: 'school' },
  { id: 'park', search: 'park' },
  { id: 'store', search: 'store', fallback: 'shop' },
  { id: 'bathroom', search: 'bathroom', fallback: 'toilet' },
  { id: 'bedroom', search: 'bedroom' },
  { id: 'kitchen', search: 'kitchen' },
  { id: 'outside', search: 'outside' },

  // Things
  { id: 'toy', search: 'toy' },
  { id: 'ball', search: 'ball' },
  { id: 'book', search: 'book' },
  { id: 'phone', search: 'phone', fallback: 'telephone' },
  { id: 'tv', search: 'television' },
  { id: 'blanket', search: 'blanket' },
  { id: 'cup', search: 'cup' },
  { id: 'shoes', search: 'shoes' },

  // Animals
  { id: 'dog', search: 'dog' },
  { id: 'cat', search: 'cat' },
  { id: 'bird', search: 'bird' },
  { id: 'fish', search: 'fish' },
  { id: 'bunny', search: 'rabbit', fallback: 'bunny' },
  { id: 'horse', search: 'horse' },
  { id: 'cow', search: 'cow' },
  { id: 'pig', search: 'pig' },

  // Categories
  { id: 'people', search: 'people', fallback: 'family' },
  { id: 'food', search: 'food' },
  { id: 'drinks', search: 'drinks', fallback: 'beverages' },
  { id: 'feelings', search: 'feelings', fallback: 'emotions' },
  { id: 'actions', search: 'actions', fallback: 'verbs' },
  { id: 'places', search: 'places' },
  { id: 'things', search: 'things', fallback: 'objects' },
  { id: 'animals', search: 'animals' },
  { id: 'categories', search: 'categories', fallback: 'folder' },
  { id: 'back', search: 'back', fallback: 'return' },
];

// Make HTTP request
function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Search ARASAAC for a word
async function searchSymbol(keyword) {
  const url = `${API_BASE}/pictograms/en/search/${encodeURIComponent(keyword)}`;
  try {
    const data = await httpGet(url);
    const results = JSON.parse(data.toString());
    if (results && results.length > 0) {
      // Return the first (best) match
      return results[0];
    }
    return null;
  } catch (error) {
    console.error(`  Search failed for "${keyword}": ${error.message}`);
    return null;
  }
}

// Download a pictogram image
async function downloadPictogram(pictogramId, outputPath) {
  const url = `${API_BASE}/pictograms/${pictogramId}?download=true&resolution=${SYMBOL_SIZE}`;
  try {
    const imageData = await httpGet(url);
    fs.writeFileSync(outputPath, imageData);
    return true;
  } catch (error) {
    console.error(`  Download failed: ${error.message}`);
    return false;
  }
}

// Main download function
async function downloadAll() {
  console.log('🥑 AviChat ARASAAC Symbol Downloader');
  console.log('=====================================\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const manifest = {};
  let successCount = 0;
  let failCount = 0;

  for (const word of VOCABULARY) {
    process.stdout.write(`Downloading: ${word.id}... `);

    // Try primary search
    let result = await searchSymbol(word.search);

    // Try fallback if primary failed
    if (!result && word.fallback) {
      console.log(`trying fallback "${word.fallback}"...`);
      result = await searchSymbol(word.fallback);
    }

    if (result) {
      const outputPath = path.join(OUTPUT_DIR, `${word.id}.png`);
      const success = await downloadPictogram(result._id, outputPath);

      if (success) {
        console.log(`✓ (ARASAAC #${result._id})`);
        manifest[word.id] = {
          file: `${word.id}.png`,
          arasaacId: result._id,
          keywords: result.keywords || [],
        };
        successCount++;
      } else {
        console.log('✗ download failed');
        failCount++;
      }
    } else {
      console.log('✗ not found');
      failCount++;
    }

    // Small delay to be nice to the API
    await new Promise(r => setTimeout(r, 200));
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log('\n=====================================');
  console.log(`✓ Downloaded: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`\nManifest saved to: ${manifestPath}`);
  console.log('\n⚠️  ARASAAC symbols are licensed CC BY-NC-SA 4.0');
  console.log('   Attribution: Sergio Palao / ARASAAC (https://arasaac.org)');
}

// Run
downloadAll().catch(console.error);
