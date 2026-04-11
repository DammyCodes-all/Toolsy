import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react-native";
import {
  Home01Icon,
  Exchange01Icon,
  NoteEditIcon,
  CalculateIcon,
} from "@hugeicons/core-free-icons";

type RouteNames = "index" | "convert" | "notes" | "calculate";

export function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const icons: Record<RouteNames, IconSvgElement> = {
    index: Home01Icon,
    convert: Exchange01Icon,
    notes: NoteEditIcon,
    calculate: CalculateIcon,
  };

  return (
    <View className="flex-row bg-white h-24 border-t border-gray-100 pb-4">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const name = route.name as RouteNames;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.9}
            // The magic for your design:
            className={`flex-1 items-center justify-center ${
              isFocused ? "bg-black" : "bg-white"
            }`}
          >
            <HugeiconsIcon
              icon={icons[name]}
              size={22}
              color={isFocused ? "white" : "#737373"}
            />
            <Text
              className={`text-[10px] font-bold mt-1 uppercase tracking-widest ${
                isFocused ? "text-white" : "text-neutral-500"
              }`}
            >
              {name === "index" ? "HOME" : name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
