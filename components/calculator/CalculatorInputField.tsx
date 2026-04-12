import React from "react";
import { Text, TextInput, View } from "react-native";

type CalculatorInputFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  prefix?: string;
};

export function CalculatorInputField({
  label,
  value,
  onChangeText,
  placeholder,
  prefix,
}: CalculatorInputFieldProps) {
  return (
    <View className="flex flex-col gap-2">
      <Text
        style={{ fontFamily: "Manrope_700Bold" }}
        className="text-xs uppercase tracking-[2px] text-neutral-900"
      >
        {label}
      </Text>
      <View className="flex-row items-center border-b border-neutral-900 px-4">
        {prefix ? (
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="pr-3 text-base text-neutral-900"
          >
            {prefix}
          </Text>
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#737373"
          keyboardType="decimal-pad"
          className="flex-1 py-4 font-sans text-base text-neutral-900"
        />
      </View>
    </View>
  );
}
