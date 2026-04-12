import { ScrollView, Text, View } from "react-native";

export default function ConvertScreen() {
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
          className="text-4xl uppercase w-6/10"
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
    </ScrollView>
  );
}
