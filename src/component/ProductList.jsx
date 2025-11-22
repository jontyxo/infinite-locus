import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import { showMessage } from 'react-native-flash-message';
const { width } = Dimensions.get('window');
const { PlusIconPink, MinusIconPink, MinusGreyIcon } = require('../svg');

const useWidth = width - width * 0.15;

export const ProductList = ({ productList, cartItems, setCartItems }) => {
  const addToCart = item => {
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

  const removeFromCart = item => {
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

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 12,
          width: useWidth / 2,
          margin: 12,
          //   backgroundColor: '#e2rgba(139, 137, 137, 1)'
        }}
      >
        <View
          style={{
            backgroundColor: '#e2e2e2ff',
            paddingVertical: 12,
            paddingHorizontal: 4,
            borderRadius: 8,
          }}
        >
          <Image
            src={item?.image}
            style={{
              width: useWidth / 2 - 32,
              height: 200,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 12 }}>{item?.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}
          >
            <Text style={{ fontWeight: 700 }}>${item?.price}</Text>
            <View
              style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}
            >
              <Pressable
                onPress={() => {
                  addToCart(item);
                }}
              >
                <PlusIconPink />
              </Pressable>
              <Text>
                {cartItems?.find(citem => citem?.id === item?.id)?.count ?? 0}
              </Text>

              {cartItems?.find(citem => citem?.id === item?.id)?.count ? (
                <Pressable onPress={() => removeFromCart(item)}>
                  <MinusIconPink />
                </Pressable>
              ) : (
                <MinusGreyIcon />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
        data={productList}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
      />
    </View>
  );
};
