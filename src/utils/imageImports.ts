// Get food-interface images using proper Vite public asset handling
export const foodImages = {
  '1.jpg': '/images/food-interface/1.jpg',
  '2.jpg': '/images/food-interface/2.jpg',
  '3.jpeg': '/images/food-interface/3.jpeg',
  '4.JPEG': '/images/food-interface/4.JPEG',
  '5.jpeg': '/images/food-interface/5.jpeg',
  '6.jpeg': '/images/food-interface/6.jpeg',
  '7.jpeg': '/images/food-interface/7.jpeg',
  '8.webp': '/images/food-interface/8.webp',
};

export const getFoodImage = (filename: string) => {
  return foodImages[filename as keyof typeof foodImages] || foodImages['1.jpg'];
};
