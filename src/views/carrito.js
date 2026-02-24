import React from "react";
import { Text, View } from "react-native";

export default function Carrito() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
			<Text style={{ fontSize: 22, fontWeight: "700" }}>Carrito</Text>
			<Text style={{ color: "#666", marginTop: 8 }}>
				Acá vamos a listar productos guardados localmente.
			</Text>
		</View>
	);
}
