import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import React from 'react';
import {
  MinusGreyIcon,
  MinusIconPink,
  PlusIconPink,
} from '../svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addToCart, removeFromCart } from '../../utils';
const { width } = Dimensions.get('window');
const useWidth = width - width * 0.15;

const AddToCart = ({ cartItems, setCartItems }) => {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 12,
          margin: 12,
          width: useWidth,
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
                  addToCart(item, cartItems, setCartItems);
                }}
              >
                <PlusIconPink />
              </Pressable>
              <Text>
                {cartItems?.find(citem => citem?.id === item?.id)?.count ?? 0}
              </Text>

              {cartItems?.find(citem => citem?.id === item?.id)?.count ? (
                <Pressable
                  onPress={() => {
                    removeFromCart(item, cartItems, setCartItems);
                  }}
                >
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
    <SafeAreaView
      style={{
        paddingBottom: 600,
      }}
    >
      <View
        style={{
          width: useWidth / 1,
          paddingHorizontal: 46,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 700 }}>Checkout Section</Text>
        <Text>
          Total Items:{' '}
          {cartItems?.reduce(
            (accumulator, item) => accumulator + item.count,
            0,
          )}
        </Text>
        <Text>
          Total Price: $
          {cartItems
            ?.reduce(
              (accumulator, item) => accumulator + item.count * item.price,
              0,
            )
            .toFixed(2)}
        </Text>
        <View
          style={{
            backgroundColor: '#f41bb2',
            padding: 12,
            borderRadius: 8,
            marginTop: 20,
            width: 120,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '700' }}>
            Proceed to Pay
          </Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        ListEmptyComponent={<Text>No Items in Cart </Text>}
      />
    </SafeAreaView>
  );
};

export default AddToCart;
