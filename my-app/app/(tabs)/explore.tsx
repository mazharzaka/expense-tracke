import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Overview</Text>
          <View style={styles.upperCard}>
            <Image
              source={require("@/assets/images/overview/logo.jpg")}
              style={styles.img}
            />
          </View>
        </View>
      </View>
      <View style={styles.carousal}>
        <View style={styles.card}>
          <View style={styles.upperCard}>
            <Image
              source={require("@/assets/images/overview/icon.png")}
              style={styles.icon}
            />
            <Text style={styles.textCard}>Total Salary</Text>
          </View>
          <Text style={styles.salary}>$1,289.38</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242D35",
  },
  carousal: {
    marginTop: 32,
    paddingLeft: 24,
  },
  card: {
    padding: 20,
    width: "40%",
    backgroundColor: "#0F1B26",
    borderRadius: 20,
  },
  textCard: {
    color: "#F5F6F7",
    fontSize: 12,
    fontFamily: "inter",
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0F1B26",
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#5d6164ff",
    paddingBottom: 12,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
    fontFamily: "inter",
    color: "#ffffff",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: "contain",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  upperCard: {
    gap: 8,
  },
  salary: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
    fontFamily: "inter",
    color: "#ffffff",
    paddingTop: 32,
  },
});
