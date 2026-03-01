import { StyleSheet } from "react-native";

// Paleta principal.
const palette = {
  background: "#f8f4fb",
  card: "#ffffff",
  cardSoft: "#f2e8f7",
  primary: "#7a2c8f",
  primaryStrong: "#67237a",
  primarySoft: "#ead9f3",
  textMain: "#2f2040",
  textSecondary: "#5f4c70",
  textMuted: "#7e6d8e",
  border: "#dfd0e8",
  borderStrong: "#c9b2d7",
  onPrimary: "#ffffff",
  danger: "#a93f66",
};

export const stylesProducts = StyleSheet.create({
  // Contenedor principal de la pantalla de productos.
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: palette.background,
  },
  // Fila superior con ícono y título.
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  // Círculo de fondo del ícono principal.
  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: palette.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  // Estilo base del ícono del encabezado.
  logoIcon: {
    fontSize: 24,
    color: palette.primary,
  },
  // Título principal de la vista.
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: palette.primary,
  },
  // Texto secundario debajo del título.
  name: {
    color: palette.textSecondary,
  },
  // Separador horizontal.
  divider: {
    height: 1,
    backgroundColor: palette.border,
    marginBottom: 10,
  },
  // Fila para el título de filtros.
  filterTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  // Emoji del bloque de filtros.
  filterEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  // Título del bloque de filtros.
  filterTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.textMain,
  },
  // Contenedor interno del scroll de categorías.
  filterScrollContent: {
    gap: 8,
    paddingBottom: 10,
    paddingRight: 6,
    marginBottom: 8,
  },
  // Base de cada chip de categoría.
  filterChip: {
    minWidth: 132,
    maxWidth: 180,
    height: 56,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.borderStrong,
  },
  // Estado activo del chip.
  filterChipActive: {
    backgroundColor: palette.primary,
  },
  // Estado inactivo del chip.
  filterChipInactive: {
    backgroundColor: palette.cardSoft,
  },
  // Texto base de los chips.
  filterChipText: {
    fontWeight: "700",
    textTransform: "capitalize",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
  // Texto en chip activo.
  filterChipTextActive: {
    color: palette.onPrimary,
  },
  // Texto en chip inactivo.
  filterChipTextInactive: {
    color: palette.textMain,
  },
  // Estado de carga centralizado.
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Padding inferior del listado.
  productListContent: {
    paddingBottom: 10,
  },
  // Tarjeta de producto.
  productCard: {
    flex: 1,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  // Ajuste para columnas con separación uniforme.
  columnWrap: {
    justifyContent: "space-between",
  },
  // Imagen del producto.
  productImage: {
    width: "100%",
    height: 110,
    marginBottom: 10,
  },
  // Nombre del producto.
  productTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: palette.textMain,
    minHeight: 38,
  },
  // Precio del producto.
  productPrice: {
    marginTop: 4,
    color: palette.primaryStrong,
    fontWeight: "700",
  },
  // Texto vacío cuando no hay resultados.
  emptyText: {
    textAlign: "center",
    color: palette.textMuted,
    marginTop: 24,
  },
});

