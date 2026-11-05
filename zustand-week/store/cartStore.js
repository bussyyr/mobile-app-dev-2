import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
export const useCartStore = create(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product) =>
                set((state) => {
                    const exists = state.cart.some(
                        (item) => item.id === product.id
                    );

                    return {
                        cart: exists
                            ? state.cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            )
                            : [...state.cart, { ...product, quantity: 1 }],
                    };
                }),
            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart
                        .map((item) =>
                            item.id === id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ cart: state.cart }),
        }
    )
);