// components/SlidesFlatList.tsx
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import React, { useEffect } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image?: any;
  visual: any;
};

type SlidesFlatListProps = {
  slides: Slide[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  flatListRef: React.RefObject<FlatList<any>>;
};

const SlidesFlatList: React.FC<SlidesFlatListProps> = ({
  slides,
  currentIndex,
  setCurrentIndex,
  flatListRef,
}) => {
  const { theme } = useTheme();

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{ width }}
              className="flex-1 items-center justify-center"
            >
              <View className="w-full flex-1 items-center justify-center overflow-hidden">
                <Image
                  source={item.visual}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <View className="w-full px-8 flex-col gap-2">
                <Text
                  className="font-medium text-4xl"
                  style={{ color: Colors[theme].textPrimary }}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-xl opacity-70"
                  style={{ color: Colors[theme].textPrimary }}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Dots Slider */}
      <View className="flex-row justify-center mt-6">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex ? "bg-[#312170]" : "bg-[#ccc]"
            }`}
          />
        ))}
      </View>
    </>
  );
};

export default SlidesFlatList;
