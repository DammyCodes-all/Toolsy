import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TopBar } from "@/components/topbar";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const safeAreaClassName = `${isDark ? "bg-neutral-900" : "bg-neutral-100"} flex-1`;

  const statusBarStyle = isDark ? "light" : "dark";

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className={safeAreaClassName}
        edges={["top", "right", "bottom", "left"]}
      >
        <TopBar />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style={statusBarStyle} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
