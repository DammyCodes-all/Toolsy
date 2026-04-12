import React from "react";
import {
  CalculateIcon,
  Exchange01Icon,
  NoteEditIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react-native";
import { Link } from "expo-router";
import { Text, View } from "react-native";

type IconKey = "convert" | "notes" | "calculate";
type ToolHref = "/convert" | "/notes" | "/calculate";

export type ToolCardType = {
  name: string;
  description: string;
  icon: IconKey;
  href: ToolHref;
};

export const ToolCard: React.FC<{ card: ToolCardType; index?: number }> = ({
  card,
  index,
}) => {
  const icons: Record<IconKey, IconSvgElement> = {
    convert: Exchange01Icon,
    notes: NoteEditIcon,
    calculate: CalculateIcon,
  };

  const IconComponent = icons[card.icon];

  return (
    <View className="flex flex-col shadow-sm bg-white gap-4 p-6 ">
      <View className="flex flex-row justify-between items-center gap-3 mb-6">
        <HugeiconsIcon icon={IconComponent} size={32} color={"black"} />
        <Text className="uppercase text-lg text-neutral-500 font-sans font-semibold">
          Module {index !== undefined ? `0${index + 1}` : null}
        </Text>
      </View>

      <Text
        style={{ fontFamily: "Manrope_700Bold" }}
        className="text-neutral-900 text-3xl font-sans"
      >
        {card.name}
      </Text>
      <Text className="text-neutral-500 text-lg font-sans">
        {card.description}
      </Text>

      <Link
        href={card.href}
        asChild
        className="w-full px-6 py-3 bg-neutral-200"
      >
        <Text className="text-neutral-900 font-sans uppercase text-center mt-2">
          Use Now
        </Text>
      </Link>
    </View>
  );
};
