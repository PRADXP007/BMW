import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // Cart
  cartItems: [],
  cartOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  addToCart: (item) => set((state) => {
    if (state.cartItems.find(i => i.id === item.id)) return {};
    return { cartItems: [...state.cartItems, item] };
  }),
  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter(i => i.id !== id),
  })),

  // Config
  selectedColor: 'frozen_grey',
  selectedModel: 'sedan',
  colors: {
    frozen_grey: { label: 'Frozen Deep Grey', hex: '#3a3d42' },
    isle_green:  { label: 'Isle of Man Green', hex: '#1b4332' },
    sao_yellow:  { label: 'Sao Paulo Yellow',  hex: '#f5c518' },
    marina_blue: { label: 'Marina Bay Blue',   hex: '#0d3b6e' },
  },
  setSelectedColor: (c) => set({ selectedColor: c }),
  setSelectedModel: (m) => set({ selectedModel: m }),

  // Loader
  isLoading: true,
  loadingProgress: 0,
  setLoading: (v) => set({ isLoading: v }),
  setLoadingProgress: (p) => set({ loadingProgress: p }),
}));
