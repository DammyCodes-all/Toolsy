import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { useColorScheme, Text as RNText } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TopBar } from "@/components/topbar";
import { NotesProvider } from "../contexts/NotesContext";

import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const safeAreaClassName = `${isDark ? "bg-neutral-900" : "bg-neutral-100"} flex-1`;
  const statusBarStyle = isDark ? "light" : "dark";

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});

      const anyText = RNText as any;
      anyText.defaultProps = anyText.defaultProps || {};

      const existing = anyText.defaultProps.style;

      if (Array.isArray(existing)) {
        anyText.defaultProps.style = [
          { fontFamily: "Manrope_400Regular" },
          ...existing,
        ];
      } else if (existing) {
        anyText.defaultProps.style = [
          { fontFamily: "Manrope_400Regular" },
          existing,
        ];
      } else {
        anyText.defaultProps.style = { fontFamily: "Manrope_400Regular" };
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NotesProvider>
      <SafeAreaProvider>
        <SafeAreaView
          className={safeAreaClassName}
          edges={["top", "right", "bottom", "left"]}
        >
          <TopBar />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="create-note"
              options={{
                headerShown: false,
              }}
            />
          </Stack>

          <StatusBar style={statusBarStyle} />
        </SafeAreaView>
      </SafeAreaProvider>
    </NotesProvider>
  );
}