export const stylesCart = StyleSheet.create({
  // Contenedor principal de carrito.
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: palette.background,
  },
  // Fila superior con ícono y textos.
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  // Fondo circular del ícono del carrito.
  headerIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: palette.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  // Estilo del ícono del carrito.
  headerIcon: {
    fontSize: 24,
    color: palette.primaryStrong,
  },
  // Título principal de la pantalla.
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: palette.primaryStrong,
  },
  // Subtítulo de apoyo.
  subTitle: {
    color: palette.textSecondary,
  },
  // Separador horizontal.
  divider: {
    height: 1,
    backgroundColor: palette.border,
    marginBottom: 10,
  },
  // Fila de título para filtros.
  filterTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  // Emoji para el bloque de filtros.
  filterEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  // Texto del título de filtros.
  filterTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.textMain,
  },
  // Espaciado del scroll horizontal de filtros.
  filterScrollContent: {
    gap: 8,
    paddingBottom: 10,
    paddingRight: 6,
    marginBottom: 8,
  },
  // Base de chip de filtro.
  filterChip: {
    minWidth: 132,
    maxWidth: 180,
    height: 56,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.borderStrong,
  },
  // Chip activo.
  filterChipActive: {
    backgroundColor: palette.primary,
  },
  // Chip inactivo.
  filterChipInactive: {
    backgroundColor: palette.cardSoft,
  },
  // Tipografía base del texto del chip.
  filterChipText: {
    fontWeight: "700",
    textTransform: "capitalize",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
  // Texto de chip activo.
  filterChipTextActive: {
    color: palette.onPrimary,
  },
  // Texto de chip inactivo.
  filterChipTextInactive: {
    color: palette.textMain,
  },
  // Contenedor de carga.
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Padding inferior del listado.
  listContent: {
    paddingBottom: 20,
  },
  // Tarjeta de ítem de carrito.
  card: {
    flex: 1,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  // Imagen dentro de la tarjeta.
  cardImage: {
    width: "100%",
    height: 90,
    marginBottom: 8,
  },
  // Código de producto.
  codeText: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.textSecondary,
    marginBottom: 4,
  },
  // Título del producto.
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.textMain,
    minHeight: 34,
  },
  // Texto auxiliar de la tarjeta.
  cardInfo: {
    fontSize: 12,
    color: palette.textSecondary,
    marginTop: 2,
  },
  // Precio/subtotal de la tarjeta.
  cardPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.primaryStrong,
    marginTop: 4,
  },
  // Ajuste de separación por columnas.
  columnWrap: {
    justifyContent: "space-between",
  },
  // Texto vacío cuando no hay elementos.
  emptyText: {
    textAlign: "center",
    color: palette.textMuted,
    marginTop: 24,
  },
  // Tarjeta del resumen de compra.
  summaryCard: {
    marginTop: 6,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    padding: 14,
  },
  // Título del resumen.
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textMain,
    marginBottom: 8,
  },
  // Texto descriptivo del resumen.
  summaryText: {
    fontSize: 14,
    color: palette.textSecondary,
    marginBottom: 4,
  },
  // Total final del resumen.
  summaryTotal: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.primaryStrong,
    marginTop: 6,
  },
  // Botón principal de confirmación.
  confirmButton: {
    marginTop: 12,
    backgroundColor: palette.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  // Texto del botón de confirmación.
  confirmButtonText: {
    color: palette.onPrimary,
    fontWeight: "700",
    fontSize: 14,
  },
});

export const stylesAccount = StyleSheet.create({
  // Botón que muestra cada código del historial.
  historyCodeButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: palette.cardSoft,
  },
  // Texto del código de compra.
  historyCodeText: {
    fontWeight: "700",
    color: palette.primaryStrong,
  },
});

export const stylesPurchaseHistory = StyleSheet.create({
  // Contenedor de detalle de historial.
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: palette.background,
  },
  // Tarjeta superior con datos generales de la compra.
  headerCard: {
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  // Título principal del detalle.
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.textMain,
    marginBottom: 8,
  },
  // Línea de texto informativa del header.
  headerText: {
    fontSize: 14,
    color: palette.textSecondary,
    marginBottom: 4,
  },
  // Espaciado del listado de productos comprados.
  listContent: {
    paddingBottom: 20,
  },
  // Tarjeta de cada producto comprado.
  card: {
    flex: 1,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  // Imagen del producto comprado.
  cardImage: {
    width: "100%",
    height: 90,
    marginBottom: 8,
  },
  // Nombre del producto en historial.
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.textMain,
    minHeight: 34,
  },
  // Datos secundarios del producto.
  cardInfo: {
    fontSize: 12,
    color: palette.textSecondary,
    marginTop: 2,
  },
  // Subtotal mostrado por ítem.
  cardPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.primaryStrong,
    marginTop: 4,
  },
  // Acomodo para dos columnas.
  columnWrap: {
    justifyContent: "space-between",
  },
  // Mensaje cuando no hay items para renderizar.
  emptyText: {
    textAlign: "center",
    color: palette.textMuted,
    marginTop: 24,
  },
});

