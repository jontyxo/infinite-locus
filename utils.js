import { showMessage } from "react-native-flash-message";

export   const addToCart = (item, cartItems,setCartItems) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);
    if (isItemInCart) {
      if (isItemInCart.count >= 9) {
        showMessage({
          message: 'Cannot add more than 9 items of the same product',
          type: 'error',
          backgroundColor: '#D34E4E',
        });
        return;
      }
      setCartItems(prev => {
        return prev.map(cartItem => {
          if (cartItem.id === item.id) {
            return { ...cartItem, count: cartItem.count + 1 };
          }
          return cartItem;
        });
      });
    } else {
      setCartItems([...cartItems, { count: 1, ...item }]);
    }
    showMessage({
      message: 'Item added to cart',
      type: 'success',
      backgroundColor: '#f41bb2',
    });
  };

  export  const removeFromCart = (item,cartItems,setCartItems) => {
      const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);
      if (isItemInCart) {
        if (isItemInCart.count <= 1) {
          setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id));
          showMessage({
            message: 'Item removed from cart',
            type: 'success',
            backgroundColor: '#f41bb2',
          });
          return;
        }
  
        setCartItems(prev => {
          return prev.map(cartItem => {
            if (cartItem.id === item.id) {
              return { ...cartItem, count: cartItem.count - 1 };
            }
            return cartItem;
          });
        });
        showMessage({
          message: 'Item removed from cart',
          type: 'success',
          backgroundColor: '#f41bb2',
        });
      } else {
        return;
      }
    };
  