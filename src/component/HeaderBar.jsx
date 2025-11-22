import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { CartIconGrey, CartIconPink } from '../svg';

const HeaderBar = ({cartItems}) => {
  return (
    <View style={{paddingHorizontal:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10,  }}>
        <Image
        style={styles.logo}
        source={{
          uri: 'https://images.indianexpress.com/2021/01/myntra.png',
        }}
      />
      <View style={{paddingRight:10}}>
  {cartItems?.length>0 ?
  <View style={{position:'relative'}}>
    <View style={{ borderRadius:'100%', backgroundColor:"#f41bb2", alignItems:'center', justifyContent:'center', position:'absolute', top:-10, right:-10, zIndex:1, width:20, height:20}}>
    <Text style={{color:'white'}}>
        {cartItems?.reduce((accumulator, item) => accumulator + item.count, 0)}
        </Text>
        </View>
      <CartIconPink />
    </View>
    :
      <CartIconGrey />}
    </View>
      </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
});
export default HeaderBar