export const stylesAuth = StyleSheet.create({
  // Pantalla base para login y registro.
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 12,
    backgroundColor: palette.background,
  },
  // Título principal del formulario.
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    color: palette.primaryStrong,
  },
  // Campos de entrada del formulario.
  input: {
    borderWidth: 1,
    borderColor: palette.borderStrong,
    borderRadius: 10,
    padding: 12,
    backgroundColor: palette.card,
    color: palette.textMain,
  },
  // Botón primario (entrar/crear cuenta).
  primaryButton: {
    backgroundColor: palette.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  // Versión del botón cuando está deshabilitado.
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  // Texto del botón primario.
  primaryButtonText: {
    color: palette.onPrimary,
    fontWeight: "700",
  },
  // Botón secundario de navegación.
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  // Texto del botón secundario.
  secondaryButtonText: {
    color: palette.primaryStrong,
    fontWeight: "700",
  },
  // Texto auxiliar de credenciales de prueba.
  helpText: {
    fontSize: 12,
    color: palette.textMuted,
    marginTop: 8,
  },
});

export const stylesDetail = StyleSheet.create({
  // Fondo principal de la vista de detalle.
  container: {
    padding: 16,
    backgroundColor: palette.background,
  },
  // Estado vacío cuando no hay producto.
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: palette.background,
  },
  // Mensaje del estado vacío.
  emptyText: {
    color: palette.textMuted,
  },
  // Tarjeta principal del producto.
  card: {
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  // Imagen del producto.
  image: {
    width: "100%",
    height: 240,
    marginBottom: 12,
  },
  // Título del producto.
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.textMain,
  },
  // Precio destacado.
  price: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "700",
    color: palette.primaryStrong,
  },
  // Texto de categoría.
  category: {
    marginTop: 10,
    color: palette.textSecondary,
    textTransform: "capitalize",
  },
  // Descripción del producto.
  description: {
    marginTop: 14,
    lineHeight: 22,
    color: palette.textSecondary,
  },
  // Fila de acciones (agregar/quitar).
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  // Botón principal de agregar.
  addButton: {
    backgroundColor: palette.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  // Variación del botón cuando ocupa ancho completo.
  addButtonSingle: {
    flex: 1,
  },
  // Variación del botón cuando comparte espacio.
  addButtonShared: {
    flex: 1,
  },
  // Texto del botón de agregar.
  addButtonText: {
    color: palette.onPrimary,
    fontWeight: "700",
  },
  // Botón para quitar del carrito.
  removeButton: {
    flex: 1,
    backgroundColor: palette.danger,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  // Texto del botón de quitar.
  removeButtonText: {
    color: palette.onPrimary,
    fontWeight: "700",
  },
});

export const stylesCuenta = StyleSheet.create({
  // Contenedor del scroll de cuenta.
  container: {
    padding: 20,
    gap: 12,
    backgroundColor: palette.background,
  },
  // Título principal de la pantalla.
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.primaryStrong,
  },
  // Texto de nombre mostrado.
  subtitle: {
    fontSize: 16,
    color: palette.textSecondary,
  },
  // Tarjeta base reutilizable de secciones.
  card: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: palette.card,
  },
  // Título de cada tarjeta.
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: palette.textMain,
  },
  // Bloque para cada par etiqueta/valor.
  fieldRow: {
    marginBottom: 6,
  },
  // Etiqueta de campo del usuario.
  fieldLabel: {
    fontWeight: "700",
    color: palette.primaryStrong,
  },
  // Valor del campo del usuario.
  fieldValue: {
    color: palette.textSecondary,
  },
  // Texto para estados vacíos.
  infoText: {
    color: palette.textMuted,
  },
  // Botón de cierre de sesión.
  logoutButton: {
    backgroundColor: palette.danger,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  // Texto del botón de logout.
  logoutButtonText: {
    color: palette.onPrimary,
    fontWeight: "700",
  },
});
