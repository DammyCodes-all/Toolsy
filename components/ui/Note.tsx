import React from "react";
import { Pressable, Text, View } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Clock01Icon,
  Delete01Icon,
  Edit01Icon,
} from "@hugeicons/core-free-icons";

export interface NoteItem {
  id: string;
  title: string;
  body: string;
  done: boolean;
  createdAt: string;
}

interface NoteProps {
  note: NoteItem;
  onToggleDone?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

function timeAgoOrDate(iso: string) {
  try {
    const d = new Date(iso);
    const now = Date.now();
    const diff = Math.max(0, Math.floor((now - d.getTime()) / 1000));

    if (diff < 60) return "now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function Note({ note, onToggleDone, onDelete, onEdit }: NoteProps) {
  const isDone = note.done;

  return (
    <Pressable
      onPress={onToggleDone}
      className={`flex-row w-full shadow-md ${isDone ? "bg-neutral-200" : "bg-white"}`}
      accessibilityRole="button"
      accessibilityLabel={`Mark note ${isDone ? "not done" : "done"}`}
    >
      <View className="w-1 bg-black" />

      <View className="flex-1 p-4">
        <View className="flex-row items-start gap-3">
          <View
            className={`h-5 w-5 border-2 border-black ${isDone ? "bg-black" : "bg-white"}`}
          />

          <View className="flex-1">
            <Text
              style={{ fontFamily: "Manrope_700Bold" }}
              className={`text-lg uppercase leading-tight text-neutral-900 ${isDone ? "line-through" : ""}`}
            >
              {note.title}
            </Text>

            <Text
              className={`mt-3 text-sm leading-6 font-sans text-neutral-600 ${isDone ? "line-through" : ""}`}
            >
              {note.body}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-xs text-neutral-500 font-sans">
            <HugeiconsIcon icon={Clock01Icon} /> {timeAgoOrDate(note.createdAt)}
          </Text>

          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                onEdit?.();
              }}
              className="p-2 bg-neutral-300"
              accessibilityLabel="Edit note"
              accessibilityRole="button"
            >
              <HugeiconsIcon
                icon={Edit01Icon}
                size={18}
                className="text-neutral-900"
              />
            </Pressable>

            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                onDelete?.();
              }}
              className="px-2 py-2 bg-neutral-900"
              accessibilityLabel="Delete note"
              accessibilityRole="button"
            >
              <Text className="text-xs text-neutral-100">
                <HugeiconsIcon
                  icon={Delete01Icon}
                  size={16}
                  className="text-neutral-100"
                />
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
