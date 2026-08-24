import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // ── Scene / Navigation ──────────────────────────────
  currentPage: 0,
  isLoading: true,
  loadingProgress: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setLoading: (v) => set({ isLoading: v }),
  setLoadingProgress: (p) => set({ loadingProgress: p }),

  // ── Configurator ─────────────────────────────────────
  selectedColor: 'frozen_grey',
  selectedWheel: 'star_spoke_20',
  selectedBrake: 'gold',
  selectedModel: 'sedan',
  isExploded: false,
  showInterior: false,
  colors: {
    frozen_grey:   { label: 'Frozen Deep Grey',    hex: '#3a3d42', metalness: 0.95, roughness: 0.12 },
    isle_green:    { label: 'Isle of Man Green',    hex: '#1b4332', metalness: 0.9,  roughness: 0.14 },
    sao_yellow:    { label: 'Sao Paulo Yellow',     hex: '#f5c518', metalness: 0.85, roughness: 0.1  },
    marina_blue:   { label: 'Marina Bay Blue',      hex: '#0d3b6e', metalness: 0.95, roughness: 0.1  },
  },
  setSelectedColor: (c) => set({ selectedColor: c }),
  setSelectedWheel: (w) => set({ selectedWheel: w }),
  setSelectedBrake: (b) => set({ selectedBrake: b }),
  setSelectedModel: (m) => set({ selectedModel: m }),
  setIsExploded: (v) => set({ isExploded: v }),
  setShowInterior: (v) => set({ showInterior: v }),

  // ── Cart ─────────────────────────────────────────────
  cartItems: [],
  cartOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  addToCart: (item) => set((state) => {
    const existing = state.cartItems.find(i => i.id === item.id);
    if (existing) return {};
    return { cartItems: [...state.cartItems, item] };
  }),
  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter(i => i.id !== id),
  })),
  cartTotal: () => get().cartItems.reduce((sum, i) => sum + i.price, 0),

  // ── Electric / Page 3 ────────────────────────────────
  chargeLevel: 80,
  driveMode: 'sport',
  temperature: 22,
  setChargeLevel: (v) => set({ chargeLevel: v }),
  setDriveMode: (m) => set({ driveMode: m }),
  setTemperature: (t) => set({ temperature: t }),

  // ── Cockpit / Page 4 ─────────────────────────────────
  skyMode: 'day',
  accentColor: '#00d4ff',
  setSkyMode: (m) => set({ skyMode: m }),
  setAccentColor: (c) => set({ accentColor: c }),

  // ── Aero / Page 5 ────────────────────────────────────
  wingAngle: 15,
  flapsOpen: false,
  diffuserActive: true,
  setWingAngle: (a) => set({ wingAngle: a }),
  setFlapsOpen: (v) => set({ flapsOpen: v }),
  setDiffuserActive: (v) => set({ diffuserActive: v }),

  // ── Vault / Page 6 ────────────────────────────────────
  vaultUnlocked: false,
  orderPlaced: false,
  vinCode: '',
  setVaultUnlocked: (v) => set({ vaultUnlocked: v }),
  setOrderPlaced: (v) => set({ orderPlaced: v }),
  setVinCode: (c) => set({ vinCode: c }),
}));
