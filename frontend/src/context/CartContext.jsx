import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = '', color = '') => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => 
          item._id === product._id && 
          item.size === size && 
          item.color === color
      );

      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity,
            size,
            color,
            cartId: `${product._id}-${size}-${color}`
          }
        ];
      }
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);

//   // ✅ Fetch cart when logged in
//   useEffect(() => {
//     if (user?._id) {
//       fetchCartFromBackend(user._id);
//     } else {
//       setCart([]);
//     }
//   }, [user]);

//   // ✅ Get user's cart
//   const fetchCartFromBackend = async (userId) => {
//     try {
//       const { data } = await axios.get(`/api/cart/${userId}`);
//       setCart(data.items || []);
//     } catch (err) {
//       console.log("Cart fetch error:", err);
//     }
//   };

//   // ✅ Add to cart
//   const addToCart = async (product, qty = 1) => {
//     if (!user) return toast.error("Login to add items");

//     try {
//       const { data } = await axios.post("/api/cart/add", {
//         userId: user._id,
//         productId: product._id,
//         quantity: qty,
//       });

//       setCart(data.items);
//     } catch (err) {
//       console.log("Add cart error:", err);
//     }
//   };

//   // ✅ Remove item
//   const removeFromCart = async (productId) => {
//     try {
//       const { data } = await axios.post("/api/cart/remove", {
//         userId: user._id,
//         productId,
//       });

//       setCart(data.items);
//     } catch (err) {
//       console.log("Remove cart error:", err);
//     }
//   };

//   // ✅ Clear cart
//   const clearCart = async () => {
//     try {
//       await axios.post(`/api/cart/clear`, { userId: user._id });
//       setCart([]);
//     } catch (err) {
//       console.log("Clear cart error:", err);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
