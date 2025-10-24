import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from "expo-linear-gradient";
const transaction = () => {
  const [selected, setSelected] = useState("");
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [type, setType] = useState<"expense" | "salary">("expense");
  const options = [
    { label: "Food", value: "Food" },
    { label: "Transport", value: "Transport" },
    { label: "Salary", value: "Salary" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Savings", value: "Savings" },
    { label: "Bonus", value: "Bonus" },
  ];
  return (
    <ScrollView
      style={styles.cointainer}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.calendarCointainer}>
        <ScrollView nestedScrollEnabled={true}>
          <Calendar
            style={{ padding: 16 }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#0F1B26",
              textSectionTitleColor: "#ffffff",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#fff",
              textDisabledColor: "#9BA1A8",
              monthTextColor: "#FFF",
              arrowColor: "#FFF",
            }}
            renderArrow={(direction) => (
              <MaterialIcons
                name={
                  direction === "left"
                    ? "keyboard-arrow-left"
                    : "keyboard-arrow-right"
                }
                size={30}
                color="white"
              />
            )}
            onDayPress={(day) => setSelected(day.dateString)}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "#0E33F3",
              },
            }}
          />
        </ScrollView>
      </View>

      <View style={styles.content}>
        <View style={styles.inputsContainer}>
          <Text style={styles.lable}>Title</Text>
          <TextInput
            placeholder="Title"
            onFocus={() => setIsFocused("title")}
            onBlur={() => setIsFocused(null)}
            style={[
              styles.input,
              { borderColor: selected !== "" ? "#37ABFF" : "#6B7580" },
            ]}
            placeholderTextColor={"#B0B8BF"}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.lable}>Amount</Text>
          <TextInput
            placeholder="Amount"
            keyboardType="numeric"
            onFocus={() => setIsFocused("amount")}
            onBlur={() => setIsFocused(null)}
            style={[
              styles.input,
              { borderColor: isFocused === "amount" ? "#37ABFF" : "#6B7580" },
            ]}
            placeholderTextColor={"#B0B8BF"}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.lable}>Category</Text>
          <View
            onFocus={() => setIsFocused("select")}
            onBlur={() => setIsFocused(null)}
            style={{
              height: 48,
              width: 327,
              backgroundColor: "#242D35",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              marginBottom: 12,
              justifyContent: "center",
              borderColor: isFocused === "select" ? "#37ABFF" : "#6B7580",
            }}
          >
            <RNPickerSelect
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: "#ffffff",
                  fontFamily: "inter",
                },
                inputAndroid: {
                  fontSize: 16,
                  color: "#ffffff",
                  fontFamily: "inter",
                },
                placeholder: {
                  color: "#B0B8BF",
                },
              }}
              onValueChange={(value) => setSelectedValue(value)}
              items={options}
              placeholder={{ label: "Select an option...", value: null }}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputsContainer}>
        <Text style={styles.lable}>Type</Text>
        <View style={styles.TypeContainer}>
          <TouchableOpacity
            style={[styles.card, type === "expense" ? styles.selected : ""]}
            onPress={() => setType("expense")}
            activeOpacity={0.8}
          >
            <Text style={styles.textCard}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, type === "salary" ? styles.selected : ""]}
            onPress={() => setType("salary")}
            activeOpacity={0.8}
          >
            <Text style={styles.textCard}>Salary</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ alignItems: "center", marginTop: 10 }}
        //  onPress={handleLogin}
      >
        <LinearGradient
          colors={["#0E33F3", "#2F51FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ADD TRANSACTION</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default transaction;
const styles = StyleSheet.create({
  cointainer: {
    flex: 1,
    backgroundColor: "#242D35",
    paddingHorizontal: 24,
    // gap:24,
    paddingVertical: 32,
  },
  calendarCointainer: {
    overflow: "hidden",
    height: 150,
    borderRadius: 20,
  },
  heading: {
    marginTop: 20,
  },
  textHeading: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: 700,
  },
  card: {
    padding: 20,
    width: "32%",
    backgroundColor: "#0F1B26",
    borderRadius: 20,
  },
  selected: {
    backgroundColor: "#0E33F3",
  },
  textCard: {
    color: "#F5F6F7",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: "inter",
  },
  button: {
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "#0E33F3",
    justifyContent: "center",
    width: 327,
    height: 48,
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
  content: {
    marginTop: 32,
  },
  inputsContainer: {
    gap: 8,
  },
  TypeContainer: {
    gap: 8,
    flexDirection: "row",
  },

  lable: {
    fontSize: 16,
    color: "#B0B8BF",
  },
});
