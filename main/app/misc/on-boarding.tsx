import assets from "@/assets/assets";
import { BasicWrapper, SlidesFlatList } from "@/components";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const slides = [
  {
    id: "1",
    title: "Welcome to Bondz",
    subtitle:
      "Not just an app. A place where your people and memories live on.",
    image: assets.logos.appIcon,
    visual: assets.slides.slide1,
  },
  {
    id: "2",
    title: "People Vault",
    subtitle: "Save mini-profiles of the people who shaped your story.",
    image: assets.logos.appIcon,
    visual: assets.slides.slide2,
  },
  {
    id: "3",
    title: "Private & Public Memories",
    subtitle: "Some memories are yours alone. Others, meant to be shared.",
    image: assets.logos.appIcon,
    visual: assets.slides.slide3,
  },
  {
    id: "4",
    title: "Shared Memories",
    subtitle: "Create memories together, even when you're apart.",
    image: assets.logos.appIcon,
    visual: assets.slides.slide4,
  },
  {
    id: "5",
    title: "Global Discoveries",
    subtitle: "Find joy in the echoes of others' lives.",
    image: assets.logos.appIcon,
    visual: assets.slides.slide5,
  },
  {
    id: "6",
    title: "Memory Timeline",
    subtitle: "Watch your story unfold—one moment at a time.",
    image: assets.logos.appIcon,
    visual: assets.slides.slide6,
  },
  {
    id: "7",
    title: "Let’s Make Your First Memory",
    subtitle: "",
    image: assets.logos.appIcon,
    visual: assets.slides.slide7,
  },
];

const OnBoarding = () => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleSkipOrContinue = () => {
    if (currentIndex === slides.length - 1) {
      router.replace("/auth/signup");
    } else {
      flatListRef.current?.scrollToIndex({
        index: slides.length - 1,
        animated: true,
      });
      setCurrentIndex(slides.length - 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center pt-12">
      <SlidesFlatList
        slides={slides}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        flatListRef={flatListRef}
      />

      {/* Continue Button */}
      <LinearGradient
        colors={["#b6a8ff", "#9486f0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl h-12 overflow-hidden mt-6 w-1/2"
      >
        <Pressable
          android_ripple={{ color: "#d3cfff" }}
          className="w-full h-full flex items-center justify-center"
          onPress={handleSkipOrContinue}
        >
          <Text className="text-2xl text-white text-center">
            {currentIndex === slides.length - 1 ? "Continue" : "Skip"}
          </Text>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};

const WrappedOnBoarding = BasicWrapper(OnBoarding);
export default () => <WrappedOnBoarding allowGuest />;
