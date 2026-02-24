import { StyleSheet } from "react-native";

export const stylesProducts = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	logoCircle: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#f3e9ff",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	logoIcon: {
		fontSize: 24,
	},
	title: {
		fontSize: 34,
		fontWeight: "800",
		color: "#6a247f",
	},
	name: {
		color: "#666",
	},
	divider: {
		height: 1,
		backgroundColor: "#d0d0d0",
		marginBottom: 10,
	},
	filterTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	filterEmoji: {
		fontSize: 20,
		marginRight: 6,
	},
	filterTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: "#4b4b4b",
	},
	filterScrollContent: {
		gap: 8,
		paddingBottom: 10,
		paddingRight: 6,
		marginBottom: 8,
	},
	filterChip: {
		minWidth: 132,
		maxWidth: 180,
		height: 56,
		paddingHorizontal: 10,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#cfcfcf",
	},
	filterChipActive: {
		backgroundColor: "#111",
	},
	filterChipInactive: {
		backgroundColor: "#f0f0f0",
	},
	filterChipText: {
		fontWeight: "700",
		textTransform: "capitalize",
		fontSize: 14,
		lineHeight: 18,
		textAlign: "center",
	},
	filterChipTextActive: {
		color: "#fff",
	},
	filterChipTextInactive: {
		color: "#333",
	},
	loadingWrap: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	productListContent: {
		paddingBottom: 10,
	},
	productCard: {
		flex: 1,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#eee",
		borderRadius: 14,
		padding: 12,
		marginBottom: 12,
		marginHorizontal: 4,
	},
	columnWrap: {
		justifyContent: "space-between",
	},
	productImage: {
		width: "100%",
		height: 110,
		marginBottom: 10,
	},
	productTitle: {
		fontSize: 14,
		fontWeight: "700",
		minHeight: 38,
	},
	productPrice: {
		marginTop: 4,
		color: "#355DA8",
		fontWeight: "700",
	},
	emptyText: {
		textAlign: "center",
		color: "#666",
		marginTop: 24,
	},
});

export const stylesCart = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	headerIconWrap: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#e8f1ff",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	headerIcon: {
		fontSize: 24,
	},
	title: {
		fontSize: 32,
		fontWeight: "800",
		color: "#2f4f92",
	},
	subTitle: {
		color: "#666",
	},
	divider: {
		height: 1,
		backgroundColor: "#d0d0d0",
		marginBottom: 10,
	},
	filterTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	filterEmoji: {
		fontSize: 20,
		marginRight: 6,
	},
	filterTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: "#4b4b4b",
	},
	filterScrollContent: {
		gap: 8,
		paddingBottom: 10,
		paddingRight: 6,
		marginBottom: 8,
	},
	filterChip: {
		minWidth: 132,
		maxWidth: 180,
		height: 56,
		paddingHorizontal: 10,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#cfcfcf",
	},
	filterChipActive: {
		backgroundColor: "#111",
	},
	filterChipInactive: {
		backgroundColor: "#f0f0f0",
	},
	filterChipText: {
		fontWeight: "700",
		textTransform: "capitalize",
		fontSize: 14,
		lineHeight: 18,
		textAlign: "center",
	},
	filterChipTextActive: {
		color: "#fff",
	},
	filterChipTextInactive: {
		color: "#333",
	},
	loadingWrap: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	listContent: {
		paddingBottom: 20,
	},
	card: {
		flex: 1,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#eee",
		borderRadius: 14,
		padding: 12,
		marginBottom: 12,
		marginHorizontal: 4,
	},
	cardImage: {
		width: "100%",
		height: 90,
		marginBottom: 8,
	},
	codeText: {
		fontSize: 12,
		fontWeight: "700",
		color: "#444",
		marginBottom: 4,
	},
	cardTitle: {
		fontSize: 13,
		fontWeight: "700",
		minHeight: 34,
	},
	cardInfo: {
		fontSize: 12,
		color: "#555",
		marginTop: 2,
	},
	cardPrice: {
		fontSize: 13,
		fontWeight: "700",
		color: "#2f4f92",
		marginTop: 4,
	},
	columnWrap: {
		justifyContent: "space-between",
	},
	emptyText: {
		textAlign: "center",
		color: "#666",
		marginTop: 24,
	},
	summaryCard: {
		marginTop: 6,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 14,
		padding: 14,
	},
	summaryTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 8,
	},
	summaryText: {
		fontSize: 14,
		color: "#555",
		marginBottom: 4,
	},
	summaryTotal: {
		fontSize: 20,
		fontWeight: "800",
		color: "#2f4f92",
		marginTop: 6,
	},
	confirmButton: {
		marginTop: 12,
		backgroundColor: "#2f4f92",
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: "center",
	},
	confirmButtonText: {
		color: "#fff",
		fontWeight: "700",
		fontSize: 14,
	},
});

export const stylesAccount = StyleSheet.create({
	historyCodeButton: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#dcdcdc",
		borderRadius: 10,
		marginBottom: 8,
		backgroundColor: "#fafafa",
	},
	historyCodeText: {
		fontWeight: "700",
		color: "#2f4f92",
	},
});

export const stylesPurchaseHistory = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerCard: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 14,
		padding: 14,
		marginBottom: 12,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
	},
	headerText: {
		fontSize: 14,
		color: "#555",
		marginBottom: 4,
	},
	listContent: {
		paddingBottom: 20,
	},
	card: {
		flex: 1,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#eee",
		borderRadius: 14,
		padding: 12,
		marginBottom: 12,
		marginHorizontal: 4,
	},
	cardImage: {
		width: "100%",
		height: 90,
		marginBottom: 8,
	},
	cardTitle: {
		fontSize: 13,
		fontWeight: "700",
		minHeight: 34,
	},
	cardInfo: {
		fontSize: 12,
		color: "#555",
		marginTop: 2,
	},
	cardPrice: {
		fontSize: 13,
		fontWeight: "700",
		color: "#2f4f92",
		marginTop: 4,
	},
	columnWrap: {
		justifyContent: "space-between",
	},
	emptyText: {
		textAlign: "center",
		color: "#666",
		marginTop: 24,
	},
});
