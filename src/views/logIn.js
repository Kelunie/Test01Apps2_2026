import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios/dist/axios.min.js";

import { ENDPOINTS, STORAGE_KEYS } from "../config/config";
import { stylesAuth } from "../styles/style01";

export default function LogIn({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const usernameFromSignIn = route?.params?.username;
    if (usernameFromSignIn) {
      setUsername(usernameFromSignIn);
    }
  }, [route?.params?.username]);

  const onPressLogIn = async () => {
    const normalizedUsername = username.trim();

    if (!normalizedUsername || !password.trim()) {
      Alert.alert("Campos requeridos", "Ingresá usuario y contraseña.");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(ENDPOINTS.auth.login, {
        username: normalizedUsername,
        password,
      });

      if (!data?.token) {
        throw new Error("No se pudo iniciar sesión");
      }

      const { data: usersData } = await axios.get(ENDPOINTS.users.list);
      const matchedUser = Array.isArray(usersData)
        ? usersData.find((item) => item?.username === normalizedUsername)
        : null;

      const firstName = matchedUser?.name?.firstname || "";
      const lastName = matchedUser?.name?.lastname || "";
      const fullName = `${firstName} ${lastName}`.trim() || normalizedUsername;

      const userToStore = {
        id: matchedUser?.id || null,
        username: normalizedUsername,
        fullName,
      };

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.authToken, data.token],
        [STORAGE_KEYS.authUser, JSON.stringify(userToStore)],
      ]);

      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      Alert.alert(
        "Error de autenticación",
        "Credenciales inválidas o problema de conexión.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={stylesAuth.container}>
      <Text style={stylesAuth.title}>Iniciar sesión</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Usuario"
        autoCapitalize="none"
        style={stylesAuth.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
        style={stylesAuth.input}
      />

      <TouchableOpacity
        onPress={onPressLogIn}
        disabled={isLoading}
        style={[
          stylesAuth.primaryButton,
          isLoading && stylesAuth.primaryButtonDisabled,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={stylesAuth.primaryButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignIn")}
        style={stylesAuth.secondaryButton}
      >
        <Text style={stylesAuth.secondaryButtonText}>Crear cuenta</Text>
      </TouchableOpacity>

      <Text style={stylesAuth.helpText}>
        FakeStore test: usuario mor_2314 - clave 83r5^_
      </Text>
    </View>
  );
}
