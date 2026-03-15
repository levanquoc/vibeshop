import { Search } from 'lucide-react';

const FilterBar = ({ categories, selectedCategory, onSelectCategory, searchQuery, onSearchChange }) => {
  return (
    <div className="container mx-auto px-6 mb-12">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2 scrollbar-none w-full lg:w-auto">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-xl shadow-primary/20'
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            Tất cả
          </button>
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all capitalize whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-xl shadow-primary/20'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white border border-slate-100 py-4 pl-14 pr-6 rounded-[24px] font-medium text-primary focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
