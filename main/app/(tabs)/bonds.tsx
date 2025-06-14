import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BasicWrapper } from "@/components";
import {
  JournalCards,
  ConnectedUser,
  SharedJournal,
} from "@/components/Journal/JournalCards";
import { JournalOverview } from "@/components/Journal/JournalOverview";
import { MediaItem } from "@/components/Journal/JournalEntry";
import uuid from "react-native-uuid";

const { width } = Dimensions.get("window");

function Profile() {
  // State management for different views and selected items
  const [currentView, setCurrentView] = useState<
    "connections" | "journals" | "journal-detail"
  >("connections");
  const [selectedUser, setSelectedUser] = useState<ConnectedUser | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<SharedJournal | null>(
    null
  );
  const [mediaPreview, setMediaPreview] = useState<MediaItem | null>(null);

  // Mock data for connected users with rich shared journal content
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([
    {
      id: uuid.v4() as string,
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      lastSeen: "2 hours ago",
      sharedJournals: [
        {
          id: uuid.v4() as string,
          title: "Summer Adventures 2025",
          description: "Our collection of summer memories",
          createdAt: "June 1, 2025",
          collaborators: ["You", "Sarah"],
          coverImage:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
          entries: [
            {
              id: uuid.v4() as string,
              title: "Beach Day Magic",
              content:
                "Remember when we got caught in the rain that day? The way you laughed when your umbrella flipped inside out made everything perfect. Sometimes the best moments are the unplanned ones.",
              timestamp: "June 10, 2025",
              mood: "nostalgic",
              author: "You",
              media: [
                {
                  id: uuid.v4() as string,
                  type: "image",
                  uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
                },
                {
                  id: uuid.v4() as string,
                  type: "audio",
                  uri: "audio_placeholder",
                  name: "Rain sounds",
                  duration: "2:34",
                },
              ],
            },
            {
              id: uuid.v4() as string,
              title: "Sunset Conversations",
              content:
                "I still laugh thinking about your umbrella flipping inside out 😂 But honestly, that whole evening was magical. The way the sunset painted everything golden...",
              timestamp: "June 11, 2025",
              mood: "playful",
              author: "Sarah",
              media: [
                {
                  id: uuid.v4() as string,
                  type: "video",
                  uri: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=300&h=200&fit=crop",
                  duration: "1:45",
                },
              ],
            },
          ],
        },
        {
          id: uuid.v4() as string,
          title: "Recipe Collection",
          description: "Our culinary experiments and discoveries",
          createdAt: "May 15, 2025",
          collaborators: ["You", "Sarah"],
          coverImage:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
          entries: [
            {
              id: uuid.v4() as string,
              title: "Perfect Pasta Night",
              content:
                "Finally nailed that carbonara recipe! The key was definitely the timing on the eggs.",
              timestamp: "May 20, 2025",
              mood: "accomplished",
              author: "Sarah",
              media: [
                {
                  id: uuid.v4() as string,
                  type: "image",
                  uri: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
                },
                {
                  id: uuid.v4() as string,
                  type: "file",
                  uri: "recipe_placeholder",
                  name: "carbonara_recipe.pdf",
                },
              ],
            },
          ],
        },
        {
          id: uuid.v4() as string,
          title: "Fitness Journey 2025",
          description: "Tracking our wellness and workout adventures",
          createdAt: "January 5, 2025",
          collaborators: ["You", "Sarah"],
          coverImage:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
          entries: [
            {
              id: uuid.v4() as string,
              title: "Morning Yoga Session",
              content:
                "Started the day with an amazing sunrise yoga session at the park. The energy was incredible!",
              timestamp: "January 15, 2025",
              mood: "energetic",
              author: "Sarah",
              media: [
                {
                  id: uuid.v4() as string,
                  type: "image",
                  uri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
                },
              ],
            },
            {
              id: uuid.v4() as string,
              title: "Hiking Challenge Complete",
              content:
                "We did it! 10K steps every day this month. Feeling stronger and more connected to nature than ever.",
              timestamp: "January 30, 2025",
              mood: "accomplished",
              author: "You",
              media: [
                {
                  id: uuid.v4() as string,
                  type: "image",
                  uri: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
                },
                {
                  id: uuid.v4() as string,
                  type: "video",
                  uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
                  duration: "0:45",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: uuid.v4() as string,
      name: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastSeen: "1 day ago",
      sharedJournals: [
        {
          id: uuid.v4() as string,
          title: "Travel Chronicles",
          description: "Adventures around the world",
          createdAt: "April 20, 2025",
          collaborators: ["You", "Alex"],
          coverImage:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop",
          entries: [
            {
              id: uuid.v4() as string,
              title: "Mountain Hiking",
              content:
                "The view from the top was absolutely breathtaking! Worth every step of the climb.",
              timestamp: "May 1, 2025",
              mood: "exhilarated",
              author: "Alex",
              media: [
                {
                  id: uuid.v4() as string,
                  type: "image",
                  uri: "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=300&h=200&fit=crop",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: uuid.v4() as string,
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastSeen: "3 hours ago",
      sharedJournals: [
        {
          id: uuid.v4() as string,
          title: "Book Club Notes",
          description: "Our literary discussions and discoveries",
          createdAt: "March 10, 2025",
          collaborators: ["You", "Emma"],
          coverImage:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
          entries: [
            {
              id: uuid.v4() as string,
              title: "The Great Gatsby Discussion",
              content:
                "Your interpretation of the green light symbolism was so insightful! Changed how I see the whole story.",
              timestamp: "March 15, 2025",
              mood: "thoughtful",
              author: "Emma",
              media: [],
            },
          ],
        },
      ],
    },
  ]);

  // Handle journal updates from the overview component
  const handleJournalUpdate = (updatedJournal: SharedJournal) => {
    if (selectedUser) {
      const updatedUser = {
        ...selectedUser,
        sharedJournals: selectedUser.sharedJournals.map((journal) =>
          journal.id === updatedJournal.id ? updatedJournal : journal
        ),
      };
      setSelectedUser(updatedUser);
      setSelectedJournal(updatedJournal);

      // Update the connectedUsers state as well
      setConnectedUsers((users) =>
        users.map((user) => (user.id === selectedUser.id ? updatedUser : user))
      );
    }
  };

  // Render the connections list with glassmorphic styling
  const renderConnections = () => (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {connectedUsers.map((user, index) => {
        // Color accents for avatars - cycling through warm, appealing colors
        const accentColors = [
          "#FF6B8A",
          "#667eea",
          "#4ECDC4",
          "#fa709a",
          "#4facfe",
        ];
        const accentColor = accentColors[index % accentColors.length];

        return (
          <View key={user.id}>
            <TouchableOpacity
              onPress={() => {
                setSelectedUser(user);
                setCurrentView("journals");
              }}
              style={{
                height: 70,
                paddingVertical: 4,
                flexDirection: "row",
                alignItems: "center",
                // Glassmorphic background with subtle blur effect
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderRadius: 20,
                marginHorizontal: 4,
                marginVertical: 6,
                paddingHorizontal: 16,
                // Multiple border layers for glassmorphic effect
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.08)",
                // Enhanced shadow for depth
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                // Additional glassmorphic properties
                elevation: 5,
              }}
              activeOpacity={0.8}
            >
              {/* Subtle inner glow overlay */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 20,
                  backgroundColor: "rgba(255, 255, 255, 0.01)",
                  borderWidth: 0.5,
                  borderColor: "rgba(255, 255, 255, 0.05)",
                }}
              />

              {/* Enhanced avatar with glassmorphic glow */}
              <View
                style={{
                  marginRight: 16,
                  // Glassmorphic shadow for avatar
                  shadowColor: accentColor,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                }}
              >
                <Image
                  source={{ uri: user.avatar }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    borderWidth: 1.5,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    // Additional glassmorphic border
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 3,
                  }}
                />
                {/* Avatar overlay for glassmorphic effect */}
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    borderWidth: 0.5,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
              </View>

              {/* User information section */}
              <View className="flex-1">
                <Text
                  style={{
                    height: 20,
                    fontSize: 17,
                    fontWeight: "700",
                    color: "rgba(255, 255, 255, 0.95)",
                    // Enhanced text shadow for glassmorphic effect
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  {user.name}
                </Text>

                {/* Journal count badge with glassmorphic styling */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                    // Glassmorphic badge background
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(10px)",
                    height: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 16,
                    alignSelf: "flex-start",
                    borderWidth: 0.5,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    // Subtle inner shadow
                    shadowColor: "rgba(0, 0, 0, 0.2)",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                  }}
                >
                  <Ionicons 
                    name="journal" 
                    size={13} 
                    color="rgba(255, 255, 255, 0.8)" 
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      color: "rgba(255, 255, 255, 0.8)",
                      fontWeight: "600",
                      marginLeft: 6,
                      textShadowColor: "rgba(0, 0, 0, 0.3)",
                      textShadowOffset: { width: 0, height: 0.5 },
                      textShadowRadius: 1,
                    }}
                  >
                    {user.sharedJournals.length} shared journal
                    {user.sharedJournals.length !== 1 ? "s" : ""} ✨
                  </Text>
                </View>
              </View>

              {/* Glassmorphic navigation chevron */}
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 12,
                  padding: 2,
                  borderWidth: 0.5,
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  // Inner glow effect
                  shadowColor: "rgba(255, 255, 255, 0.1)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                }}
              >
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(255, 255, 255, 0.7)"
                />
              </View>
            </TouchableOpacity>

            {/* Glassmorphic separator between users */}
            {index < connectedUsers.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  marginHorizontal: 20,
                  marginVertical: 4,
                  // Subtle glow for separator
                  shadowColor: "rgba(255, 255, 255, 0.1)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.5,
                  shadowRadius: 1,
                }}
              />
            )}
          </View>
        );
      })}
    </ScrollView>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 48,
        backgroundColor: "black",
      }}
    >
      {/* Background overlay for consistent theming */}
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

      {/* Clean header with minimal glassmorphic effect */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          marginTop: 0,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "rgba(255, 107, 138, 0.2)",
              borderRadius: 16,
              padding: 12,
                              marginTop: -40,

              marginRight: 12,
              borderWidth: 1,
              borderColor: "rgba(255, 107, 138, 0.3)",
            }}
          >
            <Ionicons name="people" size={24} color="#FF6B8A" />
          </View>
          <View>
            {/* Clean title without decorations */}
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
                marginTop: -40,
              }}
            >
              {currentView === "connections"
                ? "Bond Journal"
                : currentView === "journals"
                ? "Shared Journals"
                : "Journal Entries"}
            </Text>
            {currentView === "connections" && (
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.7)",
                  marginTop: 2,
                }}
              >
                {connectedUsers.length} connections
              </Text>
            )}
          </View>
        </View>

        {/* Add button for connections view */}
        {currentView === "connections" && (
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              borderRadius: 16,
              paddingHorizontal: 10,
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(59, 130, 246, 0.4)",
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="person-add" size={16} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: "500",
                marginLeft: 8,
                fontSize: 12,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}

        {/* Add entry button for journal detail view */}
        {currentView === "journal-detail" && (
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 12,
              padding: 8,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.25)",
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Clean search bar with reduced height - only show on connections view */}
      {currentView === "connections" && (
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255)",
              borderRadius: 16, // Slightly reduced border radius
              paddingHorizontal: 16,
              paddingVertical: 0, // Reduced from 12 to 10
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
              height: 35, 
            }}
          >
            <Ionicons
              name="search"
              size={16}
              color="rgba(255, 255, 255, 0.6)"
            />
            <TextInput
              placeholder="Search connections..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              style={{
                flex: 1,
                fontSize: 11,
                color: "white",
                marginLeft: 12,
              }}
            />
          </View>
        </View>
      )}

      {/* Main content rendering based on current view */}
      {currentView === "connections" && renderConnections()}
      {currentView === "journals" && selectedUser && (
        <JournalCards
          key={selectedUser.id}
          user={selectedUser}
          onJournalPress={(journal) => {
            setSelectedJournal(journal);
            setCurrentView("journal-detail");
          }}
          onBackPress={() => setCurrentView("connections")}
        />
      )}
      {currentView === "journal-detail" && selectedJournal && (
        <JournalOverview
          key={selectedJournal.id}
          journal={selectedJournal}
          onBackPress={() => setCurrentView("journals")}
          onMediaPress={setMediaPreview}
          onJournalUpdate={handleJournalUpdate}
        />
      )}

      {/* Enhanced media preview modal for full-screen viewing */}
      <Modal
        visible={mediaPreview !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setMediaPreview(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close button with clean styling */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 48,
              right: 16,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 20,
              padding: 12,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.25)",
            }}
            onPress={() => setMediaPreview(null)}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          {/* Image preview with elegant shadow */}
          {mediaPreview?.type === "image" && (
            <View
              style={{
                borderRadius: 16,
                overflow: "hidden",
                shadowColor: "#FF6B8A",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            >
              <Image
                source={{ uri: mediaPreview.uri }}
                style={{
                  width: width - 40,
                  height: width - 40,
                }}
                resizeMode="contain"
              />
            </View>
          )}

          {/* Video preview with play button */}
          {mediaPreview?.type === "video" && (
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  shadowColor: "#667eea",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                }}
              >
                <Image
                  source={{ uri: mediaPreview.uri }}
                  style={{
                    width: width - 40,
                    height: (width - 40) * 0.6,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 32,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="play" size={32} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

export default BasicWrapper(Profile);