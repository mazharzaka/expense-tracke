import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
export const isAccessTokenExpired = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (
      typeof decodedToken.exp !== "number" ||
      decodedToken.exp < currentTime
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error decoding token or checking expiration:", error);
    return true;
  }
};
