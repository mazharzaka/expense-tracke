import CarouselSplash from "@/components/CarouselSplash";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
export default function HomeScreen() {
  const router = useRouter();
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
          onPress={() => router.push("/login")}
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
    // alignItems: "center",
    // flex: 1,
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
    // alignItems: "center",
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
