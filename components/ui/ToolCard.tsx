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

export const ToolCard: React.FC<{ card: ToolCardType }> = ({ card }) => {
  const icons: Record<IconKey, IconSvgElement> = {
    convert: Exchange01Icon,
    notes: NoteEditIcon,
    calculate: CalculateIcon,
  };

  const IconComponent = icons[card.icon];

  return (
    <View className="flex flex-col shadow-sm bg-white gap-4 p-6">
      <HugeiconsIcon icon={IconComponent} size={22} color={"black"} />
      <Text className="text-neutral-900 text-3xl font-bold">{card.name}</Text>
      <Text className="text-neutral-500 text-lg">{card.description}</Text>

      <Link href={card.href} asChild>
        <Text className="text-blue-600">Use Now</Text>
      </Link>
    </View>
  );
};
