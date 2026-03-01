import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import addProductFav from "../components/addProductFav";
import deleteProducFav from "../components/deleteProducFav";
import { STORAGE_KEYS } from "../config/config";
import { stylesDetail } from "../styles/style01";

export default function DetailProd({ route }) {
  const product = route?.params?.product;
  const [isInCart, setIsInCart] = useState(false);

  const loadCartState = async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.cartItems);
    const parsed = raw ? JSON.parse(raw) : [];
    const cartItems = Array.isArray(parsed) ? parsed : [];
    setIsInCart(cartItems.some((item) => item?.id === product?.id));
  };

  const onPressRemoveFromCart = async () => {
    try {
      await deleteProducFav(product.id);
      setIsInCart(false);
      Alert.alert("Carrito", "Producto eliminado del carrito.");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar del carrito.");
    }
  };

  const onPressAddToCart = async () => {
    try {
      await addProductFav(product);
      setIsInCart(true);
      Alert.alert("Carrito", "Producto agregado al carrito.");
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar el producto al carrito.");
    }
  };

  useEffect(() => {
    if (product?.id) {
      loadCartState();
    }
  }, [product?.id]);

  if (!product) {
    return (
      <View style={stylesDetail.emptyWrap}>
        <Text style={stylesDetail.emptyText}>
          No hay información del producto.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={stylesDetail.container}>
      <View style={stylesDetail.card}>
        <Image
          source={{ uri: product.image }}
          resizeMode="contain"
          style={stylesDetail.image}
        />
        <Text style={stylesDetail.title}>{product.title}</Text>
        <Text style={stylesDetail.price}>${product.price}</Text>
        <Text style={stylesDetail.category}>Categoría: {product.category}</Text>
        <Text style={stylesDetail.description}>{product.description}</Text>

        <View style={stylesDetail.actionsRow}>
          <TouchableOpacity
            onPress={onPressAddToCart}
            style={[
              stylesDetail.addButton,
              isInCart
                ? stylesDetail.addButtonShared
                : stylesDetail.addButtonSingle,
            ]}
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={stylesDetail.addButtonText}>
              {isInCart ? "Agregar otro" : "Agregar al carrito"}
            </Text>
          </TouchableOpacity>

          {isInCart ? (
            <TouchableOpacity
              onPress={onPressRemoveFromCart}
              style={stylesDetail.removeButton}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text style={stylesDetail.removeButtonText}>
                Quitar del carrito
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}
