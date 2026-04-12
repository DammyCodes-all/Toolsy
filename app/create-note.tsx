import React, { useState } from "react";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";

import { useNotes } from "../contexts/NotesContext";

export default function CreateNoteScreen() {
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedBody) {
      Alert.alert("Missing fields", "Please fill in the note.");
      return;
    }

    try {
      setIsSaving(true);

      await addNote({
        title: trimmedTitle,
        body: trimmedBody,
      });

      router.back();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-neutral-100">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 24,
          paddingHorizontal: 24,
          paddingBottom: 32,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-col gap-6">
          <Pressable
            onPress={() => router.back()}
            disabled={isSaving}
            className={`self-start px-4 py-3 ${
              isSaving ? "bg-neutral-300" : "bg-neutral-900"
            }`}
          >
            <Text
              style={{ fontFamily: "Manrope_700Bold" }}
              className={`text-sm uppercase ${
                isSaving ? "text-neutral-500" : "text-white"
              }`}
            >
              Back
            </Text>
          </Pressable>

          <View className="flex flex-col gap-4">
            <Text
              style={{ fontFamily: "Manrope_700Bold" }}
              className="text-4xl uppercase"
            >
              Create note
            </Text>

            <View className="flex flex-row items-center gap-4">
              <View className="w-0.5 h-full bg-black" />
              <Text className="text-neutral-500 text-lg font-sans">
                Easily create a new note.
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-10 bg-white p-5 flex flex-col gap-5">
          <View className="flex flex-col gap-2">
            <Text
              style={{ fontFamily: "Manrope_700Bold" }}
              className="text-xs uppercase tracking-[2px] text-neutral-900"
            >
              Title
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor="#737373"
              editable={!isSaving}
              className="border-b border-neutral-900 font-sans px-4 py-4 text-base text-neutral-900"
            />
          </View>

          <View className="flex flex-col gap-2">
            <Text
              style={{ fontFamily: "Manrope_700Bold" }}
              className="text-xs uppercase tracking-[2px] text-neutral-900"
            >
              Note
            </Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Write the details here..."
              placeholderTextColor="#737373"
              multiline
              textAlignVertical="top"
              editable={!isSaving}
              className="min-h-[120px] border-b font-sans border-neutral-900 px-4  py-4 text-base text-neutral-900"
            />
          </View>

          <View className="flex-row gap-3 pt-2">
            <Pressable
              onPress={() => router.back()}
              disabled={isSaving}
              className="flex-1 bg-neutral-300 px-4 py-4"
            >
              <Text
                style={{ fontFamily: "Manrope_700Bold" }}
                className="text-center text-sm uppercase text-neutral-900"
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              disabled={isSaving}
              className={`flex-1 px-4 py-4 ${
                isSaving ? "bg-neutral-700" : "bg-black"
              }`}
            >
              <Text
                style={{ fontFamily: "Manrope_700Bold" }}
                className="text-center text-sm uppercase text-white"
              >
                {isSaving ? "Saving..." : "Save note"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
