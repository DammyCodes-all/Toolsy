import React, { useEffect, useState } from "react";
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

  const displayValue = Number.isFinite(input) ? String(input) : "";

  return (
    <View
      style={[styles.container, to ? styles.containerTo : styles.containerFrom]}
    >
      <Text style={styles.label}>{to ? "To (result)" : "From (source)"}</Text>

      <TextInput
        value={displayValue}
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
        keyboardType={Platform.OS === "ios" ? "decimal-pad" : "numeric"}
        returnKeyType="done"
        editable={!to}
        selectTextOnFocus={!to}
        style={[
          styles.input,
          { fontFamily: Platform.OS === "web" ? "Manrope_700Bold" : undefined },
          to ? styles.inputDisabled : undefined,
        ]}
      />

      <View style={{ marginTop: 12 }}>
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
              <Text style={styles.itemLabel}>{item.label}</Text>
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
  container: {
    padding: 16,
    gap: 12 as any,
  },
  containerFrom: {
    backgroundColor: "#FFFFFF",
  },
  containerTo: {
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "web" ? 12 : 10,
    backgroundColor: "#FFFFFF",
    color: "#111827",
    fontSize: 24,
    height: 96,
  },
  inputDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
    color: "#6B7280",
    opacity: 0.9,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
