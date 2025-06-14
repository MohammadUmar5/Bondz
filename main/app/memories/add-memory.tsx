import { BasicWrapper } from "@/components";
import { useTheme } from "@/contexts/ThemeProvider";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AddMemory = () => {
  const { theme } = useTheme();
  const [images, setImages] = useState<MediaLibrary.Asset[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  const fetchImages = async (after?: string) => {
    if (loading) return; // Prevent multiple simultaneous requests

    setLoading(true);
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 50,
        sortBy: [MediaLibrary.SortBy.creationTime],
        after,
      });

      if (after) {
        // Appending more images (pagination)
        setImages((prev) => [...prev, ...media.assets]);
      } else {
        // Initial load
        setImages(media.assets);
      }

      setEndCursor(media.endCursor);
      setHasNextPage(media.hasNextPage);
    } catch (error) {
      console.error("Error fetching images:", error);
      Alert.alert("Error", "Failed to load images from gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Check current permission status
        const permissionResponse = await MediaLibrary.getPermissionsAsync();

        if (permissionResponse.status !== "granted") {
          // Request permission if not granted
          const requestResponse = await MediaLibrary.requestPermissionsAsync();

          if (requestResponse.status !== "granted") {
            Alert.alert(
              "Permission Denied",
              "Gallery access is required to display photos."
            );
            return;
          }
        }

        // Fetch images after permission is granted
        fetchImages();
      } catch (error) {
        console.error("Permission error:", error);
        Alert.alert("Error", "Failed to get gallery permissions");
      }
    };

    loadImages();
  }, []); // Remove permission dependency

  const handleLoadMore = () => {
    if (hasNextPage && endCursor && !loading) {
      fetchImages(endCursor);
    }
  };

  const renderImage = ({ item }: { item: MediaLibrary.Asset }) => (
    <TouchableOpacity
      onPress={() => {
        Alert.alert("Image selected", item.uri);
      }}
      style={{
        marginBottom: 10,
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{
          width: 110,
          height: 110,
          borderRadius: 10,
          backgroundColor: "#333",
        }}
        onError={(error) => {
          console.log("Image load error:", error);
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 px-5 py-8 bg-black">
      <Text className="text-xl font-bold text-white mb-4">Choose a Photo</Text>

      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={renderImage}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: "white", fontSize: 16 }}>
              {loading ? "Loading images..." : "No images found"}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default BasicWrapper(AddMemory);
