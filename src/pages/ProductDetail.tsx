import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, Shield, Minus, Plus, ChevronRight } from 'lucide-react';
import { getProductById, Product, getFeaturedProducts } from '@/api/mock/mockProducts';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/common/ProductCard';
import { toast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductById(id).then((data) => {
        if (data) {
          setProduct(data);
          setSelectedColor(data.colors[0]);
        }
        setLoading(false);
      });

      getFeaturedProducts().then((products) => {
        setRelatedProducts(products.filter((p) => p.id !== id).slice(0, 4));
      });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        description: 'Choose your size before adding to cart',
        variant: 'destructive',
      });
      return;
    }

    addItem(product, quantity, selectedSize, selectedColor);
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart`,
    });
  };

  if (loading) {
    return (
      <div className="page-container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-secondary animate-pulse rounded-2xl" />
          <div className="space-y-6">
            <div className="h-8 w-32 bg-secondary animate-pulse rounded" />
            <div className="h-12 w-3/4 bg-secondary animate-pulse rounded" />
            <div className="h-24 bg-secondary animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="page-container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="aspect-square rounded-3xl overflow-hidden bg-secondary">
                <motion.img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && (
                  <span className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    NEW
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="px-4 py-2 bg-destructive text-destructive-foreground text-sm font-semibold rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button className="absolute top-4 right-4 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Brand */}
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </span>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Color: <span className="text-muted-foreground">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Size: <span className="text-muted-foreground">{selectedSize ? `US ${selectedSize}` : 'Select a size'}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary text-lg py-4 gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                className="btn-secondary text-lg py-4 px-8"
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">2-Year Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
