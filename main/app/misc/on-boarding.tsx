import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoarding = () => {
  const router = useRouter();

  //   // State to control modal visibility
  //   const [modalVisible, setModalVisible] = useState(false);

  //   const handleContinuePress = () => {
  //     setModalVisible(true); // Show the modal when continue is pressed
  //   };

  //   const handleLogin = () => {
  //     setModalVisible(false); // Close the modal
  //     router.push("/auth/login"); // Navigate to the login screen
  //   };

  //   const handleSignUp = () => {
  //     setModalVisible(false); // Close the modal
  //     router.push("/auth/signup"); // Navigate to the signup screen
  //   };

  //   const handleCloseModal = () => {
  //     setModalVisible(false); // Close the modal when clicking outside
  //     Keyboard.dismiss(); // Dismiss keyboard if it's open
  //   };

  return (
    <SafeAreaView className="flex-1 items-center justify-center pt-12 pb-24">
      <Text>OnBoarding</Text>
    </SafeAreaView>
  );
};

export default OnBoarding;
