import React, { useState } from "react";
import { BasicWrapper } from "@/components";
import { MemoriesGrid, Memory, mockMemories } from "@/components/memories/MemoriesGrid";
import { MemoryModal } from "@/components/memories/MemoryModal";

function Memories() {
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
    <>
      <MemoriesGrid onMemoryPress={openMemory} />
      <MemoryModal
        selectedMemory={selectedMemory}
        selectedIndex={selectedIndex}
        onClose={closeMemory}
        onIndexChange={handleIndexChange}
      />
    </>
  );
}

export default BasicWrapper(Memories);