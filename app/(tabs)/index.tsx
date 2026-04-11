import React from "react";
import { ScrollView, Text, View } from "react-native";

import { ToolCard } from "@/components/ui/ToolCard";
import { tools } from "@/constants/tools";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-neutral-100"
      contentContainerStyle={{
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-col gap-4">
        <Text className="text-6xl font-bold uppercase w-6/10">
          Essential tools
        </Text>
        <View className="flex flex-row items-center gap-4">
          <View className="w-0.5 h-full bg-black" />
          <Text className="text-neutral-500 text-lg">
            Pure utility for daily tasks
          </Text>
        </View>
      </View>

      <View className="flex flex-col gap-4 mt-6">
        {tools.map((tool) => (
          <ToolCard key={tool.name} card={tool} />
        ))}
      </View>
    </ScrollView>
  );
}
