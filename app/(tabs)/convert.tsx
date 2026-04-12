import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ConvertSwitch } from "@/components/convert/ConvertSwitch";
import { ConvertTypes } from "@/constants/types";
import { ConvertBox } from "@/components/convert/ConvertBox";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Exchange01Icon } from "@hugeicons/core-free-icons";
import { convertData } from "@/constants/convert-data";
import { convertMetric } from "@/utils/convert";

function parseUserNumber(s: string): number {
  if (typeof s !== "string") return NaN;
  const trimmed = s.trim();
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
  return Number.isFinite(parsed) ? parsed : NaN;
}

const switches: {
  key: ConvertTypes;
  text: string;
  icon: ConvertTypes;
}[] = [
  { key: "length", text: "Length", icon: "length" as const },
  { key: "weight", text: "Weight", icon: "weight" as const },
  { key: "temp", text: "Temperature", icon: "temp" as const },
];

type ConvertState = {
  input: number;
  selectedUnit: string;
  outputUnit: string;
};

export default function ConvertScreen() {
  const [currentMetric, setCurrentMetric] = useState<ConvertTypes>("length");
  const units = convertData[currentMetric].units;

  const [convertState, setConvertState] = useState<ConvertState>(() => {
    const defaultUnit = units[0] ?? "";
    return {
      input: 0,
      selectedUnit: defaultUnit,
      outputUnit: defaultUnit,
    };
  });

  useEffect(() => {
    const defaultUnit = units[0] ?? "";
    setConvertState((prev) => ({
      ...prev,
      selectedUnit: defaultUnit,
      outputUnit: defaultUnit,
    }));
  }, [units]);

  const handleInputChange = (value: number) => {
    setConvertState((prev) => ({
      ...prev,
      input: parseUserNumber(value.toString()),
    }));
  };

  const handleUnitChange = (unit: string) => {
    setConvertState((prev) => ({ ...prev, selectedUnit: unit }));
  };

  const handleOutputUnitChange = (unit: string) => {
    setConvertState((prev) => ({ ...prev, outputUnit: unit }));
  };

  const outputValue = useMemo(() => {
    if (!Number.isFinite(convertState.input)) return NaN;
    return convertMetric(
      currentMetric,
      convertState.input,
      convertState.selectedUnit,
      convertState.outputUnit,
    );
  }, [
    currentMetric,
    convertState.input,
    convertState.selectedUnit,
    convertState.outputUnit,
  ]);

  return (
    <ScrollView
      className="flex-1 bg-neutral-100 text-neutral-900"
      contentContainerStyle={{
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-col gap-4">
        <Text
          style={{ fontFamily: "Manrope_700Bold" }}
          className="text-4xl uppercase"
        >
          Convert
        </Text>
        <View className="flex flex-row items-center gap-4">
          <View className="w-0.5 h-full bg-black" />
          <Text className="text-neutral-500 text-lg font-sans">
            Architectural precision utility.
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap -mx-1 mt-8">
        {switches.map((s, index) => {
          const layoutClass = index === 0 ? "w-full" : "w-1/2";
          return (
            <View key={s.key} className={`${layoutClass} px-2 mb-2`}>
              <ConvertSwitch
                text={s.text}
                icon={s.icon}
                isActive={s.key === currentMetric}
                onPress={() => setCurrentMetric(s.key)}
              />
            </View>
          );
        })}
      </View>

      <View className="flex mt-10">
        <ConvertBox
          category={currentMetric}
          options={units}
          selectedOption={convertState.selectedUnit}
          onOptionChange={handleUnitChange}
          input={convertState.input}
          onInputChange={handleInputChange}
        />

        <View className="mx-auto flex justify-center items-center p-4 text-neutral-100 bg-neutral-900">
          <HugeiconsIcon icon={Exchange01Icon} className="text-neutral-100" />
        </View>
        <ConvertBox
          category={currentMetric}
          to={true}
          options={units}
          selectedOption={convertState.outputUnit}
          input={Number(outputValue)}
          onInputChange={() => {}}
          onOptionChange={handleOutputUnitChange}
        />
      </View>
    </ScrollView>
  );
}
