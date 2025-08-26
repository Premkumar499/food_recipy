const imageMap: Record<string, string> = {
  // Use existing images from the public/images folder
  'creamy pasta': 'images/veg-food.webp',
  'pasta': 'images/veg-food.webp',
  'chicken': 'images/non-veg.webp',
  'grilled': 'images/non-veg-2.webp',
  'spicy': 'images/non-veg-3.webp',
  'rice': 'images/veg-1.webp',
  'vegetable': 'images/veg.jpeg',
  'veg': 'images/veg-food.webp',
  'snack': 'images/snack-1.webp',
  'rasam': 'images/veg.jpeg',
  'tomato': 'images/tomato.jpeg',
  'carrot': 'images/carrot.jpeg',
  'brinjal': 'images/bring.jpeg',
  // Add more keyword-to-image mappings here
};

const defaultImage = 'images/plate.png';

export const getImageByTitle = (title: string, category: string): string => {
  const lowerTitle = title.toLowerCase();

  // First check if title contains any keywords
  for (const keyword of Object.keys(imageMap)) {
    if (lowerTitle.includes(keyword)) {
      return imageMap[keyword];
    }
  }

  // Then check category
  const lowerCategory = category.toLowerCase();
  for (const keyword of Object.keys(imageMap)) {
    if (lowerCategory.includes(keyword)) {
      return imageMap[keyword];
    }
  }

  // Return default image if no match found
  return defaultImage;
};
