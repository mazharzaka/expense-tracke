import CarouselSplash from "@/components/CarouselSplash";
import { loginAction, logoutAction } from "@/services/auth";
import { store } from "@/services/store";
import { isAccessTokenExpired } from "@/utils/isAccessTokenExpired";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.isLoggedIn
  );
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const expired = await isAccessTokenExpired();
        if (!token || expired) {
          dispatch(logoutAction());
        } else {
          dispatch(loginAction(token));
        }
      } catch (err) {
        console.log("Error checking token", err);
      }
    };

    checkToken();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/splash/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>monex</Text>
      </View>
      <View style={styles.carouselContainer}>
        <CarouselSplash />
      </View>
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            isLoggedIn ? router.push("/Home") : router.push("/login")
          }
        >
          <Text style={styles.buttonText}>Let’s Go</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1B26",
    paddingTop: 96,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "inter",
  },
  content: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "#0E33F3",
    justifyContent: "center",
    flex: 1,
    borderRadius: 8,
    width: "80%",
    height: 48,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "inter",
  },
});
