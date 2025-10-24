import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarStyle: { display: "none" },
            href: null,
          }}
        />

        <Tabs.Screen
          name="login"
          options={{
            tabBarStyle: { display: "none" },
            tabBarIcon: ({ color }) => (
              <Ionicons name="log-in-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      {/* If you need stack navigation, create a separate file for stack and use <Stack.Screen> here or in that file */}
    </>
  );
}
