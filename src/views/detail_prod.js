import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import addProductFav from "../components/addProductFav";
import deleteProducFav from "../components/deleteProducFav";
import { STORAGE_KEYS } from "../config/config";

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
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
				<Text style={{ color: "#666" }}>No hay información del producto.</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			<View style={{ backgroundColor: "#fff", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#eee" }}>
				<Image
					source={{ uri: product.image }}
					resizeMode="contain"
					style={{ width: "100%", height: 240, marginBottom: 12 }}
				/>
				<Text style={{ fontSize: 20, fontWeight: "700", color: "#222" }}>{product.title}</Text>
				<Text style={{ marginTop: 8, fontSize: 22, fontWeight: "700", color: "#355DA8" }}>
					${product.price}
				</Text>
				<Text style={{ marginTop: 10, color: "#666", textTransform: "capitalize" }}>
					Categoría: {product.category}
				</Text>
				<Text style={{ marginTop: 14, lineHeight: 22, color: "#444" }}>
					{product.description}
				</Text>

				<View style={{ flexDirection: "row", gap: 10, marginTop: 18 }}>
					<TouchableOpacity
						onPress={onPressAddToCart}
						style={{
							flex: isInCart ? 1 : 0,
							backgroundColor: "#355DA8",
							paddingVertical: 12,
							borderRadius: 10,
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "row",
							gap: 8,
						}}
					>
						<Ionicons name="cart-outline" size={18} color="#fff" />
						<Text style={{ color: "#fff", fontWeight: "700" }}>
							{isInCart ? "Agregar otro" : "Agregar al carrito"}
						</Text>
					</TouchableOpacity>

					{isInCart ? (
						<TouchableOpacity
							onPress={onPressRemoveFromCart}
							style={{
								flex: 1,
								backgroundColor: "#E74C3C",
								paddingVertical: 12,
								borderRadius: 10,
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "row",
								gap: 8,
							}}
						>
							<Ionicons name="trash-outline" size={18} color="#fff" />
							<Text style={{ color: "#fff", fontWeight: "700" }}>
								Quitar del carrito
							</Text>
						</TouchableOpacity>
					) : null}
				</View>
			</View>
		</ScrollView>
	);
}
