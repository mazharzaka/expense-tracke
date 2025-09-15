import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

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
          }}
        />
        <Tabs.Screen
          name="Entries"
          options={{
            title: "Entries",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name="10.arrow.trianglehead.counterclockwise.hi"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="transaction"
          options={{
            title: "transaction",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name="10.arrow.trianglehead.counterclockwise.hi"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="login"
          options={{
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
      {/* If you need stack navigation, create a separate file for stack and use <Stack.Screen> here or in that file */}
    </>
  );
}
