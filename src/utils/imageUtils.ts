// Helper function to get appropriate online image based on recipe title
export const getImageByTitle = (title: string, category: string): string => {
  const titleLower = title.toLowerCase();
  
  // Specific dish mappings with high-quality food images
  const specificDishes: { [key: string]: string } = {
    // South Indian dishes - more specific and accurate
    'sambar': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format',
    'rasam': 'https://images.unsplash.com/photo-1574653565782-87fd8fe449b5?w=400&h=300&fit=crop&auto=format',
    'dosa': 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop&auto=format',
    'idli': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop&auto=format',
    'vada': 'https://images.unsplash.com/photo-1611391467856-1a9f93c8f4d2?w=400&h=300&fit=crop&auto=format',
    'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format',
    'biryani': 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&auto=format',
    'curry': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format',
    'tandoori': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&auto=format',
    'dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format',
    'chapati': 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop&auto=format',
    'naan': 'https://images.unsplash.com/photo-1605908502724-9093a79e5df8?w=400&h=300&fit=crop&auto=format',
    
    // Pizza variations
    'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format',
    'margherita': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format',
    'pepperoni': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&auto=format',
    
    // Pasta dishes
    'spaghetti': 'https://images.unsplash.com/photo-1551892374-ecf8df7fea3a?w=400&h=300&fit=crop&auto=format',
    'fettuccine': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d946?w=400&h=300&fit=crop&auto=format',
    'carbonara': 'https://images.unsplash.com/photo-1588013273468-315900bafd4c?w=400&h=300&fit=crop&auto=format',
    'alfredo': 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400&h=300&fit=crop&auto=format',
    
    // Burgers and sandwiches
    'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format',
    'sandwich': 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&auto=format',
    
    // Salads
    'salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format',
    'caesar': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&auto=format',
    
    // Soups
    'soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&auto=format',
    'tomato soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&auto=format',
    
    // Desserts
    'cake': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop&auto=format',
    'brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&auto=format',
    'cookie': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop&auto=format',
    'ice cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format',
    
    // Breakfast items
    'pancake': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format',
    'waffle': 'https://images.unsplash.com/photo-1562376552-0d160dcbbc6b?w=400&h=300&fit=crop&auto=format',
    'french toast': 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop&auto=format',
    
    // Sushi and Japanese
    'sushi': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format',
    'ramen': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format',
    
    // Mexican
    'taco': 'https://images.unsplash.com/photo-1565299585323-38174c20375f?w=400&h=300&fit=crop&auto=format',
    'burrito': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&auto=format',
    
    // Chicken dishes
    'chicken': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop&auto=format',
    'fried chicken': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&auto=format'
  };
  
  // Check for exact matches first (case-insensitive)
  const titleLowerTrimmed = titleLower.trim();
  for (const [dish, imageUrl] of Object.entries(specificDishes)) {
    if (titleLowerTrimmed === dish || titleLowerTrimmed.includes(dish)) {
      return imageUrl;
    }
  }
  
  // Additional keyword-based matching for South Indian dishes
  if (titleLower.includes('rasam')) {
    return 'https://images.unsplash.com/photo-1574653565782-87fd8fe449b5?w=400&h=300&fit=crop&auto=format';
  }
  
  if (titleLower.includes('sambar')) {
    return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format';
  }
  
  // Category-based fallbacks with online images
  if (titleLower.includes('veg') || titleLower.includes('salad') || titleLower.includes('quinoa') || 
      titleLower.includes('avocado') || titleLower.includes('spinach') || titleLower.includes('mushroom') ||
      titleLower.includes('tomato') || titleLower.includes('vegetarian') || titleLower.includes('broccoli') ||
      titleLower.includes('cauliflower') || titleLower.includes('beans') || titleLower.includes('tofu') ||
      titleLower.includes('lentil') || titleLower.includes('chickpea')) {
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'; // Fresh vegetables
  }
  
  // Meat/Seafood dishes
  if (titleLower.includes('beef') || titleLower.includes('pork') || titleLower.includes('lamb') || 
      titleLower.includes('fish') || titleLower.includes('salmon') || titleLower.includes('tuna') ||
      titleLower.includes('shrimp') || titleLower.includes('meat') || titleLower.includes('turkey') ||
      titleLower.includes('bacon') || titleLower.includes('steak') || titleLower.includes('seafood')) {
    return 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop'; // Grilled meat
  }
  
  // Pasta dishes
  if (titleLower.includes('pasta') || titleLower.includes('noodle') || titleLower.includes('linguine') ||
      titleLower.includes('penne') || titleLower.includes('creamy')) {
    return 'https://images.unsplash.com/photo-1551892374-ecf8df7fea3a?w=400&h=300&fit=crop'; // Pasta
  }
  
  // Rice dishes
  if (titleLower.includes('rice') || titleLower.includes('risotto') || titleLower.includes('pilaf') ||
      titleLower.includes('fried rice')) {
    return 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop'; // Rice dish
  }
  
  // Snacks and appetizers
  if (titleLower.includes('snack') || titleLower.includes('chips') || titleLower.includes('muffin') ||
      titleLower.includes('popcorn') || titleLower.includes('crackers') || titleLower.includes('nuts') ||
      titleLower.includes('pretzel') || titleLower.includes('granola')) {
    return 'https://images.unsplash.com/photo-1559847844-d55a0c00c267?w=400&h=300&fit=crop'; // Snacks
  }
  
  // Default fallback based on category
  const categoryMap: { [key: string]: string } = {
    'Vegetarian': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    'Meat & Seafood': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
    'Healthy & Diet': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    'Popular': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    'Snacks': 'https://images.unsplash.com/photo-1559847844-d55a0c00c267?w=400&h=300&fit=crop'
  };
  
  return categoryMap[category] || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop';
};
