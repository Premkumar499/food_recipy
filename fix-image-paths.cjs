const fs = require('fs');

// Read the db.json file
const data = fs.readFileSync('db.json', 'utf8');

// Replace all instances of "food interface/" with "/images/food-interface/"
const fixedData = data.replace(/food interface\//g, '/images/food-interface/');

// Write the fixed data back to db.json
fs.writeFileSync('db.json', fixedData, 'utf8');

console.log('Fixed all image paths in db.json');
console.log('Replaced "food interface/" with "/images/food-interface/"');
