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
import {addToCart,removeFromCart} from '../../utils.js';
const { width } = Dimensions.get('window');
const { PlusIconPink, MinusIconPink, MinusGreyIcon } = require('../svg');

const useWidth = width - width * 0.15;

export const ProductList = ({ productList, cartItems, setCartItems }) => {



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
                  addToCart(item,cartItems,setCartItems);
                }}
              >
                <PlusIconPink />
              </Pressable>
              <Text>
                {cartItems?.find(citem => citem?.id === item?.id)?.count ?? 0}
              </Text>

              {cartItems?.find(citem => citem?.id === item?.id)?.count ? (
                <Pressable onPress={() => removeFromCart(item,cartItems,setCartItems)}>
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
          paddingBottom:200
        }}
        data={productList}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
      />
    </View>
  );
};
