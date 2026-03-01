import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { STORAGE_KEYS } from "../config/config";
import { stylesCart } from "../styles/style01";

const generatePurchaseCode = () => {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  const time = Date.now().toString(36).slice(-4).toUpperCase();
  return `ORD-${time}-${random}`;
};

export default function Carrito({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [purchaseCode, setPurchaseCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(cartItems.map((item) => item?.category).filter(Boolean)),
    );
    return unique;
  }, [cartItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") {
      return cartItems;
    }
    return cartItems.filter((item) => item?.category === selectedCategory);
  }, [cartItems, selectedCategory]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const quantity = Number(item?.quantity || 1);
      const price = Number(item?.price || 0);
      return acc + price * quantity;
    }, 0);
  }, [cartItems]);

  const loadCart = async (refreshing = false) => {
    if (refreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.cartItems);
      const parsed = raw ? JSON.parse(raw) : [];
      const items = Array.isArray(parsed)
        ? parsed.map((item) => ({
            ...item,
            quantity: Number(item?.quantity || 1),
            category: item?.category || "sin categoría",
          }))
        : [];
      setCartItems(items);
      setPurchaseCode(items.length > 0 ? generatePurchaseCode() : "");
    } catch (error) {
      setCartItems([]);
      setPurchaseCode("");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    loadCart(true);
  };

  const onPressConfirmPurchase = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrito", "No hay productos para comprar.");
      return;
    }

    try {
      const code = generatePurchaseCode();
      const historyRaw = await AsyncStorage.getItem(
        STORAGE_KEYS.purchaseHistory,
      );
      const parsedHistory = historyRaw ? JSON.parse(historyRaw) : [];
      const history = Array.isArray(parsedHistory) ? parsedHistory : [];

      const purchase = {
        code,
        date: new Date().toISOString(),
        total: Number(totalAmount.toFixed(2)),
        items: cartItems,
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.purchaseHistory,
        JSON.stringify([purchase, ...history]),
      );
      await AsyncStorage.setItem(STORAGE_KEYS.cartItems, JSON.stringify([]));

      setCartItems([]);
      setPurchaseCode("");
      Alert.alert("Compra realizada", `Código de compra: ${code}`);
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar la compra.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, []),
  );

  return (
    <View style={stylesCart.container}>
      <View style={stylesCart.headerRow}>
        <View style={stylesCart.headerIconWrap}>
          <MaterialCommunityIcons
            name="cart-outline"
            style={stylesCart.headerIcon}
          />
        </View>
        <View>
          <Text style={stylesCart.title}>Carrito</Text>
          <Text style={stylesCart.subTitle}>Productos agregados</Text>
        </View>
      </View>

      <View style={stylesCart.divider} />

      {isLoading ? (
        <View style={stylesCart.loadingWrap}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={stylesCart.listContent}
          ListHeaderComponent={
            <View>
              <View style={stylesCart.filterTitleRow}>
                <Text style={stylesCart.filterEmoji}>🏷️</Text>
                <Text style={stylesCart.filterTitle}>Categoría</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={stylesCart.filterScrollContent}
              >
                <TouchableOpacity
                  onPress={() => setSelectedCategory("all")}
                  style={[
                    stylesCart.filterChip,
                    selectedCategory === "all"
                      ? stylesCart.filterChipActive
                      : stylesCart.filterChipInactive,
                  ]}
                >
                  <Text
                    style={[
                      stylesCart.filterChipText,
                      selectedCategory === "all"
                        ? stylesCart.filterChipTextActive
                        : stylesCart.filterChipTextInactive,
                    ]}
                    numberOfLines={2}
                  >
                    Todas
                  </Text>
                </TouchableOpacity>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[
                      stylesCart.filterChip,
                      selectedCategory === category
                        ? stylesCart.filterChipActive
                        : stylesCart.filterChipInactive,
                    ]}
                  >
                    <Text
                      style={[
                        stylesCart.filterChipText,
                        selectedCategory === category
                          ? stylesCart.filterChipTextActive
                          : stylesCart.filterChipTextInactive,
                      ]}
                      numberOfLines={2}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailProd", { product: item })
              }
              style={stylesCart.card}
            >
              <Image
                source={{ uri: item.image }}
                resizeMode="contain"
                style={stylesCart.cardImage}
              />
              <Text style={stylesCart.codeText}>Código: #{item.id}</Text>
              <Text numberOfLines={2} style={stylesCart.cardTitle}>
                {item.title}
              </Text>
              <Text style={stylesCart.cardInfo}>
                Cant: {item.quantity || 1}
              </Text>
              <Text style={stylesCart.cardInfo}>
                Categoría: {item.category || "-"}
              </Text>
              <Text style={stylesCart.cardPrice}>
                Subtotal: $
                {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(
                  2,
                )}
              </Text>
            </TouchableOpacity>
          )}
          columnWrapperStyle={stylesCart.columnWrap}
          ListEmptyComponent={
            <Text style={stylesCart.emptyText}>
              No hay productos en el carrito.
            </Text>
          }
          ListFooterComponent={
            cartItems.length > 0 ? (
              <View style={stylesCart.summaryCard}>
                <Text style={stylesCart.summaryTitle}>Resumen de compra</Text>
                <Text style={stylesCart.summaryText}>
                  Productos: {cartItems.length}
                </Text>
                <Text style={stylesCart.summaryText}>
                  Código RNG: {purchaseCode || generatePurchaseCode()}
                </Text>
                <Text style={stylesCart.summaryTotal}>
                  Total: ${totalAmount.toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={stylesCart.confirmButton}
                  onPress={onPressConfirmPurchase}
                >
                  <Text style={stylesCart.confirmButtonText}>
                    Confirmar compra
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
