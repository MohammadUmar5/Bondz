import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { JournalEntryComponent, JournalEntry, MediaItem } from "./JournalEntry";
import { SharedJournal } from "./JournalCards";
import uuid from "react-native-uuid";

interface JournalOverviewProps {
  journal: SharedJournal;
  onBackPress: () => void;
  onMediaPress: (media: MediaItem) => void;
  onJournalUpdate: (updatedJournal: SharedJournal) => void;
}

export const JournalOverview: React.FC<JournalOverviewProps> = ({ 
  journal, 
  onBackPress, 
  onMediaPress,
  onJournalUpdate 
}) => {
  const [newEntry, setNewEntry] = useState("");
  const [newEntryTitle, setNewEntryTitle] = useState("");

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    
    const entry: JournalEntry = {
      id: uuid.v4() as string,
      title: newEntryTitle || "Untitled Entry",
      content: newEntry,
      timestamp: new Date().toDateString(),
      mood: "neutral",
      author: "You",
      media: []
    };
    
    const updatedJournal = {
      ...journal,
      entries: [entry, ...journal.entries]
    };
    
    onJournalUpdate(updatedJournal);
    setNewEntry("");
    setNewEntryTitle("");
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: Colors.default.bg }}
    >
      <View className="flex-row items-center mb-6">
        <TouchableOpacity 
          onPress={onBackPress}
          className="mr-4"
        >
          <Ionicons name="chevron-back" size={24} color={Colors.default.textPrimary} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-2xl font-bold" style={{ color: '#FFF' }}>
            {journal.title}
          </Text>
          <Text className="text-sm" style={{ color: Colors.default.textSecondary }}>
            {journal.entries.length} entries
          </Text>
        </View> 
      </View>

      {/* Add Entry Section */}
      <View className="rounded-2xl shadow-sm p-4 mb-6" style={{ backgroundColor: Colors.default.cardBg }}>
        <Text className="font-medium mb-3" style={{ color: Colors.default.textPrimary }}>
          Add New Entry
        </Text>
        <TextInput
          value={newEntryTitle}
          onChangeText={setNewEntryTitle}
          placeholder="Entry title..."
          placeholderTextColor={Colors.default.textSecondary}
          className="border-b pb-2 mb-3 font-medium"
          style={{ 
            color: Colors.default.textPrimary,
            borderBottomColor: Colors.default.textSecondary + '40'
          }}
        />
        <TextInput
          value={newEntry}
          onChangeText={setNewEntry}
          placeholder="Write your thoughts, memories, or feelings..."
          placeholderTextColor={Colors.default.textSecondary}
          className="h-24 mb-3"
          style={{ color: Colors.default.textPrimary }}
          multiline
        />
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-row items-center rounded-xl px-3 py-2" style={{ backgroundColor: Colors.default.textSecondary + '20' }}>
            <Ionicons name="camera" size={16} color={Colors.default.textSecondary} />
            <Text className="text-xs ml-1" style={{ color: Colors.default.textSecondary }}>Media</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddEntry}
            className="bg-pink-500 rounded-xl px-6 py-2"
          >
            <Text className="text-white font-medium">Add Entry</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Entries */}
      {journal.entries.map((entry) => (
        <JournalEntryComponent
          key={entry.id}
          entry={entry}
          onMediaPress={onMediaPress}
        />
      ))}
    </ScrollView>
  );
};