import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      
      toggleWishlist: (product) => {
        const { wishlist } = get();
        const isExist = wishlist.find((item) => item.id === product.id);
        
        if (isExist) {
          set({
            wishlist: wishlist.filter((item) => item.id !== product.id),
          });
          return false; // Removed
        } else {
          set({
            wishlist: [...wishlist, product],
          });
          return true; // Added
        }
      },

      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some((item) => item.id === productId);
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'vibeshop-wishlist',
    }
  )
);
