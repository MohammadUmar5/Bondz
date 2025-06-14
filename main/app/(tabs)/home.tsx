import { BasicWrapper } from "@/components";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import type { CameraView as CameraViewType } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Home() {
  const { theme } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState<"front" | "back">("back");
  const [flash, setFlash] = useState<"off" | "on">("off");
  const cameraRef = useRef<CameraViewType | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Captured photo:", photo.uri);
    }
  };

  const toggleFlash = () => {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  };

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission?.granted) {
    return <Text>No camera permission</Text>;
  }

  return (
    <View className="relative flex-1 flex">
      <CameraView
        ref={cameraRef}
        facing={type}
        flash={flash}
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 55,
        }}
      >
        <View className="w-full h-24 flex flex-row items-end justify-between px-8">
          <Text
            style={{ color: Colors[theme].textPrimary }}
            className="text-2xl font-bold"
          >
            Capture Memories
          </Text>
          <TouchableOpacity onPress={toggleFlash} activeOpacity={0.7}>
            <Ionicons name="flash" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View className="w-full h-24 flex flex-row items-center justify-between px-8">
          <TouchableOpacity onPress={takePicture}>
            <MaterialIcons name="photo-library" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={takePicture}
            className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
          >
            <View className="w-12 h-12 rounded-full bg-white flex items-center justify-center" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setType((prev) => (prev === "back" ? "front" : "back"))
            }
          >
            <MaterialIcons
              name={type === "back" ? "camera-front" : "camera-rear"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

export default BasicWrapper(Home);

const styles = StyleSheet.create({
  captureButton: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 50,
  },
  flipButton: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
  },
});
