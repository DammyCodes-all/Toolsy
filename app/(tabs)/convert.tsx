import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ConvertSwitch } from "@/components/convert/ConvertSwitch";
import { ConvertTypes } from "@/constants/types";
import { ConvertBox } from "@/components/convert/ConvertBox";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowReloadHorizontalFreeIcons } from "@hugeicons/core-free-icons";
import { convertData } from "@/constants/convert-data";
import { convertMetric } from "@/utils/convert";

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
  output: number;
  selectedUnit: string;
  outputUnit: string;
};

export default function ConvertScreen() {
  const [currentMetric, setCurrentMetric] = useState<ConvertTypes>("length");
  const units = convertData[currentMetric].units;
  const [convertState, setConvertState] = useState<ConvertState>({
    input: 0,
    output: 0,
    selectedUnit: "Metres",
    outputUnit: "Metres",
  });

  const handleInputChange = (value: number) => {
    setConvertState((prev) => ({ ...prev, input: value }));
  };

  const handleUnitChange = (unit: string) => {
    setConvertState((prev) => ({ ...prev, selectedUnit: unit }));
  };

  const handleOutputUnitChange = (unit: string) => {
    setConvertState((prev) => ({ ...prev, outputUnit: unit }));
  };

  useEffect(() => {
    const { input, selectedUnit, outputUnit } = convertState;

    const output = convertMetric(
      currentMetric,
      input,
      selectedUnit,
      outputUnit,
    );

    setConvertState((prev) => {
      if (prev.output === output) return prev;
      return { ...prev, output };
    });
  }, [
    convertState.input,
    convertState.selectedUnit,
    convertState.outputUnit,
    currentMetric,
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
            Architectural precision utility
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
          <HugeiconsIcon
            icon={ArrowReloadHorizontalFreeIcons}
            className="text-neutral-100"
          />
        </View>

        <ConvertBox
          category={currentMetric}
          to={true}
          options={units}
          selectedOption={convertState.outputUnit}
          input={convertState.output}
          onInputChange={() => {}}
          onOptionChange={handleOutputUnitChange}
        />
      </View>
    </ScrollView>
  );
}
