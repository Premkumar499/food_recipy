const fs = require('fs');

try {
    const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    
    console.log('Recipe Names:');
    console.log('=============');
    
    data.recipes.forEach((recipe, index) => {
        console.log(`${index + 1}. ${recipe.title}`);
    });
    
    console.log(`\nTotal recipes: ${data.recipes.length}`);
    
} catch (error) {
    console.error('Error:', error.message);
}
