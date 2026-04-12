import React, { useMemo } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Note } from "@/components/ui/Note";
import { useNotes } from "../../contexts/NotesContext";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

export default function NoteScreen() {
  const router = useRouter();
  const { notes, toggleNoteDone, removeNote, isLoading } = useNotes();

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.done !== b.done) {
        return Number(a.done) - Number(b.done);
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [notes]);

  const confirmAndRemove = (id: string) => {
    Alert.alert("Delete note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await removeNote(id);
          } catch {}
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-neutral-100">
      <ScrollView
        className="flex-1 text-neutral-900"
        contentContainerStyle={{
          paddingTop: 24,
          paddingHorizontal: 24,
          paddingBottom: 128,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-col gap-4">
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="text-4xl uppercase"
          >
            Notes & To-Do
          </Text>

          <View className="flex flex-row items-center gap-4">
            <View className="w-0.5 h-full bg-black" />
            <Text className="text-neutral-500 text-lg font-sans">
              Jot down your thoughts, ideas, and tasks here.
            </Text>
          </View>
        </View>

        <View className="mt-10 flex flex-col gap-4">
          {isLoading ? (
            <View className=" bg-neutral-900 p-6">
              <Text
                style={{ fontFamily: "Manrope_700Bold" }}
                className="text-lg uppercase text-neutral-100"
              >
                Loading notes
              </Text>
              <Text className="mt-3 text-base text-neutral-200">
                Pulling your saved notes...
              </Text>
            </View>
          ) : sortedNotes.length === 0 ? (
            <View className=" bg-neutral-900 p-6">
              <Text
                style={{ fontFamily: "Manrope_700Bold" }}
                className="text-lg uppercase text-neutral-100"
              >
                No notes yet
              </Text>
              <Text className="mt-3 text-base leading-6 text-neutral-200 font-sans">
                Create your first note with the button in the lower-right
                corner.
              </Text>
            </View>
          ) : (
            sortedNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                onToggleDone={() => toggleNoteDone(note.id)}
                onDelete={() => confirmAndRemove(note.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => router.push("/create-note")}
        className="absolute bottom-8 right-6 h-16 w-16 items-center justify-center bg-neutral-900"
      >
        <Text
          style={{ fontFamily: "Manrope_700Bold" }}
          className="text-3xl leading-none text-neutral-100"
        >
          <HugeiconsIcon
            icon={PlusSignIcon}
            className="text-neutral-100 text-2xl"
          />
        </Text>
      </Pressable>
    </View>
  );
}
