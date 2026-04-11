import { Tabs } from "expo-router";
import { MyTabBar } from "@/components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="convert" options={{ title: "Convert" }} />
      <Tabs.Screen name="notes" options={{ title: "Notes" }} />
      <Tabs.Screen name="calculate" options={{ title: "Calculate" }} />
    </Tabs>
  );
}
