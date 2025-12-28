import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { Product } from '@/api/mock/mockProducts';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const discountPercentage = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group product-card"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary rounded-t-2xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.new && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                NEW
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
          >
            <Heart className="w-5 h-5" />
          </motion.button>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                // Quick add to cart logic - would open size selector
              }}
              className="w-full btn-primary py-3 gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="flex items-center gap-2 mt-3">
            {product.colors.slice(0, 3).map((color, i) => (
              <span
                key={i}
                className="text-xs text-muted-foreground"
              >
                {color}{i < Math.min(product.colors.length, 3) - 1 && ','}
              </span>
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
