import React, { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios/dist/axios.min.js";

import { ENDPOINTS, STORAGE_KEYS } from "../config/config";

export default function Products() {
	const [products, setProducts] = useState([]);
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const loadUser = async () => {
		const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.authUser);
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setUsername(parsedUser?.username || "");
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
			setProducts(Array.isArray(data) ? data : []);
		} catch (error) {
			setProducts([]);
		} finally {
			setIsLoading(false);
			setIsRefreshing(false);
		}
	};

	const onRefresh = useCallback(() => {
		loadProducts(true);
	}, []);

	useEffect(() => {
		loadUser();
		loadProducts();
	}, []);

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 12,
				}}
			>
				<View>
					<Text style={{ fontSize: 20, fontWeight: "700" }}>Productos</Text>
					<Text style={{ color: "#666", marginTop: 2 }}>
						{username ? `Usuario: ${username}` : "Sesión activa"}
					</Text>
				</View>
			</View>

			{isLoading ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<FlatList
					data={products}
					keyExtractor={(item) => String(item.id)}
					refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
					renderItem={({ item }) => (
						<View
							style={{
								backgroundColor: "#fff",
								borderWidth: 1,
								borderColor: "#eee",
								borderRadius: 10,
								padding: 12,
								marginBottom: 10,
							}}
						>
							<Text style={{ fontSize: 15, fontWeight: "600" }}>{item.title}</Text>
							<Text style={{ marginTop: 4, color: "#355DA8", fontWeight: "700" }}>
								${item.price}
							</Text>
						</View>
					)}
					ListEmptyComponent={
						<Text style={{ textAlign: "center", color: "#666", marginTop: 24 }}>
							No hay productos para mostrar.
						</Text>
					}
				/>
			)}
		</View>
	);
}
