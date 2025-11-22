import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductList } from '../component/ProductList'
import AddToCart from './AddToCart'
import FlashMessage from 'react-native-flash-message';
import HeaderBar from '../component/HeaderBar';

const HomeScreen = () => {

  const [productList,setProductList]=useState([]);
  const [loading,setLoading]=useState(false);
  const [cartItems,setCartItems]=useState([]);
  const [showProducts,setShowProducts]=useState(true);

  console.log(cartItems,'cartItems');

const fetchData=async()=>{
  setLoading(true);
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then((data) => {
    setProductList(data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    setLoading(false);
  });}
  
  useEffect(()=>{
fetchData();
  },[])
  return (
    <View>
      <HeaderBar cartItems={cartItems} setShowProducts={setShowProducts} showProducts={showProducts} />
      {loading ? 
      <ActivityIndicator size="large" color="#f41bb2" />:
      <>
      {showProducts && <ProductList productList={productList} setCartItems={setCartItems} cartItems={cartItems} />}
      {!showProducts && <AddToCart cartItems={cartItems} setCartItems={setCartItems} />}
      </>
      }
             <FlashMessage position="top" /> 
      
    </View>
  )
}

export default HomeScreen