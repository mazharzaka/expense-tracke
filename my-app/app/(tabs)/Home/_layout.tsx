import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "text",
        }}
      />
      <Stack.Screen
        name="Entries"
        options={{
          // headerShown: false,
          // presentation: "modal",
          title: "Entries",
        }}
      />
      <Stack.Screen
        name="Transaction"
        options={{
          // headerShown: false,
          presentation: "modal",
          title: "Transaction",
        }}
      />
    </Stack>
  );
}
