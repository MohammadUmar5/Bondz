import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Memory, mockMemories } from "./MemoriesGrid";

const { width, height } = Dimensions.get("window");

interface MemoryModalProps {
  selectedMemory: Memory | null;
  selectedIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function MemoryModal({ 
  selectedMemory, 
  selectedIndex, 
  onClose, 
  onIndexChange 
}: MemoryModalProps) {
  const renderCarouselCard = (item: Memory, index: number, currentIndex: number) => {
    const isCenter = index === currentIndex;
    const distance = Math.abs(index - currentIndex);
    const scale = isCenter ? 1 : 0.85 - (distance * 0.1);
    const rotateY = isCenter ? 0 : (index < currentIndex ? -25 : 25);
    const translateX = isCenter ? 0 : (index < currentIndex ? -50 : 50);
    const opacity = isCenter ? 1 : 0.6 - (distance * 0.2);
    const zIndex = isCenter ? 100 : 50 - distance;

    const cardWidth = width * 0.85;
    const cardHeight = height * 0.7;

    return (
      <View
        key={item.id}
        style={{
          position: 'absolute',
          width: cardWidth,
          height: cardHeight,
          left: (width - cardWidth) / 2,
          top: (height - cardHeight) / 2,
          transform: [
            { scale },
            { rotateY: `${rotateY}deg` },
            { translateX },
          ],
          opacity,
          zIndex,
        }}
      >        
        {/* Main card */}
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 32,
            overflow: 'hidden',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.4,
            shadowRadius: 30,
            elevation: 15,
          }}
        >
          {item.image ? (
            // Card with image and premium glassmorphic overlay
            <View style={{ flex: 1, position: 'relative', backgroundColor: '#000' }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: 'absolute',
                }}
                resizeMode="cover"
              />
              
              {/* Extended image for glass effect - creates the "look through" effect */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -50,
                  left: 0,
                  right: 0,
                  height: cardHeight * 0.6,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: cardHeight,
                    position: 'absolute',
                    bottom: 50,
                  }}
                  resizeMode="cover"
                />
              </View>
              
              {/* Premium Glassmorphic overlay */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderBottomLeftRadius: 32,
                  borderBottomRightRadius: 32,
                  maxHeight: '50%',
                  overflow: 'hidden',
                }}
              >
                {/* Multiple layers for premium glass effect */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
                
                {/* Subtle border for glass effect */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  }}
                />
                
                {/* LinearGradient overlay for depth */}
                <LinearGradient
                  colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.25)']}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
                
                <ScrollView 
                  style={{ 
                    maxHeight: cardHeight * 0.45,
                    position: 'relative',
                    zIndex: 10,
                  }}
                  contentContainerStyle={{ 
                    padding: 24,
                    paddingBottom: 32,
                  }}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: 12 
                  }}>
                    <Text style={{ 
                      fontSize: 14, 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: '600',
                      textShadowColor: 'rgba(0, 0, 0, 0.3)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }}>
                      {item.date}
                    </Text>
                    <View style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      shadowColor: 'rgba(0, 0, 0, 0.2)',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 1,
                      shadowRadius: 4,
                    }}>
                      <Text style={{ 
                        fontSize: 12, 
                        color: '#fff', 
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        textShadowColor: 'rgba(0, 0, 0, 0.3)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}>
                        {item.type}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={{ 
                    fontSize: 28, 
                    fontWeight: '700', 
                    color: '#fff', 
                    marginBottom: 8,
                    lineHeight: 34,
                    textShadowColor: 'rgba(0, 0, 0, 0.4)',
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 4,
                  }}>
                    {item.title}
                  </Text>
                  
                  {item.subtitle && (
                    <Text style={{ 
                      fontSize: 18, 
                      color: 'rgba(255, 255, 255, 0.95)', 
                      marginBottom: 12,
                      fontWeight: '600',
                      textShadowColor: 'rgba(0, 0, 0, 0.3)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }}>
                      {item.subtitle}
                    </Text>
                  )}
                  
                  {item.description && (
                    <Text style={{ 
                      fontSize: 16, 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      lineHeight: 24,
                      textShadowColor: 'rgba(0, 0, 0, 0.3)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }}>
                      {item.description}
                    </Text>
                  )}
                </ScrollView>
              </View>
            </View>
          ) : (
            // Text-only card
            <View style={{ 
              flex: 1, 
              backgroundColor: item.bgColor,
            }}>
              <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ 
                  padding: 32,
                  paddingBottom: 40,
                  minHeight: '100%',
                  justifyContent: 'flex-start',
                }}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: 16 
                }}>
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#888', 
                    fontWeight: '500' 
                  }}>
                    {item.date}
                  </Text>
                  <View style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                  }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: '#666', 
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {item.type}
                    </Text>
                  </View>
                </View>
                
                <Text style={{ 
                  fontSize: 32, 
                  fontWeight: '700', 
                  color: item.textColor, 
                  marginBottom: 12,
                  lineHeight: 38,
                }}>
                  {item.title}
                </Text>
                
                {item.subtitle && (
                  <Text style={{ 
                    fontSize: 20, 
                    fontWeight: '600', 
                    color: '#666', 
                    marginBottom: 20 
                  }}>
                    {item.subtitle}
                  </Text>
                )}
                
                {item.description && (
                  <Text style={{ 
                    fontSize: 18, 
                    color: '#555', 
                    lineHeight: 26,
                  }}>
                    {item.description}
                  </Text>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    );
  };

  const goToPrevious = () => {
    if (selectedIndex > 0) {
      onIndexChange(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex < mockMemories.length - 1) {
      onIndexChange(selectedIndex + 1);
    }
  };

  return (
    <Modal visible={!!selectedMemory} animationType="fade" transparent>
      <View style={{ 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.85)',
      }}>
        {/* Blurred background effect */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }} />
        
        {/* Close button */}
        <Pressable 
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            zIndex: 200,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 25,
            padding: 15,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>✕</Text>
        </Pressable>

        {/* Cards carousel */}
        <View style={{ flex: 1 }}>
          {mockMemories.map((item, index) => 
            renderCarouselCard(item, index, selectedIndex)
          )}
        </View>

        {/* Swipe gesture area */}
        <Pressable
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '50%',
            height: '100%',
            zIndex: 150,
          }}
          onPress={goToPrevious}
        />
        <Pressable
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '50%',
            height: '100%',
            zIndex: 150,
          }}
          onPress={goToNext}
        />

        {/* Indicator dots */}
        <View style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          zIndex: 200,
        }}>
          {mockMemories.map((_, index) => (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === selectedIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                marginHorizontal: 6,
              }}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
}