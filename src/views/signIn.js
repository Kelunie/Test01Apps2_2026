import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import axios from "axios/dist/axios.min.js";

import { ENDPOINTS } from "../config/config";

export default function SignIn({ navigation }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onPressCreateAccount = async () => {
		if (!username.trim() || !email.trim() || !password.trim()) {
			Alert.alert("Campos requeridos", "Completá usuario, email y contraseña.");
			return;
		}

		setIsLoading(true);

		try {
			await axios.post(ENDPOINTS.users.create, {
				username: username.trim(),
				email: email.trim(),
				password,
			});

			Alert.alert(
				"Cuenta validada",
				"La API validó el formato de tu cuenta. Ahora iniciá sesión.",
				[
					{
						text: "Continuar",
						onPress: () => navigation.navigate("LogIn", { username: username.trim() }),
					},
				]
			);
		} catch (error) {
			Alert.alert("Error", "No se pudo validar la creación de cuenta.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
			<Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 12 }}>
				Crear cuenta
			</Text>

			<TextInput
				value={username}
				onChangeText={setUsername}
				placeholder="Usuario"
				autoCapitalize="none"
				style={{ borderWidth: 1, borderColor: "#d0d0d0", borderRadius: 10, padding: 12 }}
			/>

			<TextInput
				value={email}
				onChangeText={setEmail}
				placeholder="Email"
				autoCapitalize="none"
				keyboardType="email-address"
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
				onPress={onPressCreateAccount}
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
					<Text style={{ color: "#fff", fontWeight: "700" }}>Crear cuenta</Text>
				)}
			</TouchableOpacity>
		</View>
	);
}
