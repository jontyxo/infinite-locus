import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import React from 'react';
import { BackIconPink, CartIconGrey, CartIconPink } from '../svg';
import { showMessage } from 'react-native-flash-message';



const HeaderBar = ({ cartItems, setShowProducts, showProducts }) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      }}
    > 
   {!showProducts &&  <View style={{ backgroundColor:'#f41bb2',  borderRadius:'100%',padding:6 }}>
     <Pressable onPress={()=>setShowProducts(true)}> <BackIconPink />  </Pressable>
      </View>  }
    
      <Image
        style={styles.logo}
        source={{
          uri: 'https://images.indianexpress.com/2021/01/myntra.png',
        }}
      />
      <View style={{ paddingRight: 10 }}>
        {cartItems?.length > 0 ? (
          <View style={{ position: 'relative' }}>
            <Pressable
              onPress={() => {
                if (showProducts) setShowProducts(false);
              }}
            >
              <View
                style={{
                  borderRadius: '100%',
                  backgroundColor: '#f41bb2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  zIndex: 1,
                  width: 20,
                  height: 20,
                }}
              >
                <Text style={{ color: 'white' }}>
                  {cartItems?.reduce(
                    (accumulator, item) => accumulator + item.count,
                    0,
                  )}
                </Text>
              </View>
              <CartIconPink />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={()=>{
            if(showProducts) {

            
             showMessage({
            message: 'Please add items to cart first',
            type: 'success',
            backgroundColor: '#D34E4E',
          });
        }
          }}>
          <CartIconGrey  />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
});
export default HeaderBar;
