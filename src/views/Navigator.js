import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LogIn from "./logIn";
import SignIn from "./signIn";
import Products from "./products";
import Carrito from "./carrito";
import Cuenta from "./cuenta";
import DetailProd from "./detail_prod";
import HistorialCompras from "./historialCompras";
import { STORAGE_KEYS } from "../config/config";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					if (route.name === "Products") {
						return <MaterialCommunityIcons name="store-outline" size={size} color={color} />;
					}
					if (route.name === "Carrito") {
						return <MaterialCommunityIcons name="cart-outline" size={size} color={color} />;
					}
					return <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen
				name="Products"
				component={Products}
				options={{
					title: "Productos",
					tabBarLabel: "Productos",
				}}
			/>
			<Tab.Screen
				name="Carrito"
				component={Carrito}
				options={{
					title: "Carrito",
					tabBarLabel: "Carrito",
				}}
			/>
			<Tab.Screen
				name="Cuenta"
				component={Cuenta}
				options={{
					title: "Cuenta",
					tabBarLabel: "Cuenta",
				}}
			/>
		</Tab.Navigator>
	);
}

export default function Navigator() {
	const [isCheckingSession, setIsCheckingSession] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const loadSession = async () => {
			try {
				const token = await AsyncStorage.getItem(STORAGE_KEYS.authToken);
				setIsAuthenticated(Boolean(token));
			} catch (error) {
				setIsAuthenticated(false);
			} finally {
				setIsCheckingSession(false);
			}
		};

		loadSession();
	}, []);

	if (isCheckingSession) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<Stack.Navigator initialRouteName={isAuthenticated ? "MainTabs" : "LogIn"}>
			<Stack.Screen
				name="LogIn"
				component={LogIn}
				options={{ title: "Iniciar sesión" }}
			/>
			<Stack.Screen
				name="SignIn"
				component={SignIn}
				options={{ title: "Crear cuenta" }}
			/>
			<Stack.Screen
				name="MainTabs"
				component={AppTabs}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="DetailProd"
				component={DetailProd}
				options={{ title: "Detalle del producto" }}
			/>
			<Stack.Screen
				name="HistorialCompras"
				component={HistorialCompras}
				options={{ title: "Historial de compra" }}
			/>
		</Stack.Navigator>
	);
}
