import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "../config/config";

export default async function deleteProducFav(productId) {
	const raw = await AsyncStorage.getItem(STORAGE_KEYS.cartItems);
	const parsed = raw ? JSON.parse(raw) : [];
	const cartItems = Array.isArray(parsed) ? parsed : [];

	const updatedCart = cartItems.filter((item) => item?.id !== productId);

	await AsyncStorage.setItem(STORAGE_KEYS.cartItems, JSON.stringify(updatedCart));
	return updatedCart;
}
