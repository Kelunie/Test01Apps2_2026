import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
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
import axios from "axios/dist/axios.min.js";

import { ENDPOINTS, STORAGE_KEYS } from "../config/config";
import { stylesProducts } from "../styles/style01";

export default function Products({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.authUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setDisplayName(parsedUser?.fullName || parsedUser?.username || "");
    }
  };

  const loadProducts = async (refreshing = false) => {
    if (refreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const { data } = await axios.get(ENDPOINTS.products.list);
      const { data: categoryData } = await axios.get(
        ENDPOINTS.products.categories,
      );
      setProducts(Array.isArray(data) ? data : []);
      setCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      setProducts([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter((item) => item?.category === selectedCategory);
  }, [products, selectedCategory]);

  const onRefresh = useCallback(() => {
    loadProducts(true);
  }, []);

  useEffect(() => {
    loadUser();
    loadProducts();
  }, []);

  return (
    <View style={stylesProducts.container}>
      <View style={stylesProducts.headerRow}>
        <View style={stylesProducts.logoCircle}>
          <MaterialCommunityIcons
            name="storefront-outline"
            style={stylesProducts.logoIcon}
          />
        </View>
        <View>
          <Text style={stylesProducts.title}>Fake Store</Text>
          <Text style={stylesProducts.name}>
            {displayName ? `Nombre: ${displayName}` : "Sesión activa"}
          </Text>
        </View>
      </View>

      <View style={stylesProducts.divider} />

      {isLoading ? (
        <View style={stylesProducts.loadingWrap}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={stylesProducts.productListContent}
          ListHeaderComponent={
            <View>
              <View style={stylesProducts.filterTitleRow}>
                <Text style={stylesProducts.filterEmoji}>🏷️</Text>
                <Text style={stylesProducts.filterTitle}>Categoría</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={stylesProducts.filterScrollContent}
              >
                <TouchableOpacity
                  onPress={() => setSelectedCategory("all")}
                  style={[
                    stylesProducts.filterChip,
                    selectedCategory === "all"
                      ? stylesProducts.filterChipActive
                      : stylesProducts.filterChipInactive,
                  ]}
                >
                  <Text
                    style={[
                      stylesProducts.filterChipText,
                      selectedCategory === "all"
                        ? stylesProducts.filterChipTextActive
                        : stylesProducts.filterChipTextInactive,
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
                      stylesProducts.filterChip,
                      selectedCategory === category
                        ? stylesProducts.filterChipActive
                        : stylesProducts.filterChipInactive,
                    ]}
                  >
                    <Text
                      style={[
                        stylesProducts.filterChipText,
                        selectedCategory === category
                          ? stylesProducts.filterChipTextActive
                          : stylesProducts.filterChipTextInactive,
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
            <View style={stylesProducts.productCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailProd", { product: item })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  resizeMode="contain"
                  style={stylesProducts.productImage}
                />
                <Text numberOfLines={2} style={stylesProducts.productTitle}>
                  {item.title}
                </Text>
                <Text style={stylesProducts.productPrice}>${item.price}</Text>
              </TouchableOpacity>
            </View>
          )}
          columnWrapperStyle={stylesProducts.columnWrap}
          ListEmptyComponent={
            <Text style={stylesProducts.emptyText}>
              No hay productos para mostrar.
            </Text>
          }
        />
      )}
    </View>
  );
}
