import React from "react";
import { Pressable, Text, View } from "react-native";

import { CalculatorInputField } from "@/components/calculator/CalculatorInputField";

type CalculatorInputSectionProps = {
  originalPrice: string;
  discountPercent: string;
  taxPercent: string;
  onChangeOriginalPrice: (value: string) => void;
  onChangeDiscountPercent: (value: string) => void;
  onChangeTaxPercent: (value: string) => void;
  onReset: () => void;
};

export function CalculatorInputSection({
  originalPrice,
  discountPercent,
  taxPercent,
  onChangeOriginalPrice,
  onChangeDiscountPercent,
  onChangeTaxPercent,
  onReset,
}: CalculatorInputSectionProps) {
  return (
    <View className="mt-10 bg-white p-5 flex flex-col gap-5">
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Manrope_700Bold" }}
          className="text-lg uppercase text-neutral-900"
        >
          Inputs
        </Text>

        <Pressable onPress={onReset} className="bg-neutral-300 px-4 py-3">
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="text-xs uppercase tracking-[1.5px] text-neutral-900"
          >
            Reset
          </Text>
        </Pressable>
      </View>

      <CalculatorInputField
        label="Original price"
        value={originalPrice}
        onChangeText={onChangeOriginalPrice}
        placeholder="100"
        prefix="₦"
      />

      <CalculatorInputField
        label="Discount %"
        value={discountPercent}
        onChangeText={onChangeDiscountPercent}
        placeholder="15"
      />

      <CalculatorInputField
        label="Tax %"
        value={taxPercent}
        onChangeText={onChangeTaxPercent}
        placeholder="0"
      />

      <Text className="text-sm leading-6 text-neutral-500 font-sans">
        Enter the original amount in naira and the discount percentage to see
        the final total instantly. Tax is optional and defaults to zero.
      </Text>
    </View>
  );
}
