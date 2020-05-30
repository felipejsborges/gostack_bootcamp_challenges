import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
  clearCart(): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const getFromStorage = await AsyncStorage.getItem('@Gomarket:products');
      const productsFromStorage = JSON.parse(getFromStorage as string);
      if (!productsFromStorage) return;
      setProducts(productsFromStorage);
    }
    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const productHandled = {
        id: product.id,
        title: product.title,
        image_url: product.image_url,
        price: product.price,
        quantity: 1,
      };
      const productExists = products.find(
        item => item.id === productHandled.id,
      );

      if (!productExists) {
        setProducts([...products, productHandled]);
      } else {
        const productsUpdated = products.map(item => {
          if (item.id === productExists.id) {
            const productToAdd = {
              id: item.id,
              title: item.title,
              image_url: item.image_url,
              price: item.price,
              quantity: item.quantity + 1,
            };
            return productToAdd;
          }
          return item;
        });
        setProducts(productsUpdated);
      }
      await AsyncStorage.clear();
      await AsyncStorage.setItem(
        '@Gomarket:products',
        JSON.stringify(products),
      );
    },

    [products],
  );

  const increment = useCallback(
    async id => {
      const productsUpdated = products.map(item => {
        if (item.id === id) {
          const productToAdd = {
            id: item.id,
            title: item.title,
            image_url: item.image_url,
            price: item.price,
            quantity: item.quantity + 1,
          };
          return productToAdd;
        }
        return item;
      });
      setProducts(productsUpdated);
      await AsyncStorage.clear();
      await AsyncStorage.setItem(
        '@Gomarket:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productsUpdated = products.map(item => {
        if (item.id === id) {
          const productToAdd = {
            id: item.id,
            title: item.title,
            image_url: item.image_url,
            price: item.price,
            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
          };
          return productToAdd;
        }
        return item;
      });
      setProducts(productsUpdated);
      await AsyncStorage.clear();
      await AsyncStorage.setItem(
        '@Gomarket:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const clearCart = useCallback(async () => {
    setProducts([]);
    await AsyncStorage.clear();
    await AsyncStorage.setItem('@Gomarket:products', JSON.stringify(products));
  }, [products]);

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, clearCart, products }),
    [products, addToCart, increment, decrement, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
