import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios/dist/axios.min.js";

import { ENDPOINTS, STORAGE_KEYS } from "../config/config";
import { stylesAccount, stylesCuenta } from "../styles/style01";

export default function Cuenta() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.authUser);
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const localUsername = parsedUser?.username || "";
      const localUserId = parsedUser?.id || null;
      setUsername(localUsername);
      setDisplayName(parsedUser?.fullName || localUsername);

      const historyRaw = await AsyncStorage.getItem(
        STORAGE_KEYS.purchaseHistory,
      );
      const parsedHistory = historyRaw ? JSON.parse(historyRaw) : [];
      setHistory(Array.isArray(parsedHistory) ? parsedHistory : []);

      let apiUser = null;

      if (localUserId) {
        const { data } = await axios.get(ENDPOINTS.users.detail(localUserId));
        apiUser = data || null;
      } else if (localUsername) {
        const { data } = await axios.get(ENDPOINTS.users.list);
        if (Array.isArray(data)) {
          apiUser =
            data.find((item) => item?.username === localUsername) || null;
        }
      }

      if (apiUser) {
        const firstName = apiUser?.name?.firstname || "";
        const lastName = apiUser?.name?.lastname || "";
        const apiFullName = `${firstName} ${lastName}`.trim() || localUsername;
        setDisplayName(apiFullName);
        setUserInfo(apiUser);

        await AsyncStorage.setItem(
          STORAGE_KEYS.authUser,
          JSON.stringify({
            id: apiUser?.id || localUserId,
            username: apiUser?.username || localUsername,
            fullName: apiFullName,
          }),
        );
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      setUserInfo(null);
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressLogOut = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.authToken,
      STORAGE_KEYS.authUser,
    ]);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      }),
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, []),
  );

  if (isLoading) {
    return (
      <View style={stylesDetailLoading.centeredWrap}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={stylesCuenta.container}>
      <Text style={stylesCuenta.title}>Cuenta</Text>
      <Text style={stylesCuenta.subtitle}>
        Nombre: {displayName || "Sin datos"}
      </Text>

      <View style={stylesCuenta.card}>
        <Text style={stylesCuenta.cardTitle}>Mis datos</Text>
        {userInfo ? (
          <>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Usuario</Text>
              <Text style={stylesCuenta.fieldValue}>
                {userInfo?.username || "-"}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Nombre completo</Text>
              <Text style={stylesCuenta.fieldValue}>
                {`${userInfo?.name?.firstname || ""} ${userInfo?.name?.lastname || ""}`.trim() ||
                  "-"}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Correo electrónico</Text>
              <Text style={stylesCuenta.fieldValue}>
                {userInfo?.email || "-"}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Teléfono</Text>
              <Text style={stylesCuenta.fieldValue}>
                {userInfo?.phone || "-"}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Ciudad</Text>
              <Text style={stylesCuenta.fieldValue}>
                {userInfo?.address?.city || "-"}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Calle</Text>
              <Text style={stylesCuenta.fieldValue}>
                {userInfo?.address?.street || "-"}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Número</Text>
              <Text style={stylesCuenta.fieldValue}>
                {String(userInfo?.address?.number || "-")}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Código postal</Text>
              <Text style={stylesCuenta.fieldValue}>
                {userInfo?.address?.zipcode || "-"}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Latitud</Text>
              <Text style={stylesCuenta.fieldValue}>
                {userInfo?.address?.geolocation?.lat || "-"}
              </Text>
            </View>
            <View style={stylesCuenta.fieldRow}>
              <Text style={stylesCuenta.fieldLabel}>Longitud</Text>
              <Text style={stylesCuenta.fieldValue}>
                {userInfo?.address?.geolocation?.long || "-"}
              </Text>
            </View>
          </>
        ) : (
          <Text style={stylesCuenta.infoText}>
            No se encontró información del usuario en la API.
          </Text>
        )}
      </View>

      <View style={stylesCuenta.card}>
        <Text style={stylesCuenta.cardTitle}>Historial de compras (local)</Text>
        {history.length === 0 ? (
          <Text style={stylesCuenta.infoText}>
            Aún no hay compras registradas.
          </Text>
        ) : (
          history.map((item, index) => (
            <TouchableOpacity
              key={`${index}-${item?.date || "item"}`}
              style={stylesAccount.historyCodeButton}
              onPress={() =>
                navigation.navigate("HistorialCompras", { purchase: item })
              }
            >
              <Text style={stylesAccount.historyCodeText}>
                Código: {item?.code || `COMPRA-${index + 1}`}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <TouchableOpacity
        onPress={onPressLogOut}
        style={stylesCuenta.logoutButton}
      >
        <Text style={stylesCuenta.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const stylesDetailLoading = {
  centeredWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
