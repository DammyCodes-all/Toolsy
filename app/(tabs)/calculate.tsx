import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { CalculatorInputSection } from "@/components/calculator/CalculatorInputSection";
import { CalculatorResultCard } from "@/components/calculator/CalculatorResultCard";
import { CalculatorSummaryRow } from "@/components/calculator/CalculatorSummaryRow";
import {
  calculateDiscount,
  formatNaira,
  formatPercent,
} from "@/utils/calculator";

export default function CalculateScreen() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [taxPercent, setTaxPercent] = useState("0");

  const calculation = useMemo(() => {
    return calculateDiscount(originalPrice, discountPercent, taxPercent);
  }, [originalPrice, discountPercent, taxPercent]);

  const handleReset = () => {
    setOriginalPrice("");
    setDiscountPercent("");
    setTaxPercent("0");
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-100 text-neutral-900"
      contentContainerStyle={{
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 32,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-col gap-4">
        <Text
          style={{ fontFamily: "Manrope_700Bold" }}
          className="text-4xl uppercase"
        >
          Discount calculator
        </Text>

        <View className="flex flex-row items-center gap-4">
          <View className="w-0.5 h-full bg-black" />
          <Text className="text-neutral-500 text-lg font-sans">
            Quick price reduction and savings breakdown.
          </Text>
        </View>
      </View>

      <CalculatorInputSection
        originalPrice={originalPrice}
        discountPercent={discountPercent}
        taxPercent={taxPercent}
        onChangeOriginalPrice={setOriginalPrice}
        onChangeDiscountPercent={setDiscountPercent}
        onChangeTaxPercent={setTaxPercent}
        onReset={handleReset}
      />

      <CalculatorResultCard
        title="Final total"
        value={calculation.isReady ? formatNaira(calculation.finalTotal) : "—"}
        description={
          calculation.isReady
            ? "Calculated after discount and optional tax in Nigerian naira."
            : "Enter a price and discount percentage to generate the result."
        }
      />

      <View className="mt-6 bg-white px-5">
        <CalculatorSummaryRow
          label="Original price"
          value={formatNaira(calculation.original)}
        />
        <CalculatorSummaryRow
          label="Discount rate"
          value={formatPercent(calculation.discountRate)}
        />
        <CalculatorSummaryRow
          label="Discount amount"
          value={formatNaira(calculation.discountAmount)}
        />
        <CalculatorSummaryRow
          label="Discounted subtotal"
          value={formatNaira(calculation.discountedSubtotal)}
        />
        <CalculatorSummaryRow
          label="Tax rate"
          value={formatPercent(calculation.taxRate)}
        />
        <CalculatorSummaryRow
          label="Tax amount"
          value={formatNaira(calculation.taxAmount)}
        />
        <CalculatorSummaryRow
          label="You save"
          value={formatNaira(calculation.totalSavings)}
        />
        <View className="-mx-5 px-5 bg-neutral-100">
          <CalculatorSummaryRow
            label="Final total"
            value={formatNaira(calculation.finalTotal)}
            emphasized
            hideBorder
          />
        </View>
      </View>
    </ScrollView>
  );
}
