import React from "react";
import { View, TextInput, Text, StyleSheet, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ChevronDown } from "@hugeicons/core-free-icons";
import { ConvertTypes } from "@/constants/types";

type ConvertBoxProps = {
  input: number;
  onInputChange: (value: number) => void;
  selectedOption?: string;
  onOptionChange: (value: string) => void;
  options: string[];
  category?: ConvertTypes;
  to?: boolean;
  current?: string;
};

export const ConvertBox: React.FC<ConvertBoxProps> = ({
  input,
  onInputChange,
  selectedOption,
  onOptionChange,
  options,
  to,
  current,
}) => {
  const data = (options ?? []).map((o) => ({ label: o, value: o }));
  const value = selectedOption ?? data[0]?.value ?? "";

  return (
    <View
      className={`p-6 shadow-sm flex gap-4 ${to ? "bg-neutral-200" : "bg-white"}`}
    >
      <Text className="text-md uppercase font-semibold text-gray-600">
        {to ? "To (result)" : "From (source)"}
      </Text>

      <TextInput
        className={`border p-4 text-3xl h-24 ${to ? "border-neutral-200 text-gray-500" : "border-neutral-900"}`}
        value={Number.isFinite(input) ? String(input) : ""}
        onChangeText={(text) => {
          const normalized = text.replace(/,/g, ".");
          if (normalized.trim() === "") {
            onInputChange(NaN);
            return;
          }
          const parsed = parseFloat(normalized);
          onInputChange(Number.isFinite(parsed) ? parsed : NaN);
        }}
        placeholder={`Enter ${current ?? "Value"}`}
        keyboardType="numeric"
        inputMode="numeric"
        returnKeyType="done"
        editable={!to}
        selectTextOnFocus={!to}
        style={[
          { fontFamily: "Manrope_700Bold" },
          to
            ? {
                backgroundColor: "#F3F4F6",
                borderColor: "#E5E7EB",
                color: "#6B7280",
                opacity: 0.9,
              }
            : {},
        ]}
      />

      <View className="mt-3">
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          value={value}
          onChange={(item: any) => {
            if (item && typeof item.value === "string") {
              onOptionChange(item.value);
            }
          }}
          placeholder="Select"
          style={styles.dropdown}
          selectedTextStyle={styles.selectedText}
          placeholderStyle={styles.placeholder}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text
                style={[styles.itemLabel, { fontFamily: "Manrope_400Regular" }]}
              >
                {item.label}
              </Text>
            </View>
          )}
          renderRightIcon={() => (
            <HugeiconsIcon
              icon={ChevronDown}
              size={18}
              color={styles.chevron.color}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontFamily: "Manrope_400Regular",
    borderRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "web" ? 10 : 8,
    backgroundColor: "#FFFFFF",
    minHeight: 44,
    justifyContent: "center",
  },

  selectedText: {
    color: "#111827",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
  },

  placeholder: {
    color: "#9CA3AF",
    textTransform: "uppercase",
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
  },

  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  itemLabel: {
    fontSize: 16,
    color: "#111827",
    fontFamily: "Manrope_400Regular",
    textTransform: "uppercase",
  },

  chevron: {
    color: "#9CA3AF",
  },
});
