import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LogIn from "./logIn";
import SignIn from "./signIn";
import Products from "./products";
import Carrito from "./carrito";
import Cuenta from "./cuenta";
import { STORAGE_KEYS } from "../config/config";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
	return (
		<Tab.Navigator>
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
		</Stack.Navigator>
	);
}
