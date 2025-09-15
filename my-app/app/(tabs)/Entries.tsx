import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { format } from "date-fns";
import { useAlltransactionsQuery } from "@/services/api";

const Entries = () => {
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useAlltransactionsQuery({});

  if (transactionsLoading) {
    return <Text>Loading...</Text>;
  }

  if (transactionsError) {
    return <Text>Error loading data</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionText}>Latest Entries</Text>
      </View>
      <View style={styles.Alltransaction}>
        {transactionsData?.map((e: any, i: number) => (
          <View style={styles.transaction} key={i}>
            <View style={styles.transactionTitle}>
              <View style={styles.imgContainer}>
                <Image
                  source={require("@/assets/images/overview/transaction.png")}
                  style={styles.iconTransaction}
                />
              </View>
              <View style={styles.contentTransaction}>
                <Text style={styles.tit}>
                  {e.type === "income" ? "Income" : e.category}
                </Text>
                <Text style={styles.date}>
                  {format(new Date(e.date), "dd MMM yyyy")}
                </Text>
              </View>
            </View>
            <View style={styles.transactionValue}>
              <Text style={styles.value}>
                {e.type === "income" ? "+" : "-"} ${e.amount}
              </Text>
              <Text style={styles.date}>Google Pay</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Entries;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141D26",
    paddingHorizontal: 24,
  },
  text: {
    color: "#fff",
  },
  Alltransaction: {
    marginTop: 32,
    gap: 32,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionTitle: {
    flexDirection: "row",
    gap: 16,
  },
  iconTransaction: { width: "100%", height: "100%", resizeMode: "contain" },
  imgContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#404040",
    padding: 10,
  },
  contentTransaction: {
    justifyContent: "center",
  },
  tit: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 700,
  },
  date: {
    fontSize: 14,
    color: "#B0B8BF",
    lineHeight: 20,
  },
  transactionValue: {
    justifyContent: "center",
  },
  value: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 20,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
  },
  transactionText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "inter",
    fontWeight: 700,
    color: "#FFF",
  },
});
