import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios/dist/axios.min.js";

import { ENDPOINTS } from "../config/config";
import { stylesAuth } from "../styles/style01";

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onPressCreateAccount = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Campos requeridos", "Completá usuario, email y contraseña.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(ENDPOINTS.users.create, {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      Alert.alert(
        "Cuenta validada",
        "La API validó el formato de tu cuenta. Ahora iniciá sesión.",
        [
          {
            text: "Continuar",
            onPress: () =>
              navigation.navigate("LogIn", { username: username.trim() }),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo validar la creación de cuenta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={stylesAuth.container}>
      <Text style={stylesAuth.title}>Crear cuenta</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Usuario"
        autoCapitalize="none"
        style={stylesAuth.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
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
        onPress={onPressCreateAccount}
        disabled={isLoading}
        style={[
          stylesAuth.primaryButton,
          isLoading && stylesAuth.primaryButtonDisabled,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={stylesAuth.primaryButtonText}>Crear cuenta</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
