import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "../config/config";

export default async function addProductFav(product) {
	const raw = await AsyncStorage.getItem(STORAGE_KEYS.cartItems);
	const parsed = raw ? JSON.parse(raw) : [];
	const cartItems = Array.isArray(parsed) ? parsed : [];

	const existingIndex = cartItems.findIndex((item) => item?.id === product?.id);

	if (existingIndex >= 0) {
		const currentItem = cartItems[existingIndex];
		const currentQty = Number(cartItems[existingIndex]?.quantity || 1);
		cartItems[existingIndex] = {
			...currentItem,
			category: product?.category || currentItem?.category || "sin categoría",
			quantity: currentQty + 1,
		};
		await AsyncStorage.setItem(STORAGE_KEYS.cartItems, JSON.stringify(cartItems));
		return cartItems;
	}

	const updatedCart = [
		...cartItems,
		{
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
			category: product.category || "sin categoría",
			quantity: 1,
		},
	];

	await AsyncStorage.setItem(STORAGE_KEYS.cartItems, JSON.stringify(updatedCart));
	return updatedCart;
}
