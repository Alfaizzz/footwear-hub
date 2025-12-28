import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Truck, Shield, RotateCcw, Star, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';
import { getFeaturedProducts, getNewArrivals, Product } from '@/api/mock/mockProducts';
import heroShoe from '@/assets/hero-shoe.jpg';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const shoeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const shoeScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    getFeaturedProducts().then(setFeaturedProducts);
    getNewArrivals().then(setNewArrivals);
  }, []);

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $100',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure checkout',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Handpicked materials',
    },
  ];

  const categories = [
    { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', path: '/products?category=sneakers' },
    { name: 'Boots', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600', path: '/products?category=boots' },
    { name: 'Sandals', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600', path: '/products?category=sandals' },
    { name: 'Formal', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600', path: '/products?category=formal' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen gradient-hero overflow-hidden">
        <div className="page-container relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
          {/* Hero Content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6"
            >
              New Collection 2025
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-primary-foreground leading-tight mb-6"
            >
              Step Into
              <br />
              <span className="text-gradient">Your Style</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-primary-foreground/70 max-w-lg mx-auto lg:mx-0 mb-8"
            >
              Discover premium footwear crafted for comfort, style, and every step of your journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/products" className="btn-primary text-lg px-8 py-4 gap-2">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products?new=true" className="btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground text-lg px-8 py-4">
                New Arrivals
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '200+', label: 'Styles Available' },
                { value: '4.9', label: 'Average Rating' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image with 3D Rotation */}
          <motion.div
            style={{ 
              rotateY: shoeRotate,
              scale: shoeScale 
            }}
            className="flex-1 relative w-full max-w-xl lg:max-w-2xl mt-12 lg:mt-0"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
              src={heroShoe}
              alt="Featured Shoe"
              className="w-full h-auto drop-shadow-2xl"
            />
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute top-10 right-0 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-glow"
            >
              -20% OFF
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-card border-b border-border">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-secondary transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find your perfect style</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              View All <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={category.path}
                  className="group block relative aspect-[4/5] rounded-2xl overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-background mb-1">{category.name}</h3>
                    <span className="text-sm text-background/80 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-secondary/50">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our most popular styles</p>
            </div>
            <Link to="/products?featured=true" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              View All <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh drops just for you</p>
            </div>
            <Link to="/products?new=true" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              View All <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding gradient-hero">
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Get 20% Off Your First Order
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8">
              Sign up for our newsletter and receive exclusive offers, early access to new arrivals, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 flex-1"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
