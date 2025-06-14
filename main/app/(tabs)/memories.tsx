import { BasicWrapper } from "@/components";
import {
  MemoriesGrid,
  Memory,
  mockMemories,
} from "@/components/memories/MemoriesGrid";
import { MemoryModal } from "@/components/memories/MemoryModal";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Memories() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openMemory = (memory: Memory, index: number) => {
    setSelectedMemory(memory);
    setSelectedIndex(index);
  };

  const closeMemory = () => {
    setSelectedMemory(null);
  };

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
    setSelectedMemory(mockMemories[index]);
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between px-6 py-2 pb-4">
        <Text
          className="text-2xl font-bold"
          style={{ color: Colors[theme].textPrimary }}
        >
          All memories
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => router.push("/memories/add-memory")}
        >
          <MaterialIcons
            name="add-box"
            size={24}
            color={Colors[theme].textPrimary}
          />
        </TouchableOpacity>
      </View>
      <MemoriesGrid onMemoryPress={openMemory} />
      <MemoryModal
        selectedMemory={selectedMemory}
        selectedIndex={selectedIndex}
        onClose={closeMemory}
        onIndexChange={handleIndexChange}
      />
    </View>
  );
}

export default BasicWrapper(Memories);
