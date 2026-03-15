import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductCard from '../components/products/ProductCard';
import ProductSkeleton from '../components/products/ProductSkeleton';
import FilterBar from '../components/products/FilterBar';
import SEO from '../components/common/SEO';
import { ShoppingBag } from 'lucide-react';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const urlSort = searchParams.get('sort') || 'featured';
  const urlMinPrice = searchParams.get('min') || '';
  const urlMaxPrice = searchParams.get('max') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(urlSort);
  const [minPrice, setMinPrice] = useState(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);

  // Sync state with URL when parameters change
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSortBy(urlSort);
    setMinPrice(urlMinPrice);
    setMaxPrice(urlMaxPrice);
  }, [urlCategory, urlSort, urlMinPrice, urlMaxPrice]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = Object.fromEntries(searchParams.entries());
    newParams.category = category;
    setSearchParams(newParams);
    
    // Always scroll to products section smoothly when a category/menu is selected
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      setTimeout(() => {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    const newParams = Object.fromEntries(searchParams.entries());
    newParams.sort = sort;
    setSearchParams(newParams);
  };

  const handlePriceChange = (type, value) => {
    const newParams = Object.fromEntries(searchParams.entries());
    if (type === 'min') {
      setMinPrice(value);
      if (value) newParams.min = value;
      else delete newParams.min;
    } else {
      setMaxPrice(value);
      if (value) newParams.max = value;
      else delete newParams.max;
    }
    setSearchParams(newParams);
  };

  // 1. Fetch Products
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // 2. Fetch Categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // 3. Advanced Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const price = Number(product.price);
      const matchesMinPrice = minPrice === '' || price >= Number(minPrice);
      const matchesMaxPrice = maxPrice === '' || price <= Number(maxPrice);
      
      return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
    });

    // Apply Sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high-low':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        // 'featured' - Keep original order or apply custom logic
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy, minPrice, maxPrice]);

  return (
    <>
      <SEO 
        title="Trang Chủ" 
        description="Chào mừng bạn đến với VibeShop - Nơi hội tụ thời trang đẳng cấp và phong cách sống hiện đại." 
      />
      
      {/* Hero section with Compact mode for better visibility on filter */}
      <Hero isCompact={selectedCategory !== 'all'} />
      
      {/* Hide featured categories when filtering to keep UI clean */}
      {selectedCategory === 'all' && <FeaturedCategories />}

      <section className="py-24 bg-slate-50/50 min-h-screen" id="shop">
        <div className="container mx-auto px-6 mb-16">
          <div className="max-w-xl">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 block">Cửa hàng của chúng tôi</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-2 tracking-tight">
              Sản Phẩm <span className="text-secondary text-stroke-primary">Nổi Bật</span>
            </h2>
            <p className="text-slate-500 font-medium">Lựa chọn những thiết kế tinh xảo nhất cho phong cách của bạn.</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <FilterBar 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
        
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : isError ? (
            <div className="text-center py-20 w-full">
              <p className="text-red-500 font-bold">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[48px] border border-dashed border-slate-200">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="text-slate-300" size={40} />
               </div>
               <h3 className="text-2xl font-black text-primary mb-2">Không tìm thấy sản phẩm</h3>
               <p className="text-slate-400">Bạn thử tìm kiếm với từ khóa khác hoặc lọc theo danh mục khác nhé!</p>
               <button 
                  onClick={() => {
                    setSearchQuery(''); 
                    setSelectedCategory('all');
                    setSortBy('featured');
                    setMinPrice('');
                    setMaxPrice('');
                    setSearchParams({});
                  }}
                  className="mt-8 text-secondary font-bold hover:underline"
               >
                 Xóa tất cả bộ lọc
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    name: product.title,
                    price: product.price,
                    category: product.category,
                    isNew: product.id <= 4
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
