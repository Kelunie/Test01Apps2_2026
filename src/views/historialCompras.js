import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { stylesPurchaseHistory } from "../styles/style01";

export default function HistorialCompras({ route }) {
	const purchase = route?.params?.purchase || null;
	const items = purchase?.items || [];

	const renderItem = ({ item }) => {
		const quantity = Number(item?.quantity || 1);
		const price = Number(item?.price || 0);
		const subtotal = (quantity * price).toFixed(2);

		return (
			<View style={stylesPurchaseHistory.card}>
				{item?.image ? (
					<Image
						source={{ uri: item.image }}
						style={stylesPurchaseHistory.cardImage}
						resizeMode="contain"
					/>
				) : null}
				<Text numberOfLines={2} style={stylesPurchaseHistory.cardTitle}>
					{item?.title || `Producto #${item?.id || "-"}`}
				</Text>
				<Text style={stylesPurchaseHistory.cardInfo}>Código: {item?.id || "-"}</Text>
				<Text style={stylesPurchaseHistory.cardInfo}>Cantidad: {quantity}</Text>
				<Text style={stylesPurchaseHistory.cardPrice}>Subtotal: ${subtotal}</Text>
			</View>
		);
	};

	return (
		<View style={stylesPurchaseHistory.container}>
			{purchase ? (
				<>
					<View style={stylesPurchaseHistory.headerCard}>
						<Text style={stylesPurchaseHistory.headerTitle}>Detalle de compra</Text>
						<Text style={stylesPurchaseHistory.headerText}>
							Código: {purchase?.code || "Sin código"}
						</Text>
						<Text style={stylesPurchaseHistory.headerText}>
							Fecha: {purchase?.date || "-"}
						</Text>
						<Text style={stylesPurchaseHistory.headerText}>
							Total: ${Number(purchase?.total || 0).toFixed(2)}
						</Text>
					</View>

					<FlatList
						data={items}
						keyExtractor={(item, index) => `${item?.id || "prod"}-${index}`}
						renderItem={renderItem}
						numColumns={2}
						columnWrapperStyle={stylesPurchaseHistory.columnWrap}
						contentContainerStyle={stylesPurchaseHistory.listContent}
						ListEmptyComponent={
							<Text style={stylesPurchaseHistory.emptyText}>
								No hay productos para mostrar en esta compra.
							</Text>
						}
					/>
				</>
			) : (
				<Text style={stylesPurchaseHistory.emptyText}>
					No se encontró el detalle de compra seleccionado.
				</Text>
			)}
		</View>
	);
}
