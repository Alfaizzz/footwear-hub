import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';
import { getProducts, Product } from '@/api/mock/mockProducts';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(3);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [selectedGender, setSelectedGender] = useState<string>(searchParams.get('gender') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    setLoading(true);
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedGender) params.set('gender', selectedGender);
    setSearchParams(params, { replace: true });
  }, [selectedCategory, selectedGender, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedGender) {
      filtered = filtered.filter((p) => p.gender === selectedGender || p.gender === 'unisex');
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = filtered.filter((p) => p.new).concat(filtered.filter((p) => !p.new));
        break;
      default:
        filtered = filtered.filter((p) => p.featured).concat(filtered.filter((p) => !p.featured));
    }

    return filtered;
  }, [products, selectedCategory, selectedGender, priceRange, sortBy]);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'sneakers', label: 'Sneakers' },
    { value: 'boots', label: 'Boots' },
    { value: 'sandals', label: 'Sandals' },
    { value: 'formal', label: 'Formal' },
    { value: 'sports', label: 'Sports' },
  ];

  const genders = [
    { value: '', label: 'All' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedGender('');
    setPriceRange([0, 500]);
    setSortBy('featured');
  };

  const activeFiltersCount = [
    selectedCategory,
    selectedGender,
    priceRange[0] > 0 || priceRange[1] < 500,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="page-container py-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold mb-2"
          >
            {selectedCategory
              ? categories.find((c) => c.value === selectedCategory)?.label
              : 'All Products'}
          </motion.h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      <div className="page-container py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 btn-secondary"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field py-2 px-4 w-auto"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Grid Toggle */}
            <div className="hidden lg:flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 rounded-md transition-colors ${
                  gridCols === 2 ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded-md transition-colors ${
                  gridCols === 3 ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <motion.div
          initial={false}
          animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="bg-card rounded-2xl border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Filters</h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Gender
                </label>
                <div className="flex gap-2">
                  {genders.map((gender) => (
                    <button
                      key={gender.value}
                      onClick={() => setSelectedGender(gender.value)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedGender === gender.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-muted'
                      }`}
                    >
                      {gender.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="flex-1 accent-primary"
                  />
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="flex-1 accent-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Filters Tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {categories.find((c) => c.value === selectedCategory)?.label}
                <button onClick={() => setSelectedCategory('')}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            {selectedGender && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {genders.find((g) => g.value === selectedGender)?.label}
                <button onClick={() => setSelectedGender('')}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-secondary animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No products found</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
              gridCols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
