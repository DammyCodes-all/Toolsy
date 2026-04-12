import React from "react";
import { Text, View } from "react-native";

type CalculatorResultCardProps = {
  title: string;
  value: string;
  description: string;
};

export function CalculatorResultCard({
  title,
  value,
  description,
}: CalculatorResultCardProps) {
  return (
    <View className="mt-10 bg-neutral-900 p-6">
      <Text
        style={{ fontFamily: "Manrope_700Bold" }}
        className="text-xs uppercase tracking-[2px] text-neutral-300"
      >
        {title}
      </Text>

      <Text
        style={{ fontFamily: "Manrope_700Bold" }}
        className="mt-3 text-4xl uppercase text-neutral-100"
      >
        {value}
      </Text>

      <Text className="mt-3 text-base leading-6 text-neutral-300 font-sans">
        {description}
      </Text>
    </View>
  );
}
