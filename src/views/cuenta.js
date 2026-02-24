import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios/dist/axios.min.js";

import { ENDPOINTS, STORAGE_KEYS } from "../config/config";

export default function Cuenta() {
	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [userInfo, setUserInfo] = useState(null);
	const [history, setHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigation = useNavigation();

	const loadUser = async () => {
		setIsLoading(true);
		try {
			const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.authUser);
			const parsedUser = storedUser ? JSON.parse(storedUser) : null;
			const localUsername = parsedUser?.username || "";
			const localUserId = parsedUser?.id || null;
			setUsername(localUsername);
			setDisplayName(parsedUser?.fullName || localUsername);

			const historyRaw = await AsyncStorage.getItem(STORAGE_KEYS.purchaseHistory);
			const parsedHistory = historyRaw ? JSON.parse(historyRaw) : [];
			setHistory(Array.isArray(parsedHistory) ? parsedHistory : []);

			let apiUser = null;

			if (localUserId) {
				const { data } = await axios.get(ENDPOINTS.users.detail(localUserId));
				apiUser = data || null;
			} else if (localUsername) {
				const { data } = await axios.get(ENDPOINTS.users.list);
				if (Array.isArray(data)) {
					apiUser = data.find((item) => item?.username === localUsername) || null;
				}
			}

			if (apiUser) {
				const firstName = apiUser?.name?.firstname || "";
				const lastName = apiUser?.name?.lastname || "";
				const apiFullName = `${firstName} ${lastName}`.trim() || localUsername;
				setDisplayName(apiFullName);
				setUserInfo(apiUser);

				await AsyncStorage.setItem(
					STORAGE_KEYS.authUser,
					JSON.stringify({
						id: apiUser?.id || localUserId,
						username: apiUser?.username || localUsername,
						fullName: apiFullName,
					})
				);
			} else {
				setUserInfo(null);
			}
		} catch (error) {
			setUserInfo(null);
			setHistory([]);
		} finally {
			setIsLoading(false);
		}
	};

	const onPressLogOut = async () => {
		await AsyncStorage.multiRemove([STORAGE_KEYS.authToken, STORAGE_KEYS.authUser]);
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: "LogIn" }],
			})
		);
	};

	useEffect(() => {
		loadUser();
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
			<Text style={{ fontSize: 24, fontWeight: "700" }}>Cuenta</Text>
			<Text style={{ fontSize: 16, color: "#666" }}>
				Usuario: {displayName || "Sin datos"}
			</Text>

			<View style={{ borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 10, padding: 12 }}>
				<Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
					Mis datos
				</Text>
				{userInfo ? (
					<>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Usuario</Text>
							<Text style={{ color: "#555" }}>{userInfo?.username || "-"}</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Nombre completo</Text>
							<Text style={{ color: "#555" }}>
								{`${userInfo?.name?.firstname || ""} ${userInfo?.name?.lastname || ""}`.trim() || "-"}
							</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Correo electrónico</Text>
							<Text style={{ color: "#555" }}>{userInfo?.email || "-"}</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Teléfono</Text>
							<Text style={{ color: "#555" }}>{userInfo?.phone || "-"}</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Ciudad</Text>
							<Text style={{ color: "#555" }}>{userInfo?.address?.city || "-"}</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Calle</Text>
							<Text style={{ color: "#555" }}>{userInfo?.address?.street || "-"}</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Número</Text>
							<Text style={{ color: "#555" }}>{String(userInfo?.address?.number || "-")}</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Código postal</Text>
							<Text style={{ color: "#555" }}>{userInfo?.address?.zipcode || "-"}</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Latitud</Text>
							<Text style={{ color: "#555" }}>{userInfo?.address?.geolocation?.lat || "-"}</Text>
						</View>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontWeight: "700", color: "#355DA8" }}>Longitud</Text>
							<Text style={{ color: "#555" }}>{userInfo?.address?.geolocation?.long || "-"}</Text>
						</View>
					</>
				) : (
					<Text style={{ color: "#666" }}>
						No se encontró información del usuario en la API.
					</Text>
				)}
			</View>

			<View style={{ borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 10, padding: 12 }}>
				<Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
					Historial de compras (local)
				</Text>
				{history.length === 0 ? (
					<Text style={{ color: "#666" }}>Aún no hay compras registradas.</Text>
				) : (
					history.map((item, index) => (
						<View key={`${index}-${item?.date || "item"}`} style={{ marginBottom: 8 }}>
							<Text style={{ fontWeight: "700" }}>
								Compra #{index + 1}
							</Text>
							<Text style={{ color: "#555" }}>{JSON.stringify(item)}</Text>
						</View>
					))
				)}
			</View>

			<TouchableOpacity
				onPress={onPressLogOut}
				style={{
					backgroundColor: "#E74C3C",
					paddingVertical: 14,
					borderRadius: 10,
					alignItems: "center",
					marginTop: 8,
				}}
			>
				<Text style={{ color: "#fff", fontWeight: "700" }}>Cerrar sesión</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
