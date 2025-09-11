import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthLoginMutation } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation] = useAuthLoginMutation();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await loginMutation({ name, password }).unwrap();
      await AsyncStorage.setItem("token", res?.token);
      router.push("/explore");
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("@/assets/images/login/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.logoText}>monex</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setName}
          placeholderTextColor={"#B0B8BF"}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          placeholderTextColor={"#B0B8BF"}
          secureTextEntry
        />
        <View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
            <LinearGradient
              colors={["#0E33F3", "#2F51FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", gap: 16 }}>
        <View>
          <Text style={styles.orText}>Or</Text>
        </View>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("@/assets/images/login/google.png")}
            style={styles.googleButtonImage}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default login;
const styles = StyleSheet.create({
  logo: {
    width: 88,
    height: 88,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    paddingTop: 64,
    alignItems: "center",
    backgroundColor: "#0F1B26",
    gap: 52,
  },
  form: {
    flex: 1,
    gap: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "inter",
  },
  orText: {
    color: "#ffffff",
    fontSize: 16,
  },

  button: {
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "#0E33F3",
    justifyContent: "center",
    // alignItems: "center",
    width: 327,
    height: 48,
    // flexDirection: "row",
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",

    fontFamily: "inter",
  },
  input: {
    height: 48,
    width: 327,
    borderColor: "#6B7580",
    backgroundColor: "#242D35",
    outline: "#0F1B26",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: "#ffffff",
    fontFamily: "inter",
  },

  googleButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: 24,
    padding: 16,
    borderRadius: 20,
    width: 327,
    borderWidth: 1,
    borderColor: "#9BA1A8",
  },
  googleButtonText: {
    color: "#F5F6F7",
    textTransform: "uppercase",
    width: "100%",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "inter",
    lineHeight: 24,
  },
  googleButtonImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
