export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl: string;
  category: 'sneakers' | 'boots' | 'sandals' | 'formal' | 'sports';
  gender: 'men' | 'women' | 'kids' | 'unisex';
  brand: string;
  rating: number;
  reviews: number;
  sizes: number[];
  colors: string[];
  featured?: boolean;
  new?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Max Velocity',
    description: 'Experience ultimate comfort with revolutionary air cushioning technology. Perfect for everyday wear and light athletic activities.',
    price: 189.99,
    originalPrice: 229.99,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    category: 'sneakers',
    gender: 'unisex',
    brand: 'FootVibe',
    rating: 4.8,
    reviews: 324,
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ['Red', 'Black', 'White'],
    featured: true,
    new: true,
  },
  {
    id: '2',
    name: 'Urban Runner Pro',
    description: 'Lightweight mesh upper with responsive cushioning. Designed for city streets and gym sessions.',
    price: 149.99,
    stock: 78,
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80',
    category: 'sports',
    gender: 'men',
    brand: 'FootVibe',
    rating: 4.6,
    reviews: 189,
    sizes: [7, 8, 9, 10, 11, 12, 13],
    colors: ['Blue', 'Gray', 'Black'],
    featured: true,
  },
  {
    id: '3',
    name: 'Classic Leather Oxford',
    description: 'Timeless elegance meets modern comfort. Premium leather construction with memory foam insole.',
    price: 219.99,
    stock: 32,
    imageUrl: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&auto=format&fit=crop&q=80',
    category: 'formal',
    gender: 'men',
    brand: 'FootVibe',
    rating: 4.9,
    reviews: 156,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Brown', 'Black', 'Tan'],
  },
  {
    id: '4',
    name: 'Summer Breeze Sandals',
    description: 'Breathable and stylish sandals for the warm season. Adjustable straps for the perfect fit.',
    price: 79.99,
    originalPrice: 99.99,
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&auto=format&fit=crop&q=80',
    category: 'sandals',
    gender: 'women',
    brand: 'FootVibe',
    rating: 4.5,
    reviews: 267,
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['Beige', 'White', 'Black'],
    featured: true,
  },
  {
    id: '5',
    name: 'Mountain Trail Boots',
    description: 'Rugged waterproof boots for outdoor adventures. Superior ankle support and grip.',
    price: 259.99,
    stock: 54,
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80',
    category: 'boots',
    gender: 'unisex',
    brand: 'FootVibe',
    rating: 4.7,
    reviews: 198,
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    colors: ['Brown', 'Black', 'Olive'],
    new: true,
  },
  {
    id: '6',
    name: 'Kids Fun Runner',
    description: 'Colorful and durable shoes for active kids. Easy velcro closure and flexible sole.',
    price: 59.99,
    stock: 200,
    imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80',
    category: 'sneakers',
    gender: 'kids',
    brand: 'FootVibe',
    rating: 4.8,
    reviews: 412,
    sizes: [1, 2, 3, 4, 5, 6],
    colors: ['Multi', 'Blue', 'Pink'],
  },
  {
    id: '7',
    name: 'Elegant Stiletto Heels',
    description: 'Sophisticated heels for special occasions. Cushioned footbed for all-day comfort.',
    price: 179.99,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
    category: 'formal',
    gender: 'women',
    brand: 'FootVibe',
    rating: 4.6,
    reviews: 134,
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['Black', 'Red', 'Nude'],
    featured: true,
  },
  {
    id: '8',
    name: 'Street Style High-Tops',
    description: 'Bold design meets street culture. Premium materials with custom lacing system.',
    price: 169.99,
    originalPrice: 199.99,
    stock: 67,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    category: 'sneakers',
    gender: 'unisex',
    brand: 'FootVibe',
    rating: 4.7,
    reviews: 289,
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ['White', 'Black', 'Red'],
    new: true,
  },
  {
    id: '9',
    name: 'Performance Basketball',
    description: 'Court-ready performance shoes with enhanced traction and ankle support.',
    price: 199.99,
    stock: 89,
    imageUrl: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&auto=format&fit=crop&q=80',
    category: 'sports',
    gender: 'men',
    brand: 'FootVibe',
    rating: 4.9,
    reviews: 567,
    sizes: [7, 8, 9, 10, 11, 12, 13, 14],
    colors: ['Black/Gold', 'White/Red', 'Navy'],
  },
  {
    id: '10',
    name: 'Cozy Winter Boots',
    description: 'Warm and waterproof boots for cold weather. Fleece-lined interior for maximum warmth.',
    price: 189.99,
    stock: 76,
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    category: 'boots',
    gender: 'women',
    brand: 'FootVibe',
    rating: 4.8,
    reviews: 234,
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ['Camel', 'Black', 'Gray'],
  },
  {
    id: '11',
    name: 'Minimalist Slip-Ons',
    description: 'Clean design for effortless style. Stretch fabric makes them easy to put on and take off.',
    price: 89.99,
    stock: 145,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80',
    category: 'sneakers',
    gender: 'unisex',
    brand: 'FootVibe',
    rating: 4.5,
    reviews: 178,
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    colors: ['White', 'Black', 'Navy'],
  },
  {
    id: '12',
    name: 'Trail Running Elite',
    description: 'Aggressive tread pattern for off-road running. Reinforced toe cap for protection.',
    price: 179.99,
    originalPrice: 219.99,
    stock: 58,
    imageUrl: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&auto=format&fit=crop&q=80',
    category: 'sports',
    gender: 'unisex',
    brand: 'FootVibe',
    rating: 4.7,
    reviews: 312,
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    colors: ['Orange', 'Green', 'Black'],
    featured: true,
  },
  {
    id: '13',
    name: 'Kids Light-Up Sneakers',
    description: 'Fun LED lights in the sole that flash with every step. USB rechargeable.',
    price: 69.99,
    stock: 167,
    imageUrl: 'https://images.unsplash.com/photo-1571210862729-78a52d3779a2?w=800&auto=format&fit=crop&q=80',
    category: 'sneakers',
    gender: 'kids',
    brand: 'FootVibe',
    rating: 4.9,
    reviews: 523,
    sizes: [10, 11, 12, 13, 1, 2, 3],
    colors: ['Pink', 'Blue', 'Multi'],
    new: true,
  },
  {
    id: '14',
    name: 'Chelsea Ankle Boots',
    description: 'Classic Chelsea style with modern comfort. Elastic side panels for easy wear.',
    price: 199.99,
    stock: 43,
    imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80',
    category: 'boots',
    gender: 'men',
    brand: 'FootVibe',
    rating: 4.6,
    reviews: 167,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Black', 'Brown', 'Burgundy'],
  },
  {
    id: '15',
    name: 'Sport Slides',
    description: 'Recovery slides with cloud-like cushioning. Perfect for post-workout relaxation.',
    price: 49.99,
    stock: 234,
    imageUrl: 'https://images.unsplash.com/photo-1562183241-840b8af0721e?w=800&auto=format&fit=crop&q=80',
    category: 'sandals',
    gender: 'unisex',
    brand: 'FootVibe',
    rating: 4.4,
    reviews: 389,
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    colors: ['Black', 'White', 'Navy'],
  },
];

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts.find((p) => p.id === id)), 300);
  });
};

export const getProductsByCategory = (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockProducts.filter((p) => p.category === category);
      resolve(filtered);
    }, 400);
  });
};

export const getFeaturedProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = mockProducts.filter((p) => p.featured);
      resolve(featured);
    }, 400);
  });
};

export const getNewArrivals = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItems = mockProducts.filter((p) => p.new);
      resolve(newItems);
    }, 400);
  });
};
