import { useAlltransactionsQuery, useBalanceQuery } from "@/services/api";
import { format } from "date-fns";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useBalanceQuery({});
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useAlltransactionsQuery({});

  if (balanceLoading || transactionsLoading) {
    return <Text>Loading...</Text>;
  }

  if (balanceError || transactionsError) {
    return <Text>Error loading data</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
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
      <View style={styles.Content}>
        <View style={styles.carousal}>
          <View style={styles.card}>
            <View style={styles.upperCard}>
              <Image
                source={require("@/assets/images/overview/icon.png")}
                style={styles.icon}
              />
              <Text style={styles.textCard}>Total Salary</Text>
            </View>
            <Text style={styles.salary}>${balanceData?.income}</Text>
          </View>
          <View style={styles.Balance}>
            <View style={styles.upperCard}>
              <Image
                source={require("@/assets/images/overview/icon.png")}
                style={styles.icon}
              />
              <Text style={styles.textCard}>Balance</Text>
            </View>
            <Text style={styles.salary}>${balanceData?.balance}</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.upperCard}>
              <Image
                source={require("@/assets/images/overview/icon.png")}
                style={styles.icon}
              />
              <Text style={styles.textCard}>Total Expense</Text>
            </View>
            <Text style={styles.salary}>${balanceData?.expense}</Text>
          </View>
        </View>
        <View style={styles.entries}>
          <View style={styles.headentries}>
            <View style={styles.saving}>
              <View style={styles.uppersaving}>
                <View style={styles.sicon}>
                  <Image
                    source={require("@/assets/images/overview/plus.png")}
                    style={styles.wallet}
                  />
                </View>
                <Text style={styles.textsaving}>Savings</Text>
              </View>
            </View>
            <View style={styles.saving}>
              <View style={styles.uppersaving}>
                <View style={styles.sicon}>
                  <Image
                    source={require("@/assets/images/overview/Bell.png")}
                    style={styles.wallet}
                  />
                </View>
                <Text style={styles.textsaving}>All</Text>
              </View>
            </View>
            <View style={styles.saving}>
              <View style={styles.uppersaving}>
                <View style={styles.sicon}>
                  <Image
                    source={require("@/assets/images/overview/icon.png")}
                    style={styles.wallet}
                  />
                </View>
                <Text style={styles.textsaving}>Budget</Text>
              </View>
            </View>
          </View>
          <View style={styles.transactionContainer}>
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionText}>Latest Entries</Text>
            </View>
            <View style={styles.Alltransaction}>
              {transactionsData?.slice(0, 4)?.map((e: any, i: number) => (
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
          </View>
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
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 8,
  },
  card: {
    padding: 15,
    width: "32%",
    backgroundColor: "#0F1B26",
    borderRadius: 20,
  },
  Balance: {
    padding: 15,
    width: "32%",
    backgroundColor: "#0E33F3",

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
  sicon: {
    width: 30,
    height: 30,
    padding: 5,
    backgroundColor: "#242D35",
    borderRadius: 8,
  },
  wallet: {
    width: "100%",
    height: "100%",
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
  entries: {
    flex: 1,
    backgroundColor: "#141D26",
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 32,
    borderTopLeftRadius: 20,
    gap: 50,
  },
  Content: {
    flex: 1,
    gap: 50,
    justifyContent: "space-between",
  },
  saving: {
    padding: 12,
    backgroundColor: "#0F1B26",
    width: "32%",
    borderRadius: 16,
  },
  headentries: {
    flexDirection: "row",
    gap: 12,
  },
  uppersaving: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  textsaving: {
    color: "#fff",
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: "inter",
    fontWeight: "700",
  },
  transactionContainer: {
    gap: 32,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "inter",
    fontWeight: 700,
    color: "#FFF",
  },
  Alltransaction: {
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
});
