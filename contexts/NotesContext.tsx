import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type NoteItem = {
  id: string;
  title: string;
  body: string;
  done: boolean;
  createdAt: string;
};

type CreateNoteInput = {
  title: string;
  body: string;
};

type NotesContextValue = {
  notes: NoteItem[];
  isLoading: boolean;
  addNote: (input: CreateNoteInput) => Promise<void>;
  toggleNoteDone: (id: string) => Promise<void>;
  removeNote: (id: string) => Promise<void>;
  clearNotes: () => Promise<void>;
};

const NOTES_STORAGE_KEY = "toolsy.notes";

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

function createNoteId() {
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function isValidNoteItem(value: unknown): value is NoteItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const note = value as NoteItem;

  return (
    typeof note.id === "string" &&
    typeof note.title === "string" &&
    typeof note.body === "string" &&
    typeof note.done === "boolean" &&
    typeof note.createdAt === "string"
  );
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const persistNotes = useCallback(async (nextNotes: NoteItem[]) => {
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(nextNotes));
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadNotes() {
      try {
        const raw = await AsyncStorage.getItem(NOTES_STORAGE_KEY);

        if (!isMounted) {
          return;
        }

        if (!raw) {
          setNotes([]);
          return;
        }

        const parsed = JSON.parse(raw) as unknown;

        if (Array.isArray(parsed)) {
          setNotes(parsed.filter(isValidNoteItem));
        } else {
          setNotes([]);
        }
      } catch {
        if (isMounted) {
          setNotes([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  const addNote = useCallback(
    async ({ title, body }: CreateNoteInput) => {
      const trimmedTitle = title.trim();
      const trimmedBody = body.trim();

      if (!trimmedTitle && !trimmedBody) {
        return;
      }

      const nextNote: NoteItem = {
        id: createNoteId(),
        title: trimmedTitle || "Untitled Note",
        body: trimmedBody,
        done: false,
        createdAt: new Date().toISOString(),
      };

      let nextNotes: NoteItem[] = [];

      setNotes((currentNotes) => {
        nextNotes = [nextNote, ...currentNotes];
        return nextNotes;
      });

      await persistNotes(nextNotes);
    },
    [persistNotes],
  );

  const toggleNoteDone = useCallback(
    async (id: string) => {
      let nextNotes: NoteItem[] = [];

      setNotes((currentNotes) => {
        nextNotes = currentNotes.map((note) =>
          note.id === id ? { ...note, done: !note.done } : note,
        );
        return nextNotes;
      });

      await persistNotes(nextNotes);
    },
    [persistNotes],
  );

  const removeNote = useCallback(
    async (id: string) => {
      let nextNotes: NoteItem[] = [];

      setNotes((currentNotes) => {
        nextNotes = currentNotes.filter((note) => note.id !== id);
        return nextNotes;
      });

      await persistNotes(nextNotes);
    },
    [persistNotes],
  );

  const clearNotes = useCallback(async () => {
    setNotes([]);
    await AsyncStorage.removeItem(NOTES_STORAGE_KEY);
  }, []);

  const value = useMemo<NotesContextValue>(
    () => ({
      notes,
      isLoading,
      addNote,
      toggleNoteDone,
      removeNote,
      clearNotes,
    }),
    [notes, isLoading, addNote, toggleNoteDone, removeNote, clearNotes],
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return context;
}
