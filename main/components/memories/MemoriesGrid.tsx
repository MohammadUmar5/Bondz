import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export const mockMemories = [
  {
    id: "1",
    date: "9/4/2023",
    title: "Physics 140-1 Syllabus",
    subtitle: "Syllabus",
    description:
      "Information about the Fall 2023 course taught by Pam Daniels, from phy140-1.pdf",
    type: "document",
    bgColor: "#f8f9fa",
    textColor: "#333",
    rotation: 2,
  },
  {
    id: "2",
    date: "9/1/2023",
    title: "Attaboy",
    subtitle: "Location",
    description: "A bar that you wanted to check out",
    type: "location",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330",
    bgColor: "#8B4513",
    textColor: "#fff",
    rotation: -1,
  },
  {
    id: "3",
    date: "8/31/2023",
    title: "Grandma's Scallion Flatbread",
    subtitle: "Recipe",
    description: "",
    type: "recipe",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
    bgColor: "#fff",
    textColor: "#333",
    rotation: 1,
  },
  {
    id: "4",
    date: "8/25/2023",
    title: "The Adventures of Saiki K.",
    subtitle: "TV Show",
    description:
      "Your favorite anime about a psychic high school school student tries to live a normal life despite his abilities.",
    type: "show",
    bgColor: "#e8f4f8",
    textColor: "#333",
    rotation: -2,
  },
  {
    id: "5",
    date: "8/25/2023",
    title: "Hyaluronic Acid",
    subtitle: "",
    description:
      "A popular skincare ingredient that you've mentioned you are sensitive to and prefer to avoid.",
    type: "note",
    bgColor: "#f0f8ff",
    textColor: "#333",
    rotation: 1.5,
  },
  {
    id: "6",
    date: "8/21/2023",
    title: "Hermès",
    subtitle: "",
    description: "Your pet cat.",
    type: "pet",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    bgColor: "#fff",
    textColor: "#333",
    rotation: -1.5,
  },
  {
    id: "7",
    date: "8/15/2023",
    title: "Coffee Meeting",
    subtitle: "Location",
    description: "Nice cafe downtown",
    type: "location",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    bgColor: "#8B4513",
    textColor: "#fff",
    rotation: 2.5,
  },
  {
    id: "8",
    date: "8/10/2023",
    title: "Study Notes",
    subtitle: "Notes",
    description:
      "Important chemistry formulas and concepts for the upcoming exam.",
    type: "note",
    bgColor: "#fff8e1",
    textColor: "#333",
    rotation: -0.5,
  },
];

export type Memory = (typeof mockMemories)[number];

interface MemoriesGridProps {
  onMemoryPress: (memory: Memory, index: number) => void;
}

export function MemoriesGrid({ onMemoryPress }: MemoriesGridProps) {
  const CARD_WIDTH = (width - 48) / 2;
  const CARD_HEIGHT = 200;

  const renderMemoryCard = ({
    item,
    index,
  }: {
    item: Memory;
    index: number;
  }) => {
    const isLeft = index % 2 === 0;

    return (
      <View
        style={{
          width: CARD_WIDTH,
          marginBottom: 16,
          marginLeft: isLeft ? 0 : 16,
        }}
      >
        {/* Background cards for layered effect */}
        <View
          style={{
            position: "absolute",
            top: 4,
            left: 2,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: "#ddd",
            borderRadius: 16,
            transform: [{ rotate: `${item.rotation + 1}deg` }],
            opacity: 0.3,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 2,
            left: 1,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: "#bbb",
            borderRadius: 16,
            transform: [{ rotate: `${item.rotation + 0.5}deg` }],
            opacity: 0.2,
          }}
        />

        {/* Main card */}
        <Pressable
          onPress={() => onMemoryPress(item, index)}
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: item.image ? "#000" : item.bgColor,
            borderRadius: 16,
            padding: item.image ? 0 : 16,
            transform: [{ rotate: `${item.rotation}deg` }],
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
            overflow: "hidden",
          }}
        >
          {item.image ? (
            // Image card with glassmorphic overlay
            <>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
                resizeMode="cover"
              />
              {/* Glassmorphic overlay */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(20px)",
                  padding: 12,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "#fff",
                    opacity: 0.8,
                    marginBottom: 2,
                  }}
                >
                  {item.date}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#fff",
                    lineHeight: 16,
                  }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
            </>
          ) : (
            // Text-only card
            <>
              <Text
                style={{
                  fontSize: 11,
                  color: "#666",
                  marginBottom: 4,
                }}
              >
                {item.date}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: item.textColor,
                  marginBottom: item.subtitle ? 4 : 8,
                  lineHeight: 20,
                }}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              {item.subtitle && (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#888",
                    marginBottom: 8,
                  }}
                >
                  {item.subtitle}
                </Text>
              )}

              {item.description && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#666",
                    lineHeight: 16,
                  }}
                  numberOfLines={4}
                >
                  {item.description}
                </Text>
              )}
            </>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={mockMemories}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={renderMemoryCard}
      />
    </>
  );
}
