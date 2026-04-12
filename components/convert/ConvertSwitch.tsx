import { ConvertTypes } from "@/constants/types";
import {
  RulerIcon,
  TemperatureIcon,
  WeightScale01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Text, TouchableOpacity } from "react-native";

type ConvertSwitchProps = {
  icon: ConvertTypes;
  text: string;
  onPress?: () => void;
  isActive?: boolean;
};

export function ConvertSwitch({
  icon,
  text,
  onPress,
  isActive,
}: ConvertSwitchProps) {
  const iconMap = {
    length: RulerIcon,
    weight: WeightScale01Icon,
    temp: TemperatureIcon,
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full h-36 flex justify-between p-6 ${isActive ? "bg-neutral-900 text-neutral-100" : "bg-neutral-200 text-neutral-900"}`}
    >
      <HugeiconsIcon
        icon={iconMap[icon]}
        className={`${isActive ? "text-neutral-100" : "text-neutral-900"}`}
      />
      <Text
        className={`uppercase font-semibold ${isActive ? "text-neutral-100" : "text-neutral-900"}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
