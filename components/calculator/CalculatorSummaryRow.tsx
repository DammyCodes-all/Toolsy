import React from "react";
import { Text, View } from "react-native";

type CalculatorSummaryRowProps = {
  label: string;
  value: string;
  emphasized?: boolean;
  hideBorder?: boolean;
};

export function CalculatorSummaryRow({
  label,
  value,
  emphasized = false,
  hideBorder = false,
}: CalculatorSummaryRowProps) {
  return (
    <View
      className={`flex-row items-center justify-between py-4 ${
        hideBorder ? "" : "border-b border-neutral-200"
      } ${emphasized ? "bg-neutral-100" : "bg-white"}`}
    >
      <Text className="text-sm uppercase font-sans tracking-[1.5px] text-neutral-500">
        {label}
      </Text>

      <Text
        style={{ fontFamily: "Manrope_700Bold" }}
        className={`text-base ${
          emphasized ? "text-neutral-900" : "text-neutral-800"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}
