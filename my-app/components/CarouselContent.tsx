import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CarouselContent = ({
  img,
  heading,
  description,
  id,
}: {
  img: any;

  heading: string;
  description: string;
  id: number;
}) => {
  return (
    <View style={styles.container} key={id}>
      <View style={styles.imgContainer}>
        <Image source={img} style={styles.img} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default CarouselContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  imgContainer: {
    width: 250,
    height: 320,
    justifyContent: "center",
    // alignItems: "center",
  },
  img: {
    width: 250,
    height: 230,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    width: "60%",
    gap: 12,
  },
  heading: {
    fontSize: 18,
    fontFamily: "inter",
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  description: {
    fontSize: 16,
    fontFamily: "inter",
    textAlign: "center",
    color: "#B0B8BF",
    lineHeight: 24,
  },
});
