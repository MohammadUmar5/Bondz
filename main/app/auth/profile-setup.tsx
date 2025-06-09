import { BasicWrapper } from "@/components";
import { saveUserProfile } from "@/services/auth";
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const steps = [0];

type PlanType = "free" | "premium";

interface ProfileForm {
  name: string;
  age: string; // Keep as string for input, convert to number before submit
  profileImage: string;
  pronouns: string;
  plan: PlanType;
}

const ProfileSetup = () => {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    age: "",
    profileImage: "",
    pronouns: "",
    plan: "free",
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.6,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      setForm({
        ...form,
        profileImage: `data:image/jpeg;base64,${result.assets[0].base64}`,
      });
    }
  };

  const validateStep = (): boolean => {
    try {
      if (stepIndex === 0) {
        if (!form.name.trim()) {
          setFeedback("Name is required");
          return false;
        }
        const ageNumber = Number(form.age);
        if (!ageNumber || isNaN(ageNumber) || ageNumber < 1) {
          setFeedback("Please enter a valid age");
          return false;
        }
      }

      return true;
    } catch (err: any) {
      Alert.alert("Error in validateStep", err?.message || JSON.stringify(err));
      return false;
    }
  };

  const handleNext = () => {
    try {
      if (!validateStep()) return;
      setFeedback("");
      if (stepIndex < steps.length - 1) {
        setStepIndex(stepIndex + 1);
      } else {
        handleProfileSubmit();
      }
    } catch (err: any) {
      Alert.alert("Error in handleNext", err?.message || JSON.stringify(err));
    }
  };

  const handleBack = () => {
    setFeedback("");
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handleProfileSubmit = async () => {
    if (!form.name) {
      setFeedback("Name is required.");
    }

    const ageNumber = Number(form.age);
    if (!ageNumber || isNaN(ageNumber) || ageNumber < 0) {
      setFeedback("Please enter a valid age.");
    }

    const profileData = {
      ...form,
      age: ageNumber,
      plan: "free" as const,
    };

    setLoading(true);
    const { success, message } = await saveUserProfile(profileData);
    setFeedback(message);
    setLoading(false);

    if (success) {
      router.replace("/home");
    }
  };

  const renderInputs = () => {
    try {
      switch (stepIndex) {
        case 0:
          return (
            <View className="flex flex-col items-center justify-center gap-4">
              <View className="flex items-center">
                {form.profileImage ? (
                  <View className="relative">
                    <Image
                      source={{ uri: form.profileImage }}
                      className="w-24 h-24 rounded-full bg-gray-300"
                    />
                    <Pressable
                      onPress={() => setForm({ ...form, profileImage: "" })}
                      className="absolute top-0 right-0 bg-white rounded-full p-1"
                    >
                      <Entypo name="cross" size={18} color="black" />
                    </Pressable>
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={pickImage}
                    className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-300 opacity-70"
                  >
                    <Entypo name="camera" size={34} color="white" />
                  </TouchableOpacity>
                )}
                <Text className="text-xs text-gray-500 mt-1">
                  Add/Change Photo
                </Text>
              </View>

              <View className="w-full px-3 mt-4">
                <Text className="text-[14px] text-[#523c72]">
                  What should we call you?
                </Text>
                <TextInput
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  placeholder="Your name"
                  className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
                />

                <Text className="text-[14px] text-[#523c72]">
                  How old are you?
                </Text>
                <TextInput
                  value={form.age || ""}
                  onChangeText={(text) => setForm({ ...form, age: text })}
                  placeholder="e.g., 22"
                  keyboardType="numeric"
                  maxLength={3}
                  className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
                />

                <Text className="text-[14px] text-[#523c72]">
                  Your pronouns (optional):
                </Text>
                <TextInput
                  value={form.pronouns}
                  onChangeText={(text) => setForm({ ...form, pronouns: text })}
                  placeholder="e.g., she/her, he/him"
                  className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
                />
              </View>
            </View>
          );
        default:
          return <Text>Nothing to show</Text>;
      }
    } catch (err: any) {
      Alert.alert(
        "Error rendering inputs",
        err?.message || JSON.stringify(err)
      );
      return <Text className="text-red-500">Something went wrong.</Text>;
    }
  };

  return (
    <View>
      <BlurView
        intensity={70}
        tint="light"
        className="w-full rounded-3xl overflow-hidden p-4 max-w-md"
      >
        {renderInputs()}

        {/* Feedback */}
        {feedback && (
          <Text className="text-center text-[#312170]">{feedback}</Text>
        )}

        <View className="flex-row justify-between mt-6">
          {stepIndex > 0 && (
            <Pressable
              onPress={handleBack}
              className="bg-gray-300 py-3 px-6 rounded-2xl"
            >
              <Text className="text-gray-800 text-center text-[14px]">
                Back
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={handleNext}
            className="bg-[#9486f0] py-3 px-6 rounded-2xl ml-auto"
            disabled={loading}
          >
            <Text className="text-white text-center text-[14px]">
              {loading
                ? "Saving..."
                : stepIndex === steps.length - 1
                ? "Finish Setup"
                : "Continue"}
            </Text>
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
};

const WrappedOnProfileSetup = BasicWrapper(ProfileSetup);
export default () => <WrappedOnProfileSetup allowGuest />;
