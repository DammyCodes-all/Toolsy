import { View, Text } from "react-native";
import { ToolsIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";

export const TopBar = () => {
  return (
    <View className="w-full px-6 py-6 text-neutral-900 shadow-md bg-white h-18 border-b  border-gray-100">
      <View className="flex items-center flex-row gap-3">
        <HugeiconsIcon icon={ToolsIcon} />
        <Text
          style={{ fontFamily: "Manrope_700Bold" }}
          className="uppercase font-sans text-3xl text-neutral-900"
        >
          Toolsy
        </Text>
      </View>
    </View>
  );
};
