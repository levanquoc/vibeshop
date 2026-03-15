import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const FilterBar = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  sortBy,
  onSortChange,
  minPrice,
  maxPrice,
  onPriceChange
}) => {
  return (
    <div className="container mx-auto px-6 mb-12">
      <div className="flex flex-col gap-8">
        {/* First Row: Categories & Search */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2 scrollbar-none w-full lg:w-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory('all')}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap relative ${
                selectedCategory === 'all'
                  ? 'text-white'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              {selectedCategory === 'all' && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-2xl -z-10 shadow-xl shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              Tất cả
            </motion.button>
            
            {categories?.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectCategory(cat)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all capitalize whitespace-nowrap relative ${
                  selectedCategory === cat
                    ? 'text-white'
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-primary rounded-2xl -z-10 shadow-xl shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full lg:max-w-md"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border border-slate-100 py-4 pl-14 pr-6 rounded-[24px] font-medium text-primary focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all shadow-sm"
            />
          </motion.div>
        </div>

        {/* Second Row: Sorting & Price Range */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-6 border-t border-slate-100"
        >
          {/* Sorting Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1">
            <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest whitespace-nowrap ml-1">Sắp xếp theo</span>
            <select 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full sm:w-auto bg-white border border-slate-100 px-5 py-3.5 rounded-2xl font-bold text-sm text-primary focus:outline-none focus:border-secondary transition-all cursor-pointer shadow-sm appearance-none"
            >
              <option value="featured">✨ Nổi bật nhất</option>
              <option value="price-low-high">💰 Giá: Thấp đến Cao</option>
              <option value="price-high-low">💎 Giá: Cao đến Thấp</option>
              <option value="rating">⭐️ Đánh giá cao nhất</option>
            </select>
          </div>

          {/* Price Range Inputs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1 justify-end">
            <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest whitespace-nowrap ml-1">Khoảng giá ($)</span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input 
                type="number" 
                placeholder="Từ"
                value={minPrice}
                onChange={(e) => onPriceChange('min', e.target.value)}
                className="w-full sm:w-24 bg-white border border-slate-100 px-4 py-3.5 rounded-2xl font-bold text-sm text-primary focus:outline-none focus:border-secondary transition-all shadow-sm"
              />
              <span className="text-slate-300 font-bold">-</span>
              <input 
                type="number" 
                placeholder="Đến"
                value={maxPrice}
                onChange={(e) => onPriceChange('max', e.target.value)}
                className="w-full sm:w-24 bg-white border border-slate-100 px-4 py-3.5 rounded-2xl font-bold text-sm text-primary focus:outline-none focus:border-secondary transition-all shadow-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FilterBar;
