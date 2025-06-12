import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { JournalEntry } from "./JournalEntry";

// Interface for shared journal structure
interface SharedJournal {
  id: string;
  title: string;
  description: string;
  entries: JournalEntry[];
  coverImage?: string;
  createdAt: string;
  collaborators: string[];
}

// Interface for connected user data
interface ConnectedUser {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  sharedJournals: SharedJournal[];
}

// Props interface for JournalCards component
interface JournalCardsProps {
  user: ConnectedUser;
  onJournalPress: (journal: SharedJournal) => void;
  onBackPress: () => void;
}

export const JournalCards: React.FC<JournalCardsProps> = (props) => {
  const { user, onJournalPress, onBackPress } = props;
  // Array of gradient color pairs for different journal cards
  // Creates visual variety across multiple journals
  const cardGradients = [
    ["#FF6B8A", "#4ECDC4"], // Pink to Teal
    ["#667eea", "#764ba2"], // Blue to Purple
    ["#f093fb", "#f5576c"], // Pink to Coral
    ["#4facfe", "#00f2fe"], // Blue to Cyan
    ["#fa709a", "#fee140"], // Pink to Yellow
    ["#a8edea", "#fed6e3"], // Mint to Pink
  ];

  // Function to create subtle card positioning for visual interest
  // Reduced rotation and translation to prevent cutoff issues
  const getCardStyle = (index: number) => {
    const patterns = [
      { rotate: "1.5deg", translateX: 4, translateY: -1, marginBottom: 18 },
      { rotate: "-1.5deg", translateX: -4, translateY: 1, marginBottom: 16 },
      { rotate: "1deg", translateX: 3, translateY: -1, marginBottom: 17 },
      { rotate: "-1deg", translateX: -3, translateY: 1, marginBottom: 15 },
      { rotate: "1.5deg", translateX: 4, translateY: -1, marginBottom: 18 },
      { rotate: "-1.5deg", translateX: -4, translateY: 1, marginBottom: 16 },
    ];

    const pattern = patterns[index % patterns.length];

    return {
      transform: [
        { rotate: pattern.rotate },
        { translateX: pattern.translateX },
        { translateY: pattern.translateY },
      ],
      marginBottom: pattern.marginBottom,
    };
  };

  // Helper function to get gradient colors based on card index
  // Cycles through available gradients for consistent theming
  const getGradientColors = (index: number) => {
    return cardGradients[index % cardGradients.length];
  };

  // Ensure user and required data exist
  if (!user || !user.sharedJournals || !Array.isArray(user.sharedJournals)) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          No journals available
        </Text>
      </View>
    );
  }

  // Additional safety check
  const userName = user.name || "Unknown User";
  const journalsCount = user.sharedJournals.length || 0;

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Animated background layer */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
        }}
      />

      {/* Main scrollable content container with increased padding to prevent cutoff */}
      <ScrollView
        className="flex-1"
        style={{ paddingHorizontal: 20 }} // Increased horizontal padding
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header section with glassmorphic design */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 25, // Decreased margin
            marginTop: 10,
            backgroundColor: "#000",
            borderRadius: 18, // Decreased radius
            height: 70, // Decreased height
            width: "105%",
            padding: 10,
            marginLeft: -20, // Adjusted to match increased padding
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Back navigation button */}
          <TouchableOpacity
            onPress={onBackPress}
            style={{
              marginRight: 12, // Decreased margin
              backgroundColor: "#000",
              borderRadius: 10, // Decreased radius
              padding: 6, // Decreased padding
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={16} color="white" />
          </TouchableOpacity>

          {/* Header text content */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16, // Decreased font size
                fontWeight: "400",
                color: "white",
                textShadowColor: "rgba(0, 0, 0, 0.3)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 4,
              }}
            >
              ✨ {userName}'s Journals
            </Text>
            <Text
              style={{
                fontSize: 9, // Decreased font size
                color: "rgba(255, 255, 255, 0.8)",
                marginTop: 2,
              }}
            >
              {journalsCount} magical memories shared
            </Text>
          </View>
        </View>

        {/* Journal cards mapping */}
        {user.sharedJournals.map((journal, index) => {
          const [color1, color2] = getGradientColors(index);
          const cardStyle = getCardStyle(index);

          return (
            <TouchableOpacity
              key={journal.id}
              onPress={() => onJournalPress(journal)}
              style={[
                {
                  height: 280,
                  width: 260,
                  borderRadius: 20, // Decreased from 24
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  shadowColor: color1,
                  shadowOffset: { width: 0, height: 4 }, // Decreased shadow
                  shadowOpacity: 0.2, // Decreased opacity
                  shadowRadius: 12, // Decreased radius
                  elevation: 6, // Decreased elevation
                },
                cardStyle,
              ]}
              activeOpacity={0.8}
            >
              {/* Subtle gradient overlay for glassmorphic effect */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: `${color1}05`,
                  zIndex: 1,
                }}
              />

              {/* Cover image section */}
              {journal.coverImage ? (
                <View style={{ position: "relative", height: 120 }}>
                  <Image
                    source={{ uri: journal.coverImage }}
                    style={{
                      marginLeft: 8, // Decreased margin
                      marginTop: 8, // Decreased margin
                      borderTopLeftRadius: 16, // Decreased radius
                      borderTopRightRadius: 16, // Decreased radius
                      width: "93.8%",
                      height: "130%",
                      opacity: 0.9,
                    }}
                    resizeMode="cover"
                  />
                  {/* Glassmorphic overlay on image bottom */}
                  <View
                    style={{
                      position: "absolute",
                      bottom: -45,
                      left: 0,
                      right: 0,
                      height: 150, // Decreased height
                      backgroundColor: `${color1}08`,
                    }}
                  />
                  {/* Floating "Shared" badge */}
                  <View
                    style={{
                      position: "absolute",
                      top: 8, // Decreased from 12
                      left: 8, // Decreased from 12
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderRadius: 14, // Decreased radius
                      paddingHorizontal: 8, // Decreased padding
                      paddingVertical: 4, // Decreased padding
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10, // Decreased font size
                        fontWeight: "600",
                        textShadowColor: "rgba(0, 0, 0, 0.3)",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}
                    >
                      ✨ Shared
                    </Text>
                  </View>
                  {/* Floating journal icon */}
                  <View
                    style={{
                      position: "absolute",
                      top: 8, // Decreased from 12
                      right: 8, // Decreased from 12
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 12, // Decreased radius
                      padding: 6, // Decreased padding
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <Ionicons name="book-outline" size={16} color="white" />
                  </View>
                </View>
              ) : null}

              {/* Card content section */}
              <View style={{ marginTop: 40, padding: 14, zIndex: 2 }}>
                {/* Title and description section */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 0, // Decreased margin
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 18, // Decreased font size from 22
                        fontWeight: "bold",
                        marginBottom: 6, // Decreased margin
                        color: "white",
                        textShadowColor: "rgba(0, 0, 0, 0.3)",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 4,
                      }}
                    >
                      <Text> {journal.title || "Untitled Journal"}</Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 12, // Decreased font size from 14
                        lineHeight: 16, // Decreased line height
                        color: "rgba(255, 255, 255, 0.85)",
                      }}
                    >
                      {journal.description || "No description available"}
                    </Text>
                  </View>
                </View>
                {/* Stats row with glassmorphic elements */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 12, // Decreased margin
                  }}
                >
                  {/* Stats tags container */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {/* Created date tag */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        paddingHorizontal: 6, // Decreased padding
                        paddingVertical: 3, // Decreased padding
                        borderRadius: 8, // Decreased radius
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        alignSelf: "flex-start", // Only take width of content
                      }}
                    >
                      <Ionicons
                        name="calendar-outline"
                        size={10} // Decreased size
                        color="rgba(255, 255, 255, 0.8)"
                      />
                      <Text
                        style={{
                          fontSize: 9, // Decreased font size
                          marginLeft: 3, // Decreased margin
                          color: "rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        Created {journal.createdAt || "Unknown"}
                      </Text>
                    </View>

                    {/* Memories count tag */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: `${color1}30`,
                        paddingHorizontal: 6, // Decreased padding
                        paddingVertical: 3, // Decreased padding
                        borderRadius: 8, // Decreased radius
                        borderWidth: 1,
                        borderColor: `${color1}50`,
                        alignSelf: "flex-start", // Only take width of content
                      }}
                    >
                      <Ionicons
                        name="document-text-outline"
                        size={10} // Decreased size
                        color="white"
                      />
                      <Text
                        style={{
                          fontSize: 9, // Decreased font size
                          marginLeft: 3, // Decreased margin
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        {journal.entries?.length || 0} memories ✨
                      </Text>
                    </View>
                  </View>

                  {/* Glassmorphic chevron indicator only */}
                  <View
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 8, // Decreased radius
                      padding: 6, // Decreased padding
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={12} // Decreased size
                      color="white"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export type { SharedJournal, ConnectedUser };
