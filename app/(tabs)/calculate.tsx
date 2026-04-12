import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

function parseUserNumber(value: string): number {
  if (typeof value !== "string") return NaN;

  const trimmed = value.trim();

  if (
    trimmed === "" ||
    trimmed === "-" ||
    trimmed === "." ||
    trimmed === "-."
  ) {
    return NaN;
  }

  const normalized = trimmed.replace(/,/g, ".");
  const parsed = parseFloat(normalized);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return NaN;
  }

  return parsed;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatMoney(value: number) {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(2);
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(2)}%`;
}

function SummaryRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center justify-between border-b border-neutral-200 py-4 ${
        emphasized ? "bg-neutral-100" : "bg-white"
      }`}
    >
      <Text className="text-sm uppercase tracking-[1.5px] text-neutral-500">
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

export default function CalculateScreen() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [taxPercent, setTaxPercent] = useState("0");

  const calculation = useMemo(() => {
    const original = parseUserNumber(originalPrice);
    const discount = parseUserNumber(discountPercent);
    const tax = parseUserNumber(taxPercent);

    const hasOriginal = Number.isFinite(original);
    const hasDiscount = Number.isFinite(discount);
    const safeTax = Number.isFinite(tax) ? tax : 0;

    if (!hasOriginal || !hasDiscount) {
      return {
        isReady: false,
        original: 0,
        discountRate: 0,
        taxRate: safeTax,
        discountAmount: 0,
        discountedSubtotal: 0,
        taxAmount: 0,
        finalTotal: 0,
        totalSavings: 0,
      };
    }

    const discountRate = clamp(discount, 0, 100);
    const taxRate = clamp(safeTax, 0, 100);

    const discountAmount = original * (discountRate / 100);
    const discountedSubtotal = original - discountAmount;
    const taxAmount = discountedSubtotal * (taxRate / 100);
    const finalTotal = discountedSubtotal + taxAmount;

    return {
      isReady: true,
      original,
      discountRate,
      taxRate,
      discountAmount,
      discountedSubtotal,
      taxAmount,
      finalTotal,
      totalSavings: discountAmount,
    };
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

      <View className="mt-10 bg-white p-5 flex flex-col gap-5">
        <View className="flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="text-lg uppercase text-neutral-900"
          >
            Inputs
          </Text>

          <Pressable onPress={handleReset} className="bg-neutral-300 px-4 py-3">
            <Text
              style={{ fontFamily: "Manrope_700Bold" }}
              className="text-xs uppercase tracking-[1.5px] text-neutral-900"
            >
              Reset
            </Text>
          </Pressable>
        </View>

        <View className="flex flex-col gap-2">
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="text-xs uppercase tracking-[2px] text-neutral-900"
          >
            Original price
          </Text>
          <TextInput
            value={originalPrice}
            onChangeText={setOriginalPrice}
            placeholder="100"
            placeholderTextColor="#737373"
            keyboardType="decimal-pad"
            className="border-b border-neutral-900 px-4 py-4 font-sans text-base text-neutral-900"
          />
        </View>

        <View className="flex flex-col gap-2">
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="text-xs uppercase tracking-[2px] text-neutral-900"
          >
            Discount %
          </Text>
          <TextInput
            value={discountPercent}
            onChangeText={setDiscountPercent}
            placeholder="15"
            placeholderTextColor="#737373"
            keyboardType="decimal-pad"
            className="border-b border-neutral-900 px-4 py-4 font-sans text-base text-neutral-900"
          />
        </View>

        <View className="flex flex-col gap-2">
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="text-xs uppercase tracking-[2px] text-neutral-900"
          >
            Tax %
          </Text>
          <TextInput
            value={taxPercent}
            onChangeText={setTaxPercent}
            placeholder="0"
            placeholderTextColor="#737373"
            keyboardType="decimal-pad"
            className="border-b border-neutral-900 px-4 py-4 font-sans text-base text-neutral-900"
          />
        </View>

        <Text className="text-sm leading-6 text-neutral-500 font-sans">
          Enter the original amount and discount percentage to see the final
          total instantly. Tax is optional and defaults to zero.
        </Text>
      </View>

      <View className="mt-10 bg-neutral-900 p-6">
        <Text
          style={{ fontFamily: "Manrope_700Bold" }}
          className="text-xs uppercase tracking-[2px] text-neutral-300"
        >
          Final total
        </Text>

        <Text
          style={{ fontFamily: "Manrope_700Bold" }}
          className="mt-3 text-4xl uppercase text-neutral-100"
        >
          {calculation.isReady ? formatMoney(calculation.finalTotal) : "—"}
        </Text>

        <Text className="mt-3 text-base leading-6 text-neutral-300 font-sans">
          {calculation.isReady
            ? "Calculated after discount and optional tax."
            : "Enter a price and discount percentage to generate the result."}
        </Text>
      </View>

      <View className="mt-6 bg-white px-5">
        <SummaryRow
          label="Original price"
          value={formatMoney(calculation.original)}
        />
        <SummaryRow
          label="Discount rate"
          value={formatPercent(calculation.discountRate)}
        />
        <SummaryRow
          label="Discount amount"
          value={formatMoney(calculation.discountAmount)}
        />
        <SummaryRow
          label="Discounted subtotal"
          value={formatMoney(calculation.discountedSubtotal)}
        />
        <SummaryRow
          label="Tax rate"
          value={formatPercent(calculation.taxRate)}
        />
        <SummaryRow
          label="Tax amount"
          value={formatMoney(calculation.taxAmount)}
        />
        <SummaryRow
          label="You save"
          value={formatMoney(calculation.totalSavings)}
        />
        <SummaryRow
          label="Final total"
          value={formatMoney(calculation.finalTotal)}
          emphasized
        />
      </View>
    </ScrollView>
  );
}
