import { Text, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
const transaction = () => {
  const [selected, setSelected] = useState("");
  return (
    <ScrollView
      style={styles.cointainer}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.heading}>
        <Text style={styles.textHeading}>AddTransaction</Text>
      </View>
      <View style={styles.calendarCointainer}>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: "gray",
            transform: [{ scale: 0.9 }],
            borderRadius: 20,
            padding: 16,
          }}
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
          }}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "#0E33F3",
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

export default transaction;
const styles = StyleSheet.create({
  cointainer: { flex: 1, backgroundColor: "#141D26", paddingHorizontal: 24 },
  calendarCointainer: {
    // flex: 1,
  },
  heading: {
    marginTop: 80,
  },
  textHeading: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: 700,
  },
});
