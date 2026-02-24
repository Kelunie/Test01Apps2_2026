import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios/dist/axios.min.js";

import { ENDPOINTS, STORAGE_KEYS } from "../config/config";

export default function LogIn({ navigation, route }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const usernameFromSignIn = route?.params?.username;
		if (usernameFromSignIn) {
			setUsername(usernameFromSignIn);
		}
	}, [route?.params?.username]);

	const onPressLogIn = async () => {
		const normalizedUsername = username.trim();

		if (!normalizedUsername || !password.trim()) {
			Alert.alert("Campos requeridos", "Ingresá usuario y contraseña.");
			return;
		}

		setIsLoading(true);

		try {
			const { data } = await axios.post(ENDPOINTS.auth.login, {
				username: normalizedUsername,
				password,
			});

			if (!data?.token) {
				throw new Error("No se pudo iniciar sesión");
			}

			const { data: usersData } = await axios.get(ENDPOINTS.users.list);
			const matchedUser = Array.isArray(usersData)
				? usersData.find((item) => item?.username === normalizedUsername)
				: null;

			const firstName = matchedUser?.name?.firstname || "";
			const lastName = matchedUser?.name?.lastname || "";
			const fullName = `${firstName} ${lastName}`.trim() || normalizedUsername;

			const userToStore = {
				id: matchedUser?.id || null,
				username: normalizedUsername,
				fullName,
			};

			await AsyncStorage.multiSet([
				[STORAGE_KEYS.authToken, data.token],
				[STORAGE_KEYS.authUser, JSON.stringify(userToStore)],
			]);

			navigation.reset({
				index: 0,
				routes: [{ name: "MainTabs" }],
			});
		} catch (error) {
			Alert.alert(
				"Error de autenticación",
				"Credenciales inválidas o problema de conexión."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
			<Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 12 }}>
				Iniciar sesión
			</Text>

			<TextInput
				value={username}
				onChangeText={setUsername}
				placeholder="Usuario"
				autoCapitalize="none"
				style={{ borderWidth: 1, borderColor: "#d0d0d0", borderRadius: 10, padding: 12 }}
			/>

			<TextInput
				value={password}
				onChangeText={setPassword}
				placeholder="Contraseña"
				secureTextEntry
				style={{ borderWidth: 1, borderColor: "#d0d0d0", borderRadius: 10, padding: 12 }}
			/>

			<TouchableOpacity
				onPress={onPressLogIn}
				disabled={isLoading}
				style={{
					backgroundColor: "#355DA8",
					paddingVertical: 14,
					borderRadius: 10,
					alignItems: "center",
					marginTop: 8,
					opacity: isLoading ? 0.7 : 1,
				}}
			>
				{isLoading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={{ color: "#fff", fontWeight: "700" }}>Entrar</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => navigation.navigate("SignIn")}
				style={{
					paddingVertical: 12,
					borderRadius: 10,
					alignItems: "center",
				}}
			>
				<Text style={{ color: "#355DA8", fontWeight: "700" }}>Crear cuenta</Text>
			</TouchableOpacity>

			<Text style={{ fontSize: 12, color: "#6a6a6a", marginTop: 8 }}>
				FakeStore test: usuario mor_2314 - clave 83r5^_
			</Text>
		</View>
	);
}
