import { BasicWrapper } from "@/components";
import React from "react";
import { ScrollView } from "react-native";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

const Profile = () => {
  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: 'black' }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <ProfileHeader />
      <ProfileTabs />
    </ScrollView>
  );
};

export default BasicWrapper(Profile);